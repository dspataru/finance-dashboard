// ---------------------------------------------------------------------------------
// Creating a line chart using Chart.js and updating it based on dropdown selection.
// ---------------------------------------------------------------------------------

let YTD_url = 'https://nikitagahoi-0c509522-ac93-40bc-8e9f-b8e18d3f0921.socketxp.com/api/portfolio_data/';
let start = '/2022-03-02'
let currentDate = new Date();
let currentDate_formatted = currentDate.toISOString(0, 10);

let oneYearAgo = new Date(currentDate);
oneYearAgo.setFullYear(currentDate.getFullYear() - 1); // subtract one year from the current date
let oneYearAgoFormatted = oneYearAgo.toISOString().slice(0, 10); // format the result as a string

let twoYearAgo = new Date(currentDate);
twoYearAgo.setFullYear(currentDate.getFullYear() - 1); // subtract one year from the current date
let twoYearAgoFormatted = oneYearAgo.toISOString().slice(0, 10); // format the result as a string

function initializeLineChart(portfolioVals, date) {

    let lowRisk_lineData = {
        labels: date,
        datasets: [{
            label: '', // needs to change or GO
            data: portfolioVals,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
        }]
    };



    // Generate default graph
    let portfolioHistory_lineChart = new Chart(lineChart, {
        type: 'line',
        data: lowRisk_lineData,
        options: {
            resposive: true
        }
    });
    return portfolioHistory_lineChart;
}


// Function to update the line chart
function update_lineChart(portfolio_values, dates) {
    
    portfolioHistory_lineChart.data.datasets[0].data = portfolio_values;   // Update the chart's data with the new data
    portfolioHistory_lineChart.labels = dates;   // Update the chart's data with the new timeline
    portfolioHistory_lineChart.update();
}


function portfolioAPIcall(portfolioURL, p) {

        d3.json(portfolioURL + p)
        .then(function(data) {
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
            //console.log(data)

            portfolio_values = [];
            portfolio_dates = [];

            data.map(function(item){
                portfolio_values.push(item[`${p}_portfolio_value`]);
                //console.log(item.date);
                portfolio_dates.push(item.date);
            })

            let dates = portfolio_dates.map(dateStr => new Date(dateStr));
            
            // making the line chart
            update_lineChart(portfolio_values, dates);
        })
        .catch(function(error) {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        })
};

// Function that listens for a button press event.
function update_timeline() {
    
    console.log('button was clicked');

    // Add a click event listener to the button
    let YTD_button = document.getElementById('YTD');
    let oneYear_button = document.getElementById('1Y');
    let twoYear_button = document.getElementById('2Y');

    YTD_button.addEventListener('click', () => { portfolioAPIcall(YTD_url, p, start) });
    oneYear_button.addEventListener('click', () => { portfolioAPIcall(YTD_url, p, oneYearAgoFormatted) });  
    twoYear_button.addEventListener('click', () => { portfolioAPIcall(YTD_url, p, twoYearAgoFormatted) });

}
