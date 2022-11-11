const labels4 = [
    'Setor 1',
    'Setor 1',
    'Setor 1',
    'Setor 1',
    'Setor 1',
];

const data3 = {
    labels: labels4,
    datasets: [{
        backgroundColor: '#00FF29',
        data: [10, 20, 6],
    }, {

        backgroundColor: '#FF7A00',
        data: [3, 10, 5],
    }, {

        backgroundColor: '#FF0F00',
        data: [0, 10, 5],
    }]
};

const config4 = {
    type: 'bar',
    data: data3,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        responsive:false
    },
};

const myChart3 = new Chart(
    document.getElementById('setorChart'),
    config4
);