Template.prospect.onRendered(function(){
	var payByExp = [{'Count':24036,'Delta':-9,'Median':73000,'ShowSpanOnly':false,'Title':'Entry-Level','Tooltip':null,'Url':'/research/US/Job=Software_Engineer/Salary/4fd947de/Entry-Level'},{'Count':11613,'Delta':7,'Median':86000,'ShowSpanOnly':false,'Title':'Mid-Career','Tooltip':null,'Url':'/research/US/Job=Software_Engineer/Salary/3a95c51b/Mid-Career'},{'Count':5954,'Delta':24,'Median':100000,'ShowSpanOnly':false,'Title':'Experienced','Tooltip':null,'Url':'/research/US/Job=Software_Engineer/Salary/2fdc4b39/Experienced'},{'Count':1653,'Delta':33,'Median':107000,'ShowSpanOnly':false,'Title':'Late-Career','Tooltip':null,'Url':'/research/US/Job=Software_Engineer/Salary/d10ad3da/Late-Career'},{'Count':37132,'Delta':0,'Median':80000,'ShowSpanOnly':true,'Title':'National Average','Tooltip':null,'Url':null}];

	Session.set("payByExp", payByExp);

	drawPbeGraph(payByExp);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function yearsRange(title) {
        for (var i = 0; i < experienceMappings.length; i++) {
            if (title == experienceMappings[i][0]) {
                if (experienceMappings[i][2] > 90) {
                    return ">" + experienceMappings[i][1]
                }
                else {
                    return experienceMappings[i][1] + "-" + experienceMappings[i][2];
                }
            }
        }
        return "";
    }

    function findByTitle(a, t) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].Title == t) return a[i];
        }
        return null;
    }

    function drawPbeGraph(allData) {
        var containerWidth = $("#salaryChartCountry").width();

        var levels = ["Entry-Level", "Mid-Career", "Experienced", "Late-Career"];
        var rawData = levels.map(function (level) { return findByTitle(allData, level); });

        var margin = { top: 20, right: 50, bottom: 60, left: 70 },
            width = containerWidth - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var skinny = width < 400;

        var x = d3.scale.ordinal()
            .domain(levels)
            .rangePoints([0, width]);

        // in some cases, we want to move labels towards the center, so use a narrower domain.
        var xSquishMargin = 30; // to move popups towards center
        var xSquishScale = d3.scale.ordinal()
            .domain(levels)
            .rangePoints([0 + xSquishMargin, width - xSquishMargin]);

        var maxMedian = d3.max(rawData, function (d) { return d.Median; });
        var minMedian = d3.min(rawData, function (d) { return d.Median; });
        var y = d3.scale.linear()
            .domain([minMedian * .6, maxMedian * 1.2])
            .range([height, 0])
            .nice();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat(function (d) { return "$" + d / 1000 + 'K'; })
            .orient("left");

        var area = d3.svg.area()
            .x(function (d) { return x(d.Title); })
            .y0(height)
            .y1(function (d) { return y(d.Median); })
            .interpolate("monotone");

        var line = d3.svg.line()
            .x(function (d) { return x(d.Title); })
            .y(function (d) { return y(d.Median); })
            .interpolate("monotone");

        var svg = d3.select("#salaryChartCountry").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var pbetooltip = d3.select("#salaryChartCountry").append("div")
            .attr("class", "pbe-tooltip")
            .attr("id", "pbeTooltip")
            .style("opacity", 0);

        svg.append("g")
            .attr("class", "pbe-y pbe-axis")
            .call(yAxis);

        svg.append("path")
            .datum(rawData)
            .attr("class", "pbe-area")
            .attr("d", area);

        svg.append("path")
            .datum(rawData)
            .attr("class", "pbe-line")
            .attr("d", line);

        svg.append("g")
            .attr("class", "pbe-grid")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis
                .tickSize(-height, 0, 0)
                .tickFormat("")
            );

        svg.append("g")
            .attr("class", "pbe-grid")
            .call(yAxis
                .tickSize(-width, 0, 0)
                .tickFormat("")
            );

        var showPopup = function (d) {
            var pbeTopOffset = $("#salaryChartCountry").offset().top - 500;
            
            pbetooltip.transition()
                .duration(800)
                .style("opacity", 1);
            pbetooltip.html("<span class='pbe-tooltip-small'>" + d.Title + " (" + yearsRange(d.Title) + " yrs)</span><br/>" + "$" + numberWithCommas(d.Median) + "<br/><span class='pbe-tooltip-small'>COUNT: " + d.Count + "</span>")
                .style("left", xSquishScale(d.Title) - 18 + "px")
                .style("top", pbeTopOffset + y(d.Median)+ 80 + "px");
        };

        var hidePopup = function () {
            pbetooltip.transition().duration(500).style("opacity", 0);
        };

        // labels on x-axis.
        var halfWidth = 50;
        svg.append("g")
            .attr("class", "pbe-x")
            .selectAll(".pbe-x")
            .data(rawData)
            .enter()
            .append("svg")
                .attr("width", halfWidth * 2)
                .attr("height", 100)
                .attr("text-anchor", "middle")
                .on("mouseover", showPopup)
                .on("mouseout", hidePopup)
                .each(function (d) {
                    var title = d.Title;
                    var adjTitle = skinny ? yearsRange(title) : title;
                    var labelScale = skinny ? x : xSquishScale; // when using long titles, move towards middle.
                    var selector = d3.select(this);
                    selector.attr("x", labelScale(title) - halfWidth)
                        .attr("y", height + 18);

                    if (!d.ShowSpanOnly) {
                        selector = selector.append("a").attr("xlink:href", d.Url);
                    }

                    selector.append("text")
                        .attr("x", halfWidth)
                        .attr("y", 14)
                        .text(adjTitle);
                    if (!skinny) {
                        selector.append("text")
                            .attr("x", halfWidth)
                            .attr("y", 30)
                            .attr("class", "pbe-x-small")
                            .text(yearsRange(title) + " yrs");
                    }
                });

        svg.append("g")
            .selectAll("circle")
            .data(rawData)
            .enter()
            .append("circle")
            .style("opacity", 0)
            .attr("cx", function (d) { return x(d.Title); })
            .attr("cy", function (d) { return y(d.Median); })
            .attr("r", width / rawData.length / 1.4)
            .on("mouseover", showPopup)
            .on("mouseout", hidePopup);
    }
	// var margin = {top: 20, right: 20, bottom: 30, left: 40},
	//     width = 760 - margin.left - margin.right,
	//     height = 300 - margin.top - margin.bottom;

	// var formatPercent = d3.format(".0%");

	// var xValue = function(d) { 
	// 	console.log(d);
	// 	//return d.letter; 
	// }, 

 //    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
 //    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
 //    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	// var yValue = function(d) { 
	// 	console.log(d);
	// 	//return d.frequency; 
	// }, // data -> value
	//     yScale = d3.scale.linear().range([height, 0]), // value -> display
	//     yMap = function(d) { return yScale(yValue(d)); }, // data -> display
	//     yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(formatPercent);

	// var svg = d3.select("#salaryChartCountry").append("svg")
	//     .attr("width", width + margin.left + margin.right)
	//     .attr("height", height + margin.top + margin.bottom)
	//   	.append("g")
	//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	//   xScale.domain(data.map(xValue));
	//   yScale.domain([0, d3.max(data, yValue)]);

	//   svg.append("g")
	//       .attr("class", "x axis")
	//       .attr("transform", "translate(0," + height + ")")
	//       .call(xAxis);

	//   svg.append("g")
	//       .attr("class", "y axis")
	//       .call(yAxis)
	//     .append("text")
	//       .attr("transform", "rotate(-90)")
	//       .attr("y", 6)
	//       .attr("dy", ".71em")
	//       .style("text-anchor", "end")
	//       .text("Frequency");

	//   svg.selectAll(".bar")
	//       .data(data)
	//     .enter().append("rect")
	//       .attr("class", "bar")
	//       .attr("x", xMap)
	//       .attr("width", xScale.rangeBand)
	//       .attr("y", yMap)
	//       .attr("height", function(d) { return height - yMap(d); });



	// function type(d) {
	//   d.frequency = +d.frequency;
	//   return d;
	// }

	// var data = {
	// 	"Singapore":	.08167,
	// 	"B":	.01492,
	// 	"C":	.02780,
	// 	"D":	.04253,
	// 	"E":	.12702,
	// 	"F":	.02288,
	// 	"G":	.02022,
	// 	"H":	.06094,
	// 	"I":	.06973,
	// 	"J":	.00153,
	// 	"K":	.00747,
	// 	"L":	.04025,
	// 	"M":	.02517,
	// 	"N":	.06749,
	// 	"O":	.07507,
	// 	"P":	.01929,
	// 	"Q":	.00098,
	// 	"R":	.05987,
	// 	"S":	.06333,
	// 	"T":	.09056,
	// 	"U":	.02758,
	// 	"V":	.01037,
	// 	"W":	.02465,
	// 	"X":	.00150,
	// 	"Y":	.01971,
	// 	"Z":	.00074
	// };

});