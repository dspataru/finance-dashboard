// Function to update the table
function updateETFTable(ETF_info) {
    
    //console.log(ETF_info);
    let tickerSymbol = [];
    let closingPrice = [];
    let tradingVolume = [];
    let percentChange = [];

    ETF_info.map(function(item){
        tickerSymbol.push(item.ticker_symbol); // get ticker symbol
        closingPrice.push(item.close_price); // get closing price
        tradingVolume.push(item.trading_volume); // get trading vol
        percentChange.push(item.daily_return); // get % change of stock value
    });

    let tableBody = document.getElementById("tableBody");

    // Loop through the arrays and create rows for each item
    for (let i = 0; i < tickerSymbol.length; i++) {
        const row = document.createElement("tr");

        const tickerSymbolCell = document.createElement("td");
        tickerSymbolCell.textContent = tickerSymbol[i];
        row.appendChild(tickerSymbolCell);

        const closingPriceCell = document.createElement("td");
        closingPriceCell.textContent = Number(closingPrice[i].toString().slice(0,5));
        row.appendChild(closingPriceCell);

        const tradingVolumeCell = document.createElement("td");
        tradingVolumeCell.textContent = Number(tradingVolume[i].toString().slice(0,5));
        row.appendChild(tradingVolumeCell);

        const percentChangeCell = document.createElement("td");
        percentChangeCell.textContent = Number(percentChange[i].toString().slice(0,5));
        row.appendChild(percentChangeCell);

        tableBody.appendChild(row);
    };
};