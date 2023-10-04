function updateCharts(portfolio) {

  let ETFdistribution_portfolioName = document.getElementById("portfolioType_output");
  if (ETFdistribution_portfolioName) {
    ETFdistribution_portfolioName.textContent = portfolio;
  };

  //weightAPIcall(weights_url, portfolio);
  updateDonutChart(portfolio);
  updateGauge(portfolio);
  //updateLineChart(portfolio);
  //portfolioAPIcall(portfolio_url, portfolio);
  update_currentPortfolio(portfolio_url, portfolio);
  //update_calendar(portfolio_url, portfolio);

}

function updateDonutChart(p){
  ETF_doughnutChart.destroy()
    // Initialize the donut chart with conservative data
    d3.json(weights_url + p)
        .then(function(data) {
            const values = Object.values(data).filter((value, key) => key !== 'portfolio');
            initializeDonutChart(values.slice(0, 5));
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
};

