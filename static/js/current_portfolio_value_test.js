// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// Display the current portfolio value and percent change.
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------


function display_portfolioValue(initialAmount, updatedAmount) {

    // Calculate the percent change
    let percentChange = Number((((updatedAmount - initialAmount) / initialAmount) * 100).toString().slice(0,6));

    let currentPortfolio_value = document.getElementById("currentPortfolioValue")
    if (currentPortfolio_value) {
        currentPortfolio_value.textContent = updatedAmount;
    }

    let currentPortfolio_amount = document.getElementById("percentChange")
    if (currentPortfolio_amount) {
        currentPortfolio_amount.textContent = percentChange;
    }
}

// -----------------------------------------------------------------------------------------------
// Function to update the portfolio value based on the selected portfolio from the drop down menu.
// -----------------------------------------------------------------------------------------------

function update_currentPortfolio(portfolio_url, p) {
    
    d3.json(portfolio_url + p)
    .then(function(data) {

        // Handle the JSON data here

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

            let portfolio_values = [];

            data.map(function(item){
                portfolio_values.push(item[`${p}_portfolio_value`])
            })

            let previousDate = portfolio_values[portfolio_values.length - 2];
            let currentDate = portfolio_values[portfolio_values.length - 1];
            
            display_portfolioValue(previousDate, currentDate); // populating the current portfolio value
        })
    .catch(function(error) {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    });
}
