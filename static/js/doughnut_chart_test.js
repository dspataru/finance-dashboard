// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------
// Creating a doughnut chart using Chart.js and updating it based on dropdown selection.
// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------


function calculateInvestmentAmount(weights) {
  return weights; //weights.map(function(x) {return (x/100)*1000000});
}

// function to make the portfolio labels
function portfolioLabels(portfolioData) {
  let ETF_names = ['BOND', 'SPY', 'VGK', 'SCHE', 'VONG'];
  let labels = [];
  for (i=0; i<portfolioData.length; i++) {
    labels.push([ETF_names[i], '$' + portfolioData[i]]);
  }
  return labels;
}


// function to config params for donut chart
// function intializeDonutChart(weights) {


//   return doughnut_data, options;
// }

///////////////////////////////////////////////////////////////////////

// // Step 1: Make an API request to fetch the initial data
// function fetchInitialDataAndInitializeChart(initialURL) {

//     d3.json(initialURL)
//         .then(initialData => {
//             // Initialize the chart with the initial data
//             initializeChart(initialData);
//         })
//         .catch(error => {
//             console.error("Initial data API error:", error);
//         });
// }

// Step 2: Initialize the chart with the initial data
function initializeDonutChart(initialData) {

  
  let doughnutChart = document.getElementById('pie_chart').getContext('2d');

  let data = {
    weight: initialData,
    investmentAmount: calculateInvestmentAmount(initialData)
  }

  // defining the parameters for the doughnut chart
  let colors = ['#A94064', '#7FFFD4', 'teal', 'pink', '#800080'];
  let bordercolor = '#ffffff';
  let hoverBorderColor = '#000000';
  let hoverOffset = 20;
  let borderWidth = 4;


  // -----------------------------------------
  // Defining the data for the doughnut chart.
  // -----------------------------------------
  let doughnut_data = {
    labels: portfolioLabels(data.investmentAmount), // need to modify this to grab the ETF info from etf_info df
    datasets: [{
        data: data.weight, // values for each slice (need to modify to grab the weights from latest date)
        backgroundColor: colors, // colors for each slice
        borderColor: bordercolor,
        borderWidth: borderWidth,
        hoverBorderColor: hoverBorderColor,
        hoverOffset: hoverOffset
    }]
  };

  // ------------------------------------
  // Defining the doughnut chart options.
  // ------------------------------------

  let options = {
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    },
    plugins: {
      legend: {
        display: false, // removing the legend
        labels: {
          color: 'rgb(255, 255, 255)'
        }
      }
    } 
  };
  
  let ETF_doughnutChart = new Chart(doughnutChart, {
    type: 'doughnut',
    data: doughnut_data,
    options: options
  });
}

// Step 3: Make an API request to fetch new data and update the chart
function weightAPIcall(weightURL, p) {

  d3.json(weightURL + p)
  .then(function(data) {

    console.log(data)
    let new_data = Object.values(data).filter((value, key) => key !== 'portfolio');
    ETF_doughnutChart.data = new_data;
    ETF_doughnutChart.update();
  
  })

};
 


