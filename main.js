let dropdownList = document.getElementById("list");
      
      dropdownList.style.display = "none";
      
      function openDropdown() {
         if (dropdownList.style.display != "none") {
            dropdownList.style.display = "none";
         } else {
            dropdownList.style.display = "block";
         }
      }
      
      let portfolio = 'Conservative'
      const p_elements = document.getElementsByTagName("p");
      
      // access all p elements
      const totalP = p_elements.length;
      
      // iterate through all <p> elements
      for (let i = 0; i < totalP; i++) {
      
         const option = p_elements[i];
      
         // add event listner to <p> element
         option.addEventListener("click", () => {
            // When a user clicks on any p element, get its innerHTML
            portfolio = option.innerHTML;
            updateCharts(portfolio); // calling the update charts function
            updateLineChart(portfolio);
            console.log("The selected option is " + portfolio);

         })
      }

      let portfolioHistory_lineChart;
        function updateLineChart(p) {
          // Destroy the existing chart instance if it exists
          if (portfolioHistory_lineChart) {
              portfolioHistory_lineChart.destroy();
          };
      
          // Fetch new data based on the new 'p' value
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
      
                  // Process the new data
                  let portfolio_values = [];
                  let portfolio_dates = [];
      
                  data.forEach(function(item) {
                      portfolio_values.push(item[`${p}_portfolio_value`]);
                      portfolio_dates.push(item.date);
                  });
      
                  // Create the updated line chart
                  portfolioHistory_lineChart = initializeLineChart(portfolio_values, portfolio_dates);
                  
                  // Display other information as needed
                  let previousDate = portfolio_values[portfolio_values.length - 2];
                  let currentDate = portfolio_values[portfolio_values.length - 1];
                  display_portfolioValue(previousDate, currentDate);
              })
              .catch(function(error) {
                  // Handle any errors that occur during the request
                  console.error('Error:', error);
              });
            }
            
      