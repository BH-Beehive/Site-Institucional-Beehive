const data1 = {
    datasets: [{
        label: 'My First Dataset',
        data: [50,50],
        backgroundColor: [
            '#00FF29',
            '#FF7A00'
        ],
        hoverOffset: 4
    }]
};

const config1 = {
    type: 'doughnut',
    data: data1,
};

const myChart1 = new Chart(
    document.getElementById('chart2'),
    config1
);
