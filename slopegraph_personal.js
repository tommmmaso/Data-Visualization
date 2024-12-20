var opts = {
	width: 1500,
	height: window.innerHeight,
	margin: {top: 50, right: 200, bottom: 50, left: 400}
};

var chartHeight = opts.height - opts.margin.top - opts.margin.bottom;
var chartWidth = opts.width - opts.margin.left - opts.margin.right;
var centerX = opts.width / 2;

// Define vertScale first
var vertScale = d3.scaleLinear()
	.domain([1870, 2023])  // Reversed domain to show older years at bottom
	.range([opts.margin.top, opts.height - opts.margin.bottom]);

// Create SVG element
var svg = d3.select('#chart')
	.append('svg')
	.attr('width', opts.width)
	.attr('height', opts.height);

// Add the central timeline
svg.append('line')
	.attr('x1', centerX)
	.attr('x2', centerX)
	.attr('y1', opts.margin.top)
	.attr('y2', opts.height - opts.margin.bottom)
	.attr('stroke', '#fafafa')
	.attr('stroke-width', '2px');

// Add timeline years
var timelineGroup = svg.selectAll('g.timeline')
	.data([2023, 1950, 1870])
	.enter()
	.append('g')
	.attr('class', 'timeline');

// Add background rectangles for years
timelineGroup.append('rect')
	.attr('class', 'timeline-box')
	.attr('x', centerX - 25)
	.attr('y', d => vertScale(d) - 15)
	.attr('width', 50)
	.attr('height', 25)
	.attr('rx', 3)
	.attr('ry', 3);

// Add year labels
timelineGroup.append('text')
	.attr('class', 'neutral')
	.attr('x', centerX)
	.attr('y', d => vertScale(d))
	.attr('text-anchor', 'middle')
	.attr('dy', '.35em')
	.text(d => d);

// Add all the scales (keep literacy and life on the left, add emissions and PIL on the right)
var literacyScale = d3.scaleLinear()
    .domain([0, 100])  // Literacy percentage range
    .range([centerX, centerX-700]);  // From center (0%) to further left (100%)

var lifeScale = d3.scaleLinear()
    .domain([0, 100])  // Life expectancy range
    .range([centerX, centerX-700]);  // Same range as literacy for consistency

var emissionsScale = d3.scaleLinear()
    .domain([0,100])
    .range([centerX+60, centerX+700]);  // From center to right

var pilScale = d3.scaleLinear()
    .domain([0,30])
    .range([centerX+60, centerX+700]);  // From center to right

svg.append('line')
	.attr('x1', centerX - 50)
	.attr('x2', centerX - 650)
	.attr('y1', opts.margin.top - 3)
	.attr('y2', opts.margin.top - 3)
	.attr('stroke', '#fafafa')
	.attr('stroke-width', 1)
	.attr('opacity', '0.5')
	.attr('stroke-dasharray', '10')
	.attr('marker-end', 'url(#arrow)');

svg.append('line')
	.attr('x1', centerX + 50)
	.attr('x2', centerX + 650)
	.attr('y1', opts.margin.top - 3)
	.attr('y2', opts.margin.top - 3)
	.attr('stroke', '#fafafa')
	.attr('stroke-width', 1)
	.attr('opacity', '0.5')
	.attr('stroke-dasharray', '10')
	.attr('marker-end', 'url(#arrow)');

// Add this marker definition in your SVG
svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 10)
    .attr('refY', 5)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('polygon')
    .attr('points', '0 0, 10 5, 0 10')
    .attr('fill', '#fafafa');

// Add background rectangles for titles (make them taller to accommodate two lines)
svg.append('rect')
    .attr('class', 'title-box')
    .attr('x', centerX - 75)
    .attr('y', opts.margin.top + 55)
    .attr('width', 150)
    .attr('height', 45)  // Increased height for two lines
    .attr('rx', 3)
    .attr('ry', 3);

svg.append('rect')
    .attr('class', 'title-box')
    .attr('x', centerX - 75)
    .attr('y', vertScale(1950) + 30)
    .attr('width', 150)
    .attr('height', 45)  // Increased height for two lines
    .attr('rx', 3)
    .attr('ry', 3);

svg.append('circle')
	.attr('r', 10)
	.attr('fill', '#121212')
	.attr('stroke-width', 5)
	.attr('stroke', '#858585')
	.attr('cx', centerX - 50)
	.attr('cy', opts.margin.top -3);

svg.append('circle')
	.attr('r', 10)
	.attr('fill', '#121212')
	.attr('stroke-width', 5)
	.attr('stroke', '#858585')
	.attr('cx', centerX + 50)
	.attr('cy', opts.margin.top -3);


// Add the title texts with line breaks
svg.append('text')
    .attr('class', 'title')
    .attr('x', centerX)
    .attr('y', opts.margin.top + 75)
    .attr('text-anchor', 'middle')
    .style('fill', '#fafafa')
    .append('tspan')
    .text('II Industrial')
    .append('tspan')
    .attr('x', centerX)
    .attr('dy', '1.2em')
    .text('Revolution');

svg.append('text')
    .attr('class', 'title')
    .attr('x', centerX)
    .attr('y', vertScale(1950) + 50)
    .attr('text-anchor', 'middle')
    .style('fill', '#fafafa')
    .append('tspan')
    .text('III Industrial')
    .append('tspan')
    .attr('x', centerX)
    .attr('dy', '1.2em')
    .text('Revolution');

//progression lines texts
svg.append('text')
	.attr('class', 'line-text')
	.attr('x', centerX + 240)
	.attr('y', vertScale(1880) - 17)
	.style('fill', '#858585')
	.text('Country development')
	.style('font-size', '15px');

svg.append('text')
	.attr('class', 'line-text')
	.attr('x', centerX - 450)
	.attr('y', vertScale(1880) - 17)
	.style('fill', '#858585')
	.text('Quality life progress')
	.style('font-size', '15px');

// Define a color mapping for countries
const countryColors = {
    "United States": "#6A5EEE",
    "China": "#E7473C",
};

const countriesList = ["Global", "United States", "Europe", "United Kingdom", "Switzerland", "China", "Congo"];

var selectedCountries = new Set();

// Create a group for the tooltip
const tooltipGroup = svg.append('g')
    .attr('class', 'tooltip-group')
    .attr('opacity', 0); // Initially hidden

// Create the tooltip rectangle
const tooltip = tooltipGroup.append('rect')
    .attr('class', 'tooltip')
    .attr('width', 140)
    .attr('height', 60)
    .attr('fill', '#121212') // Default color
    .attr('rx', 5)
    .attr('ry', 5);

// Create separate text elements for class and value
const tooltipClassText = tooltipGroup.append('text')
    .attr('class', 'tooltip-class-text')
    .attr('fill', '#fafafa')
    .attr('opacity', 0); // Initially hidden

const tooltipValueText = tooltipGroup.append('text')
    .attr('class', 'tooltip-value-text')
    .attr('fill', '#fafafa')
    .attr('opacity', 0); // Initially hidden

	function createCountrySelector() {
		const selectorDiv = d3.select("body")
		.append("div")
		.attr("id", "country-selector")
		.style("position", "absolute")  // Must be "absolute"
		.style("top", "200px")
		.style("left", "400px")
		.style("padding", "10px")
		.style("background", "#121212")
		.style("border-radius", "5px")
		.style("z-index", "1000")
		.style("border", "2px solid #ffffff");
	
	
		// Add a header to make dragging more intuitive
		const header = selectorDiv.append("div")
			.text("Visualize a country")
			.style("color", "#888888")
			.style("padding", "10px")
			.style("cursor", "move");

	
		// Create a container for the country selector
		const countryContainer = selectorDiv.append("div")
			.style("display", "flex")
			.style("flex-direction", "column");
	
		// Function to update the country list display
		function updateCountryList() {
			// Clear the existing list
			countryContainer.selectAll("*").remove();
	
			// Add rectangles and labels for each country
			countriesList.forEach(country => {
				const countryColor = selectedCountries.has(country) ? countryColors[country] || "#fafafa" : "#ffffff"; // White if not selected
	
				// Create a rectangle for the country
				const countryDiv = countryContainer.append("div")
					.style("background-color", countryColor)
					.style("padding", "5px")
					.style("border-radius", "3px")
					.style("margin", "5px 0")
					.style("cursor", "pointer")
					.text(country)
					.on("click", function () {
						const isSelected = selectedCountries.has(country);
						if (isSelected) {
							// Deselect the country
							selectedCountries.delete(country);
							// Hide the corresponding data
							svg.selectAll(`.${country.replace(/\s+/g, '-').toLowerCase()}`).style("display", "none");
						} else {
							// Select the country
							selectedCountries.add(country);
							// Show the corresponding data
							svg.selectAll(`.${country.replace(/\s+/g, '-').toLowerCase()}`).style("display", "block");
						}
						updateCountryList(); // Update the display
					});
			});
		}
	
		// Initial display of the country list
		updateCountryList();
	
		// Define the drag behavior
		const drag = d3.drag()
		.on('drag', function(event) {
		  // Update the position of the dragged element using left and top CSS properties
		  d3.select(this)
			.style('left', event.x + 'px') // Update the left position
			.style('top', event.y + 'px'); // Update the top position
		});
  
	  // Apply the drag behavior to the country selector
	  d3.select("#country-selector").call(drag);
	}
	

// Call the function to create the country selector
createCountrySelector();

// Now add the literacy data points
d3.json('data_personal.json', function(error, data) {
	if (error) throw error;
	
	createCountrySelector(data);
	
	var usData = data.countries.find(c => c.country === "United States").data;
	const countryClass = "united-states";  // Class name for US elements
	
	svg.append('path')
		.datum(usData.filter(d => d.literacy))
		.attr('class', `literacy-line ${countryClass}`)
		.attr('d', d3.line()
			.curve(d3.curveCardinal.tension(-0.3))
			.x(d => literacyScale(d.literacy))
			.y(d => vertScale(d.year))
		)
		.attr('fill', 'none')
		.attr('stroke', '#6A5EEE')
		.attr('stroke-width', 6)
		.style("display", "none");

	svg.append('path')
		.datum(usData.filter(d => d.life))
		.attr('class', `life-line ${countryClass}`)
		.attr('d', d3.line()
			.curve(d3.curveCardinal.tension(-0.3))
			.x(d => lifeScale(d.life))
			.y(d => vertScale(d.year))
		)
		.attr('fill', 'none')
		.attr('stroke', '#6A5EEE')
		.attr('stroke-width', 6)
		.style("display", "none");

	svg.append('path')
		.datum(usData.filter(d => d.emissions))
		.attr('class', `emissions-line ${countryClass}`)
		.attr('d', d3.line()
			.curve(d3.curveCardinal.tension(-0.3))
			.x(d => emissionsScale(d.emissions))
			.y(d => vertScale(d.year))
		)
		.attr('fill', 'none')
		.attr('stroke', '#6A5EEE')
		.attr('stroke-width', 6)
		.style("display", "none");

	svg.append('path')
		.datum(usData.filter(d => d.pil))
		.attr('class', `pil-line ${countryClass}`)
		.attr('d', d3.line()
			.curve(d3.curveCardinal.tension(-0.3))
			.x(d => pilScale(d.pil))
			.y(d => vertScale(d.year))
		)
		.attr('fill', 'none')
		.attr('stroke', '#6A5EEE')
		.attr('stroke-width', 6)
		.style("display", "none");

	// Function to determine if a point is first or last in its series
	function isEndPoint(d, data, property) {
		const validData = data.filter(item => item[property]);
		const first = validData[0];
		const last = validData[validData.length - 1];
		return d === first || d === last;
	}

	// Create groups for all data types
	['literacy', 'life', 'emissions', 'pil'].forEach(metric => {
		const scale = {
			literacy: literacyScale,
			life: lifeScale,
			emissions: emissionsScale,
			pil: pilScale
		}[metric];

		const suffix = {
			literacy: '%',
			life: 'y.o.',
			emissions: 't',
			pil: 'k'
		}[metric];

	// Define a mapping for the metric names
		const metricNameMapping = {
   			literacy: 'Literacy Rate',
    		life: 'Life Expectancy',
    		emissions: 'CO2 Emissions',
    		pil: 'GDP'
		}[metric];

		const groups = svg.selectAll(`g.${metric}-point`)
			.data(usData.filter(d => d[metric]))
			.enter()
			.append('g')
			.attr('class', `${metric}-point ${countryClass}`)
			.attr('transform', d => `translate(${scale(d[metric])}, ${vertScale(d.year)})`)
			.style("display", "none");

		groups.each(function(d) {
			const group = d3.select(this);
			if (isEndPoint(d, usData, metric)) {
				// Add rectangle and text for end points
				group.append('rect')
					.attr('class', 'data-box')
					.attr('x', -30)
					.attr('y', -15)
					.attr('width', 60)
					.attr('height', 30)
					.attr('rx', 5)
					.attr('ry', 5)
					.style('fill', '#6A5EEE')
					.style('stroke', '#6A5EEE')
					.style('stroke-width', 4);

				group.append('text')
					.attr('class', 'data-label')
					.attr('text-anchor', 'middle')
					.attr('dy', '0.35em')
					.style('fill', '#fafafa')
					.text(d[metric] + suffix);
			} else {
				// Add circle for middle points
				const circle = group.append('circle')
					.attr('r', 10)
					.style('fill', '#121212')
					.style('stroke', '#6A5EEE')
					.style('stroke-width', 3)
					.lower()
					.on('mouseover', function(event) {
						// Get the circle's position
						const bbox = this.getBoundingClientRect();
						const circleX = bbox.x + bbox.width / 2; // Center of the circle
						const circleY = bbox.y; // Top of the circle

						// Set tooltip color based on country
						tooltip.attr('fill', '#121212'); // Set to US color
						tooltip.attr('stroke', '#6A5EEE');
						tooltip.attr('stroke-width', "3px")

						// Show tooltip
						tooltipGroup
							.attr('transform', `translate(${circleX - 12}, ${circleY - 75})`) // Position above the circle
							.attr('opacity', 1) // Show tooltip group
							.raise();

						// Set the class text in the top-left corner of the rectangle
						tooltipClassText
							.attr('x', 5) // Position text slightly inside the rectangle
							.attr('y', 15) // Position at the top-left corner
							.text(`${metricNameMapping}`) // Set text to include class
							.style('fill', '#6A5EEE')
							.attr('opacity', 0.6); // Show class text

						// Set the value text in the bottom-left corner of the rectangle
						tooltipValueText
							.attr('x', 5) // Position text slightly inside the rectangle
							.attr('y', 50) // Position at the bottom-left corner
							.text(`${d[metric] + suffix}`) // Set text to include value
							.style('fill', '#6A5EEE')
							.style('font-size', '23px')
							.attr('opacity', 1); // Show value text
					})
					.on('mouseout', function() {
						// Hide tooltip
					tooltipGroup
						.attr('opacity', 0)
						.attr('transform', 'translate(0, 0)');
					});
			}
		});
	});

	// Add country class to paths and hide them initially for China
   // Inside your d3.json callback, after the US data visualization
   var chinaData = data.countries.find(c => c.country === "China").data;
   const chinaClass = "china";  // Class name for China elements

   // Add connecting lines for China's data
   svg.append('path')
	   .datum(chinaData.filter(d => d.literacy))
	   .attr('class', `literacy-line ${chinaClass}`)
	   .attr('d', d3.line()
		   .curve(d3.curveCardinal.tension(-0.3))
		   .x(d => literacyScale(d.literacy))
		   .y(d => vertScale(d.year))
	   )
	   .attr('fill', 'none')
	   .attr('stroke', '#E7473C')  // Royal Blue
	   .attr('stroke-width', 6)
	   .style("display", "none");

   svg.append('path')
	   .datum(chinaData.filter(d => d.life))
	   .attr('class', `life-line ${chinaClass}`)
	   .attr('d', d3.line()
		   .curve(d3.curveCardinal.tension(-0.3))
		   .x(d => lifeScale(d.life))
		   .y(d => vertScale(d.year))
	   )
	   .attr('fill', 'none')
	   .attr('stroke', '#E7473C')
	   .attr('stroke-width', 6)
	   .style("display", "none");

   svg.append('path')
	   .datum(chinaData.filter(d => d.emissions))
	   .attr('class', `emissions-line ${chinaClass}`)
	   .attr('d', d3.line()
		   .curve(d3.curveCardinal.tension(-0.3))
		   .x(d => emissionsScale(d.emissions))
		   .y(d => vertScale(d.year))
	   )
	   .attr('fill', 'none')
	   .attr('stroke', '#E7473C')
	   .attr('stroke-width', 6)
	   .style("display", "none");

   svg.append('path')
	   .datum(chinaData.filter(d => d.pil))
	   .attr('class', `pil-line ${chinaClass}`)
	   .attr('d', d3.line()
		   .curve(d3.curveCardinal.tension(-0.3))
		   .x(d => pilScale(d.pil))
		   .y(d => vertScale(d.year))
	   )
	   .attr('fill', 'none')
	   .attr('stroke', '#E7473C')
	   .attr('stroke-width', 6)
	   .style("display", "none");

   // Add data points for China and hide them initially
   ['literacy', 'life', 'emissions', 'pil'].forEach(metric => {
	   const scale = {
		   literacy: literacyScale,
		   life: lifeScale,
		   emissions: emissionsScale,
		   pil: pilScale
	   }[metric];

	   const suffix = {
		   literacy: '%',
		   life: 'y.o.',
		   emissions: 't',
		   pil: 'k'
	   }[metric];

	   const metricNameMapping = {
		literacy: 'Literacy Rate',
	 life: 'Life Expectancy',
	 emissions: 'CO2 Emissions',
	 pil: 'GDP'
 }[metric];

	   const groups = svg.selectAll(`g.${metric}-point-china`)
		   .data(chinaData.filter(d => d[metric]))
		   .enter()
		   .append('g')
		   .attr('class', `${metric}-point ${chinaClass}`)
		   .attr('transform', d => `translate(${scale(d[metric])}, ${vertScale(d.year)})`)
		   .style("display", "none"); // Hide initially

	   groups.each(function(d) {
		   const group = d3.select(this);
		   if (isEndPoint(d, chinaData, metric)) {
			   group.append('rect')
				   .attr('class', 'data-box')
				   .attr('x', -30)
				   .attr('y', -15)
				   .attr('width', 60)
				   .attr('height', 30)
				   .attr('rx', 5)
				   .attr('ry', 5)
				   .style('fill', '#E7473C')
				   .style('stroke', '#E7473C')
				   .style('stroke-width', 4);

			   group.append('text')
				   .attr('class', 'data-label')
				   .attr('text-anchor', 'middle')
				   .attr('dy', '0.35em')
				   .style('fill', '#fafafa')
				   .text(d[metric] + suffix);
		   } else {
			const circle = group.append('circle')
				   .attr('r', 10)
				   .style('fill', '#121212')
				   .style('stroke', '#E7473C')
				   .style('stroke-width', 3)
				   .lower()
				   .on('mouseover', function(event) {
				
					   // Porta il tooltip in cima
					   
					   tooltipGroup.node().parentNode.appendChild(tooltipGroup.node());
					   
					   // Ottieni la posizione del cerchio
					   const bbox = this.getBoundingClientRect();
					   const circleX = bbox.x + bbox.width / 2; // Centro del cerchio
					   const circleY = bbox.y; // Parte superiore del cerchio
				   
					   // Imposta il colore del tooltip in base al paese
					   tooltip.attr('fill', '#121212');
					   tooltip.attr('stroke', '#E7473C');
					   tooltip.attr('stroke-width', "3px")
					   
				   
					   // Mostra il tooltip
					   tooltipGroup
						   .attr('transform', `translate(${circleX - 12}, ${circleY - 75})`) // Posiziona sopra il cerchio
						   .attr('opacity', 1) // Mostra il gruppo del tooltip
						   .raise();
				   
					   // Imposta il testo della classe nel rettangolo
					tooltipClassText
					   .attr('x', 5) // Position text slightly inside the rectangle
					   .attr('y', 15) // Position at the top-left corner
					   .text(`${metricNameMapping}`) // Set text to include class
					   .style('fill', '#E7473C')
					   .attr('opacity', 0.6); // Show class text

				   // Set the value text in the bottom-left corner of the rectangle
				   tooltipValueText
					   .attr('x', 5) // Position text slightly inside the rectangle
					   .attr('y', 50) // Position at the bottom-left corner
					   .text(`${d[metric] + suffix}`) // Set text to include value
					   .style('fill', '#E7473C')
					   .style('font-size', '23px')
					   .attr('opacity', 1); // Show value text
				   })
				   

				   .on('mouseout', function() {
					   // Hide tooltip
					   tooltipGroup
					   .attr('opacity', 0)
					   .attr('transform', 'translate(0, 0)');
				   });
		   }
	   });
   });
});

