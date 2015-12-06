Template.pieChart.onRendered(function() {
var data = Template.parentData(0);
var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "Accreditation",
			"color": "#e9d7d7",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"text": "Common Degrees of Software Engineer",
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "80%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "Computer Science",
				"value": 114384,
				"color": "#ccb2b2"
			},
			{
				"label": "Information Systems",
				"value": 95002,
				"color": "#ccc8b2"
			},
			{
				"label": "Information Technology",
				"value": 78327,
				"color": "#c3ccb2"
			},
			{
				"label": "Electrical Engineering",
				"value": 67706,
				"color": "#b5ccb2"
			},
			{
				"label": "Computer Engineering",
				"value": 36344,
				"color": "#b2ccbb"
			},
			{
				"label": "Math/Sci/Philo",
				"value": 32170,
				"color": "#b2ccc8"
			},
			{
				"label": "Others",
				"value": 10000,
				"color": "#efefef"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"mainLabel": {
			"color": "#f29595",
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});
});