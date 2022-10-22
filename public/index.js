async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //fetch data from twelve data api 
    // let response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX,IXIC&interval=1min&apikey=yourapikey")
    // let result = await response.json();
    // console.log(result)


    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    
   let chart2 = new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: "Highest Stock Price",
            data: stocks.map(stock => highestStock(stock.values.map(value => parseFloat(value.high)))),
            backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
            borderColor:  stocks.map(stock => getColor(stock.meta.symbol)),
        }]
    }
});
    
    
    
    
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    
    function highestStock(values) {
        let highest = 0

        for (key in values) {
          
            if (values[key] > highest) {
                highest = values[key]
            }
        }
        return [highest]
    }



}

main()