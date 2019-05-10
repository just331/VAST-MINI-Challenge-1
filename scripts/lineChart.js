{let margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 1200 - margin.left - margin.right,
  height = 900 - margin.top - margin.bottom;

var parseDate = d3.timeParse("%m/%d/%Y %H:%M");

let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);


let valueline = d3.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.power); });

let svg = d3.select("#lineChart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

d3.csv("dataset/mc1-reports-data.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date)
    d.sewer_and_water = +d.sewer_and_water
    d.power = +d.power
    d.roads_and_bridges = +d.roads_and_bridges
    d.medical = +d.medical
    d.buildings = +d.buildings
    d.shake_intensity = +d.shake_intensity
    d.location = +d.location
  })

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.power; })]);


  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)); // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append("g")
      .call(d3.axisLeft(y)); // Create an axis component with d3.axisLeft

})
}
