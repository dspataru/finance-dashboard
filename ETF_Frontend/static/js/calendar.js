
// Calendar API call (MAY NOT NEED)
function calendarAPIcall(portfolioURL, p, start, end) {

    d3.json(portfolioURL + p + start + end)
    .then(function(data) {
      console.log(data)
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
        console.log(data)

        portfolio_values = [];
        portfolio_dates = [];

        data.map(function(item){
            portfolio_values.push(item[`${p}_portfolio_value`])
            portfolio_dates.push(item.date)
        })

        let dates = portfolio_dates.map(dateStr => new Date(dateStr));
        
        // making the line chart
        update_lineChart(portfolio_values, dates);
    })
    .catch(function(error) {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    })
}

// Adding functionality to the calendar selection
function update_calendar(portfolio_Value, portfolio_name) {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    // Add an event listener to the start date input
    startDateInput.addEventListener("change", function () {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Check if the selected start date is after the end date
        if (startDate > endDate) {
            alert("Start date cannot be after end date");
            startDateInput.value = '2023-03-20'; // UPDATE TO THE CORRECT START DATE
        }
    });

    // Add an event listener to the end date input
    endDateInput.addEventListener("change", function () {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Check if the selected end date is before the start date
        if (endDate < startDate) {
            alert("End date cannot be before start date");
            endDateInput.value = currentDate.toJSON().slice(0,10); // reset the input value to the most current date
        }
    });

    calendarAPIcall(portfolio_Value, portfolio_name, startDateInput.value, endDateInput.value);
}