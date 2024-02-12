'use strict';

var chartConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Real-time Data',
            fill: false,
            backgroundColor: '#75c181',
            borderColor: '#75c181',
            data: [],
        }]
    },
    options: {
        responsive: true,
        aspectRatio: 1.5,
        legend: {
            display: true,
            position: 'bottom',
            align: 'end',
        },
        title: {
            display: true,
            text: 'Real-time Line Chart',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleMarginBottom: 10,
            bodySpacing: 10,
            xPadding: 16,
            yPadding: 16,
            borderColor: '#e7e9ed',
            borderWidth: 1,
            backgroundColor: '#fff',
            bodyFontColor: '#252930',
            titleFontColor: '#252930',
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: '#e7e9ed',
                },
                scaleLabel: {
                    display: false,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: '#e7e9ed',
                },
                scaleLabel: {
                    display: false,
                },
            }]
        }
    }
};

var ctx = document.getElementById('realtime-chart').getContext('2d');
var myLineChart = new Chart(ctx, chartConfig);

function fetchData() {
    $.ajax({
        url: 'fetchData.php',
        method: 'GET',
        success: function (data) {
            // Extract the relevant data for the line chart
            var mwData = data.map(function (item) {
                return item.mw; // Assuming 'mw' is the field in your database
            });

            // Update chart data and labels
            myLineChart.data.labels = Array.from({ length: mwData.length }, (_, i) => (i + 1).toString());
            myLineChart.data.datasets[0].data = mwData;

            // Update the chart
            myLineChart.update();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// Fetch data every 2 seconds (adjust as needed)
setInterval(fetchData, 2000);
