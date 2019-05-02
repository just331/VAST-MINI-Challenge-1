let width = 900,
    height =500,
    centered;

/*let color = d3.scaleLinear()
    .domain([1,20])
    .clamp(true)
    .range(['#fff', '#409A99']);
*/

let color = d3.scaleLinear()
    .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

let projection = d3.geoMercator()
    .scale(110000)
    .center([-119, 0.01])
    .translate([2100,450]);

let legendText = ["High", "Medium", "Low", "Nada"];

let path = d3.geoPath()
    .projection(projection);

let svg = d3.select('#worldMap')
    .attr('width', width)
    .attr('height', height);

svg.append('rect')
    .attr('class', 'background')
    .attr('width', width)
    .attr('height', height);
    //.on('click', clicked);

let g = svg.append('g');

/*let effectLayer = g.append('g')
    .classed('effect-layer', true);

let mapLayer = g.append('g')
    .classed('map-layer', true);

let dummyText = g.append('g')
    .classed('dummy-text', true)
    .attr('x', 10)
    .attr('y', 30)
    .style('opacity', 0);

let bigText = g.append('text')
    .classed('big-text', true)
    .attr('x', 20)
    .attr('y', 45);*/

// Append Div for tooltip to SVG
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load in my states data!
d3.csv("dataset/reports_4_6_20.csv", function(data) {
    color.domain([0,1,2,3]); // setting the range of the input data

// Load GeoJSON data and merge with states data
    d3.json("scripts/map.geo.json", function(json) {

// Loop through each report in the .csv file
        for (var i = 0; i < data.length; i++) {

            // Grab location ID
            var dataID = data[i].location;

            // Grab data value
            var dataShake = data[i].shake_intensity;

            // Find the corresponding ID inside the GeoJSON
            for (var j = 0; j < json.features.length; j++)  {
                var jsonID = json.features[j].properties.Id;

                if (dataID == jsonID) {

                    // Copy the data value into the JSON
                    json.features[j].properties.intensity = dataShake;
                    break;
                }
            }
        }

// Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {

                // Get data value
                var value = d.properties.intensity;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "rgb(213,222,217)";
                }
            })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.text(d.properties.Id + ": " + d.properties.Nbrhood)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d.location;
            })
            .attr("cy", function(d) {
                return d.location;
            })
            .attr("r", function(d) {
                return Math.sqrt(d.shake_intensity) * 10;
            })
            .style("fill", "rgb(217,91,67)")
            .style("opacity", 0.85)

            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.text(d.shake_intensity)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })

            // fade out tooltip on mouse out
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
        var legend = d3.select("body").append("svg")
            .attr("class", "legend")
            .attr("width", 140)
            .attr("height", 200)
            .selectAll("g")
            .data(color.domain().slice().reverse())
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .data(legendText)
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
    });

});

/*
// Load map data
d3.json('scripts/map.geo.json', function(error, mapData) {
    var features = mapData.features;
    console.log(features);
    // Update color scale domain based on data
    color.domain([0, d3.max(features, nameLength)]);

    // Draw each province as a path
    mapLayer.selectAll('path')
        .data(features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style('fill', fillFn)
        //.on('mouseover', mouseover)
        //.on('mouseout', mouseout)
        .on('click', clicked)
        .call(d3.helper.tooltip(
            function(d){
                return "<b>"+ nameFn(d) + "</b><br/>" + "<b>"+"ID: " +ID(d) + "</b>";

            }
        ));
});

// Get neighborhood name
function nameFn(d){
    return d && d.properties ? d.properties.Nbrhood : null;
}

// Get neighborhood ID
function ID(d) {
    return d && d.properties ? d.properties.Id : null;
}

// Get name length
function nameLength(d){
    var n = nameFn(d);
    return n ? n.length : 0;
}

// Get color
function fillFn(d){
    return color(nameLength(d));
}

// When clicked, zoom in
function clicked(d) {
    var x, y, k;

    // Compute centroid of the selected path
    if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    // Highlight the clicked province
    mapLayer.selectAll('path')
        .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

    // Zoom
    g.transition()
        .duration(750)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
}

function mouseover(d){
    // Highlight hovered province
    d3.select(this).style('fill', 'orange');

    // Draw effects
    textArt(nameFn(d));
}

function mouseout(d){
    // Reset province color
    mapLayer.selectAll('path')
        .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

    // Remove effect text
    effectLayer.selectAll('text').transition()
        .style('opacity', 0)
        .remove();

    // Clear province name
    bigText.text('');
}

var BASE_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

var FONTS = [
    "Open Sans",
    "Josefin Slab",
    "Arvo",
    "Lato",
    "Vollkorn",
    "Abril Fatface",
    "Old StandardTT",
    "Droid+Sans",
    "Lobster",
    "Inconsolata",
    "Montserrat",
    "Playfair Display",
    "Karla",
    "Alegreya",
    "Libre Baskerville",
    "Merriweather",
    "Lora",
    "Archivo Narrow",
    "Neuton",
    "Signika",
    "Questrial",
    "Fjalla One",
    "Bitter",
    "Varela Round"
];

function textArt(text){
    // Use random font
    var fontIndex = Math.round(Math.random() * FONTS.length);
    var fontFamily = FONTS[fontIndex] + ', ' + BASE_FONT;

    bigText
        .style('font-family', fontFamily)
        .text(text);

    // Use dummy text to compute actual width of the text
    // getBBox() will return bounding box
    dummyText
        .style('font-family', fontFamily)
        .text(text);


    var selection = effectLayer.selectAll('text')
        .data(positions, function(d){return d.text+'/'+d.index;});

    // Clear old ones
    selection.exit().transition()
        .style('opacity', 0)
        .remove();

    // Create text but set opacity to 0
    selection.enter().append('text')
        .text(function(d){return d.text;})
        .attr('x', function(d){return d.x;})
        .attr('y', function(d){return d.y;})
        .style('font-family', fontFamily)
        .style('fill', '#777')
        .style('opacity', 0);

    selection
        .style('font-family', fontFamily)
        .attr('x', function(d){return d.x;})
        .attr('y', function(d){return d.y;});

    // Create transtion to increase opacity from 0 to 0.1-0.5
    // Add delay based on distance from the center of the <svg> and a bit more randomness.
    selection.transition()
        .delay(function(d){
            return d.distance * 0.01 + Math.random()*1000;
        })
        .style('opacity', function(d){
            return 0.1 + Math.random()*0.4;
        });
}

*/

