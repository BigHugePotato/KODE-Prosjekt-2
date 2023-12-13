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

const ctx = document.getElementById('collatzGraph').getContext('2d'); //returns a drawing to the canvas
chart = new Chart(ctx, { //creates a new chart and the object contains the configs (ctx tells the chart where to render)
    type: 'line',
    data: {
        labels: [],
        datasets: [{ // settings for the visuals
            label: 'Collatz Conjecture',
            data: [],
            borderColor: 'rgb(75, 192, 192)', // Change line color
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Change fill color
            borderWidth: 2, // Change line width
            tension: 0.1 // Line smoothness
        }]
    },
    options: { //decides to start at zero in the y-axis
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black', // Change legend text color
                    font: {
                        size: 16 // Change legend font size
                    }
                }
            }
        },
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false // Allow custom aspect ratio
    }
});


function updateGraph() {
    const num = parseInt(document.getElementById('userInput').value); //gets the number from the user and makes it an int
    if (!isNaN(num) && num > 0) {
        const sequence = conjecture(num); //calls the function to get the array with calculations
        chart.data.labels = sequence.map((_, index) => index + 1); //Uses map to make labels to number the x-axis
        chart.data.datasets[0].data = sequence; //Uses the numbers in the sequence array to make the values on the y-axis
        chart.update(); //draws the chart
    } else {
        alert('Please enter a valid positive number.');
    }
}

