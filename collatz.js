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

const ctx = document.getElementById("collatzGraph").getContext("2d"); //returns a drawing to the canvas
chart = new Chart(ctx, {
  //creates a new chart and the object contains the configs (ctx tells the chart where to render)
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        // settings for the visuals
        label: "Collatz Conjecture",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(250, 25, 25, 0.5)",
        borderWidth: 2,
        tension: 0.1, // Line smoothness
      },
    ],
  },
  options: {
    scales: {
      y: {
        ticks: { color: "black" },
        // grid: {color: "black"}
      },
      x: {
        ticks: { color: "black" },
        // grid: { color: "black"}
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Change legend text color
          font: {
            size: 18, // Change legend font size
          },
        },
      },
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow custom aspect ratio
  },
});

function updateGraph() {
  const num = parseInt(document.getElementById("userInput").value); //gets the number from the user and makes it an int
  if (!isNaN(num) && num > 0) {
    const sequence = conjecture(num); //calls the function to get the array with calculations
    chart.data.labels = sequence.map((_, index) => index + 1); //Uses map to make labels to number the x-axis
    chart.data.datasets[0].data = sequence; //Uses the numbers in the sequence array to make the values on the y-axis
    chart.update(); //draws the chart

    const steps = sequence.length - 1;
    const highestValue = Math.max(...sequence); //spread operator, expands the array to individual arguments for the Math.max function
    document.getElementById(
      "sumText"
    ).innerHTML = `${num} brukte ${steps} steg på å nå 1, og den høyeste verdien som ble nådd var ${highestValue}`;
  } else {
    alert("Please enter a valid positive number.");
  }
}

function randomNumber() {
  const randomNum = Math.floor(Math.random() * 10000) + 1;

  document.getElementById("userInput").value = randomNum;

  updateGraph();
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  // Define color schemes for light and dark modes
  const lightModeColors = {
    borderColor: "rgb(75, 192, 192)",
    backgroundColor: "rgba(75, 192, 192, 0.5)",
    legendColor: "black",
    ticksColor: "black",
  };

  const darkModeColors = {
    borderColor: "rgb(255, 205, 86)",
    backgroundColor: "rgba(255, 205, 86, 0.5)",
    legendColor: "white",
    ticksColor: "white",
  };

  const currentColors = isDarkMode ? darkModeColors : lightModeColors;

  // Update chart colors
  chart.data.datasets[0].borderColor = currentColors.borderColor;
  chart.data.datasets[0].backgroundColor = currentColors.backgroundColor;
  chart.options.plugins.legend.labels.color = currentColors.legendColor;

  chart.options.scales.y.ticks.color = currentColors.legendColor;
  chart.options.scales.x.ticks.color = currentColors.legendColor;

  // Re-render the chart
  chart.update();
}
