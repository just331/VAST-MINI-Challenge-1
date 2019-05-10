{
let widthScatt = 1500,
    size = 215,
    padding = 20;

let x = d3.scaleLinear()
    .range([padding / 2, size - padding / 2]);

let y = d3.scaleLinear()
    .range([size - padding / 2, padding / 2]);

let xAxis = d3.axisBottom()
    .scale(x)
    .ticks(6);

let yAxis = d3.axisLeft()
    .scale(y)
    .ticks(6);

let colorScatt = d3.scaleOrdinal(d3.schemeCategory20);

let legendScatt = ["Location 1", "Location 2", "Location 3", "Location 4", "Location 5", "Location 6", "Location 7", "Location 8", "Location 9", "Location 10", "Location 11", "Location 12", "Location 13", "Location 14", "Location 15", "Location 16", "Location 17", "Location 18"];

d3.csv("dataset/test.csv", function(error, data) {
    if (error) throw error;

    let domainByTrait = {},
        traits = d3.keys(data[0]).filter(function(d) { return d !== "date" && d !== "location"; }),
        n = traits.length;

    traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
    });

    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);

    let brush = d3.brush()
        .on("start", brushstart)
        .on("brush", brushmove)
        .on("end", brushend)
        .extent([[0,0],[size,size]]);

    let svg1 = d3.select("#scatterplot").append("svg")
        .attr("width", size * n + padding)
        .attr("height", size * n + padding)
        .append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

    svg1.selectAll(".x.axis")
        .data(traits)
        .enter().append("g")
        .attr("class", "x axis")
        .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
        .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

    svg1.selectAll(".y.axis")
        .data(traits)
        .enter().append("g")
        .attr("class", "y axis")
        .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
        .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

    let cell = svg1.selectAll(".cell")
        .data(cross(traits, traits))
        .enter().append("g")
        .attr("class", "cell")
        .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
        .each(plot);

    // Titles for the diagonal.
    cell.filter(function(d) { return d.i === d.j; }).append("text")
        .attr("x", padding)
        .attr("y", padding)
        .attr("dy", ".71em")
        .text(function(d) { return d.x; });

    cell.call(brush);

    function plot(p) {
        let cell = d3.select(this);

        x.domain(domainByTrait[p.x]);
        y.domain(domainByTrait[p.y]);

        cell.append("rect")
            .attr("class", "frame")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);

        cell.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", function(d) { return x(d[p.x]); })
            .attr("cy", function(d) { return y(d[p.y]); })
            .attr("r", 4)
            .style("fill", function(d) { return colorScatt(d.location); });
    }



    let brushCell;

    // Clear the previously-active brush, if any.
    function brushstart(p) {
        if (brushCell !== this) {
            d3.select(brushCell).call(brush.move, null);
            brushCell = this;
            x.domain(domainByTrait[p.x]);
            y.domain(domainByTrait[p.y]);
        }
    }

    // Highlight the selected circles.
    function brushmove(p) {
        let e = d3.brushSelection(this);
        svg.selectAll("circle").classed("hidden", function(d) {
            return !e
                ? false
                : (
                    e[0][0] > x(+d[p.x]) || x(+d[p.x]) > e[1][0]
                    || e[0][1] > y(+d[p.y]) || y(+d[p.y]) > e[1][1]
                );
        });
    }

    // If the brush is empty, select all circles.
    function brushend() {
        let e = d3.brushSelection(this);
        if (e === null) svg.selectAll(".hidden").classed("hidden", false);
    }

    let legend2 = d3.select("#scatterplot").append("svg")
        .attr("class", "legendScatter")
        .attr("width", 140)
        .attr("height", 1290)
        .selectAll("g")
        .data(colorScatt.domain().slice().reverse())
        .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend2.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScatt);

    legend2.append("text")
        .data(legendScatt)
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

});

function cross(a, b) {
    let c = [], n = a.length, m = b.length, i, j;
    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
    return c;
}}
