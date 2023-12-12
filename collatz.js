// function conjecture(num) {
//   let i = num;
//   let sequence = [i];
//   let steps = 0
//   while (i > 1) {
//     steps++;
//     if (i % 2 === 0) {
//       i /= 2;
//     } else {
//       i = i * 3 + 1;
//     }
//     sequence.push(i);
//   }
//   return { final: i, steps: steps };
// }

// const result = conjecture(9977);
// console.log(`Final value: ${result.final}, Steps taken: ${result.steps}`);


// function conjecture(num) {
//   let i = num;
//   let sequence = [i];
//   while (i > 1) {
//     if (i % 2 === 0) {
//       i /= 2;
//     } else {
//       i = i * 3 + 1;
//     }
//     sequence.push(i);
//   }
//   return sequence;
// }




// collatz.js

function conjecture(num) {
    let i = num;
    let sequence = [i];
    while (i > 1) {
        if (i % 2 === 0) {
            i /= 2;
        } else {
            i = i * 3 + 1;
        }
        sequence.push(i);
    }
    return sequence;
}

let chart; // Declare chart globally

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('collatzGraph').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Collatz Conjecture',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

function updateGraph() {
    const num = parseInt(document.getElementById('userInput').value);
    if (!isNaN(num) && num > 0) {
        const sequence = conjecture(num);
        chart.data.labels = sequence.map((_, index) => index + 1);
        chart.data.datasets[0].data = sequence;
        chart.update();
    } else {
        alert('Please enter a valid positive number.');
    }
}

