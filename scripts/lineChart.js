{
let line = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.power); });

let line2 = d3.line()
  .x(function (d) { return x2(d.date); })
  .y(function (d) { return y2(d.power); });


let buttons = $(".customButton");

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function(e) {
    let elements = $("." + e.target.id + "_line")
    if (elements.length > 0) {
      console.log("Elements found")
      elements.remove()
    } else {
      console.log("No Elements found");

      // line = d3.line()
      //   .x(function (d) { return x(d.date); })
      //   .y(function (d) { return y(d.power); });
      //
      // line2 = d3.line()
      //   .x(function (d) { return x2(d.date); })
      //   .y(function (d) { return y2(d.power); });

      // Line_chart.append("path")
      //     .datum(data)
      //     .attr("class", e.target.id + "_line line")
      //     .attr("d", line);
      //
      // context.append("path")
      //     .datum(data)
      //     .attr("class", e.target.id + "_line line")
      //     .attr("d", line2);
    }
  })
}

let svg = d3.select("#lineChart"),
  margin = {top: 20, right: 20, bottom: 110, left: 40},
  margin2 = {top: 430, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  height2 = +svg.attr("height") - margin2.top - margin2.bottom;

let parsedate = d3.timeParse("%m/%d/%Y %H:%M");

let x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

let xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);

let brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

let zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

let clip = svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width)
  .attr("height", height)
  .attr("x", 0)
  .attr("y", 0);


let Line_chart = svg.append("g")
  .attr("class", "focus")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("clip-path", "url(#clip)");


let focus = svg.append("g")
  .attr("class", "focus")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("dataset/mc1-reports-data.csv", type, function (error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function (d) { return d.power; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());


    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    Line_chart.append("path")
        .datum(data)
        .attr("class", "power_line line")
        .attr("d", line);

    context.append("path")
        .datum(data)
        .attr("class", "power_line line")
        .attr("d", line2);


  context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

  svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

});

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  let s = d3.event.selection || x2.range();
  x.domain(s.map(x2.invert, x2));
  Line_chart.select(".line").attr("d", line);
  focus.select(".axis--x").call(xAxis);
  svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  let t = d3.event.transform;
  x.domain(t.rescaleX(x2).domain());
  Line_chart.select(".line").attr("d", line);
  focus.select(".axis--x").call(xAxis);
  context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function type(d) {
  d.date = parsedate(d.date);
  d.power = +d.power;
  return d;
}}
