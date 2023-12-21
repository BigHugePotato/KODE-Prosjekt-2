function birthdayParadoxCalculator(groupSize) {
  const birthdays = generateRandomBirthdays(groupSize);
  return hasSharedBirthday(birthdays);
}

function generateRandomBirthdays(groupSize) {
  const birthdays = [];
  for (let i = 0; i < groupSize; i++) {
    const randomBirthday = Math.floor(Math.random() * 365) + 1; 
    birthdays.push(randomBirthday);
  }
  return birthdays;
}


function hasSharedBirthday(birthdays) {
  const uniqueBirthdays = new Set(birthdays);
  return uniqueBirthdays.size !== birthdays.length;
}





function calculateShared() {
  const peopleInput = document.getElementById("peopleInput");
  const groupsInput = document.getElementById("groupsInput");

  const numberOfPeople = parseInt(peopleInput.value);
  const numberOfTestGroups = parseInt(groupsInput.value);

  let sharedBirthdayCount = 0;


  for (let i = 0; i < numberOfTestGroups; i++) {
    if (birthdayParadoxCalculator(numberOfPeople)) {
      sharedBirthdayCount++;
    }
  }

  const sharedPercentage = (sharedBirthdayCount / numberOfTestGroups) * 100;

  document.getElementById(
    "resultParagraph"
  ).textContent = `In a group of ${numberOfPeople} people, with ${numberOfTestGroups} test groups, there was one or more people who shared a birthday in ${sharedPercentage.toFixed(2)}% of the test groups.`;

  updateGraph(sharedBirthdayCount, numberOfTestGroups - sharedBirthdayCount);
}












let chart;

const ctx = document.getElementById("birthgraph").getContext("2d");
chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Shared Birthday", "No Shared Birthday"],
    datasets: [{
        label: "Birthday Paradox",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 159, 64, 0.5)"
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 159, 64)"
        ],
        borderWidth: 1
      }]
    },
  options: {
    scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Groups"
          }
        },
        x: {
          title: {
            display: true,
            text: "Outcome"
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: "blue",
            font: {
              size: 16
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

function updateGraph(sharedCount, noSharedCount) {
  chart.data.labels = ["Shared Birthday", "No Shared Birthday"];
  chart.data.datasets[0].data = [sharedCount, noSharedCount];

  chart.type = "bar"; // Change chart type to bar
  chart.options.scales.x.title.text = "Outcome";
  chart.options.scales.y.title.text = "Number of Groups";
  chart.options.plugins.tooltip.callbacks.label = function (tooltipItem) {
    return `${tooltipItem.label}: ${tooltipItem.formattedValue} groups`;
  };

  chart.update();
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
