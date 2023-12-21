
function birthdayParadoxCalculator(groupSize, numberOfTests) {
  let testGroupsWithSharedBirthdays = 0;

  for (let i = 0; i < numberOfTests; i++) {
    const birthdays = generateRandomBirthdays(groupSize);

    if (hasSharedBirthday(birthdays)) {
      testGroupsWithSharedBirthdays++;
      // console.log(`Test Group ${i + 1}: ${birthdays.join(", ")}`);
    }
  }

  return (testGroupsWithSharedBirthdays / numberOfTests) * 100;
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

  let result;

  if (numberOfPeople > 0) {
    result = birthdayParadoxCalculator(numberOfPeople, numberOfTestGroups);
   document.getElementById(
     "resultParagraph"
   ).textContent = `In a group of ${numberOfPeople} people, with ${numberOfTestGroups} test groups, there was one or more people who shared a birthday in ${Math.min(
     result,
     100
   ).toFixed(2)}% of the test groups.`;


    
    updateGraph(numberOfPeople, numberOfTestGroups);
  } else {
    const groupSize = numberOfTestGroups;
    let totalSharedBirthdays = 0;

    for (let i = 0; i < numberOfTestGroups; i++) {
      totalSharedBirthdays += birthdayParadoxCalculator(groupSize, 1);
    }

    result = totalSharedBirthdays / numberOfTestGroups;
    document.getElementById(
      "resultParagraph"
    ).textContent = `In a group of ${groupSize} people, with ${numberOfTestGroups} test groups, there was one or more people who shared a birthday in ${result.toFixed(
      2
    )}% of the test groups.`;

   
    updateGraph(groupSize, numberOfTestGroups);
  }
}










let chart;

const ctx = document.getElementById("birthgraph").getContext("2d");
chart = new Chart(ctx, {
  type: "scatter",
  data: {
    labels: [],
    datasets: [
      {
        label: "Birthday Paradox",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Number of Groups",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100, // Set max to 100 for percentage
        callback: function (value) {
          return value.toLocaleString() + "%";
        },
        title: {
          display: true,
          text: "Percentage with Shared Birthday",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "blue",
          font: {
            size: 16,
          },
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          const group = tooltipItem.dataIndex + 1;
          const percentage = tooltipItem.value.y.toFixed(2);
          return `Group: ${group}, Percentage: ${percentage}%`;
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

function updateGraph(numPeople, numTestGroups) {
  if (
    !isNaN(numPeople) &&
    numPeople > 0 &&
    !isNaN(numTestGroups) &&
    numTestGroups > 0
  ) {
    const sequence = Array.from({ length: numTestGroups }, (_, index) => ({
      x: index + 1,
      y: birthdayParadoxCalculator(numPeople, 1),
    }));

    chart.data.labels = [];
    chart.data.datasets[0].data = sequence;

    chart.options.scales.x.title.text = "Number of Groups";
    chart.options.scales.y.title.text = "Percentage with Shared Birthday";
    chart.update();
  } else {
    alert("Please enter valid positive numbers for both fields.");
  }
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