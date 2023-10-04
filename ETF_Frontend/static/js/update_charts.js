
function updateCharts(portfolio) {

    let ETFdistribution_portfolioName = document.getElementById("portfolioType_output");
    if (ETFdistribution_portfolioName) {
      ETFdistribution_portfolioName.textContent = portfolio;
    }


    weightAPIcall(weights_url, portfolio);
    updateGauge(portfolio);
    portfolioAPIcall(portfolio_url, portfolio);
    update_currentPortfolio(portfolio_url, portfolio);
    //update_calendar(portfolio_url, portfolio);
}