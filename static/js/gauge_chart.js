// Code was adapted from: https://jscharting.com/editor/#name=CircularMarker.htm
// and modified to meet the requirements of the dashboard.


// ----------------------------------------------------------------------
// Setting the variables for the default gauge chart: low risk portfolio.
// ----------------------------------------------------------------------

let description = "<span style='fontSize: 20' 'font-family: poppins, sans-serif'>Conservative</span>";
let pointer_colour = '#7FFFD4';
let pointer_value = 425;


// ---------------------------------------
// Function to initialize the gauge chart.
// ---------------------------------------

function make_gaugeChart(description, pointer_colour, pointer_value) {

  gauge_chart = new JSC.chart('gauge_chart', { 
    type: 'gauge', 
    legend_visible: false,
    targetElement: 'gauge_chart', 
    chartArea_boxVisible: false, 
    xAxis: { 
      /*Used to position marker on top of axis line.*/
      scale: { range: [0, 1], invert: true } 
    }, 
    palette: { 
      ranges: [ 
        { value: 0, color: 'aquamarine' }, 
        { value: 1/3, color: '#FFD221' }, 
        { value: 2/3, color: '#A94064' }, 
        { value: 1, color: '#A94064' }, 
      ] 
    }, 
    yAxis: { 
      defaultTick: { padding: 13, enabled: false }, 
      line: { 
        width: 15, 
        breaks_gap: 0.03, 
        color: 'smartPalette'
      }, 
      scale: { range: [350, 850] } 
    }, 
    defaultSeries: { 
      opacity: 1, 
      shape: { 
        label: { 
          align: 'center', 
          verticalAlign: 'middle'
        } 
      } 
    }, 
    series: [ 
      { 
        type: 'marker', 
        shape_label: { 
          text: 
            description,  // this text gets updated when the portfolio changes
          style: { fontSize: 25 } 
        }, 
        defaultPoint: { 
          marker: { 
            outline: { 
              width: 10, 
              color: pointer_colour  // this colour gets updated when the portfolio changes
            }, 
            fill: 'white', 
            type: 'circle', 
            visible: true, 
            size: 30 
          } 
        }, 
        points: [[1, pointer_value]]  // this gets updated to indicate the level of risk
      },
    ] 
  });

}


// -------------------------------------
// Initializing the default gauge chart.
// -------------------------------------

make_gaugeChart(description, pointer_colour, pointer_value)



// -----------------------------------
// Function to update the gauge chart.
// -----------------------------------

function updateGauge(selectedData) {

  let description;
  let pointer_colour;
  let pointer_value;

  // Check which portfolio option was selected
  if (selectedData === 'Growth') {
    description = "<span style='fontSize: 20' 'font-family: poppins, sans-serif'>Growth</span>";
    pointer_colour = '#A94064';
    pointer_value = 750;
  }
  else if (selectedData === 'Balanced') {
    description = "<span style='fontSize: 20' 'font-family: poppins, sans-serif'>Balanced</span>";
    pointer_colour = '#FFD221';
    pointer_value = 600;
  }
  else {
    description = "<span style='fontSize: 20' 'font-family: poppins, sans-serif'>Conservative</span>";
    pointer_colour = '#7FFFD4';
    pointer_value = 425;
  }

  make_gaugeChart(description, pointer_colour, pointer_value);

}