// Initializing charts with conservative portfolio
let doughnutChart = document.getElementById('pie_chart').getContext('2d');
let lineChart = document.getElementById('portfolioHistory_lineChart').getContext('2d'); // get a reference to the canvas element

let weights_url = 'https://gayatrijohn3-d498f365-c54e-4381-857d-9f4ac180634e.socketxp.com/api/portfolio_weights/';
let portfolio_url = 'https://gayatrijohn3-d498f365-c54e-4381-857d-9f4ac180634e.socketxp.com/api/portfolio_data/';
let ETF_url = 'https://gayatrijohn3-d498f365-c54e-4381-857d-9f4ac180634e.socketxp.com/api/price_info/' // UPDATE


let p = 'conservative';

// initialize the donut chart with conservative data
d3.json(weights_url + p)
  .then(function(data) {

    console.log('donut data', data);

    const values = Object.values(data).filter((value, key) => key !== 'portfolio');
    console.log('donut values');
    intializeDonutChart(values.slice(0,5));

  })
  .catch(function(error) {
        // Handle any errors that occur during the request
        console.error('Error:', error);
  });




// initialize the line chart with conservative & YTD data
d3.json(portfolio_url + p)
    .then(function(data) {

        // Handle the JSON data here
        //console.log(data)

        data.forEach((item) => {
            item.dateObj = new Date(item.date);
            });

            // Sort the list of dictionaries by date in ascending order
            data.sort((a, b) => a.dateObj - b.dateObj);

            // Remove the dateObj key if you don't need it anymore
            data.forEach((item) => {
                delete item.dateObj;
            });

            // Now, data is sorted by date in ascending order
            //console.log(data);

            portfolio_values = [];
            portfolio_dates = [];

            data.map(function(item){
                portfolio_values.push(item[`${p}_portfolio_value`])
                portfolio_dates.push(item.date)
            })

            let dates = portfolio_dates.map(dateStr => new Date(dateStr));
            
            initializeLineChart(portfolio_values, dates); // making the line chart
            initializePortfolioValue(portfolio_values); // populating the current portfolio value
        })
    .catch(function(error) {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    });




// Initialize the ETF summary table

let ETFtabledata = [];
let ETFnames = ['BOND', 'SPY', 'VGK', 'VONG', 'SCHE'];
let ETFsURL = [];
let results = [];

for (i=0; i<ETFnames.length; i++) {
    ETFsURL.push(ETF_url + ETFnames[i]);
}

// Use D3.js to make API calls for each URL
ETFsURL.forEach(url => {
    d3.json(url)
      .then(data => {
        // Store the result in the results array
        results.push(data);
  
        // Check if all API calls are complete
        if (results.length === ETFsURL.length) {
          // All API calls are done, you can work with 'results' here
          console.log('All API calls completed:', results);
        }
      })
      .catch(error => {
        // Handle any errors that occur during API calls
        console.error('API error:', error);
      });
  });
