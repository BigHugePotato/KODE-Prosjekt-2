
function birthdayParadoxCalculator(groupSize, numberOfTests) {
  let sharedBirthdayCount = 0;

  for (let i = 0; i < numberOfTests; i++) {
    const birthdays = generateRandomBirthdays(groupSize);

    if (hasSharedBirthday(birthdays)) {
      sharedBirthdayCount++;
    }
  }

  return (sharedBirthdayCount / numberOfTests) * 100; // Calculate percentage
}

function generateRandomBirthdays(groupSize) {
  const birthdays = [];
  for (let i = 0; i < groupSize; i++) {
    const randomBirthday = Math.floor(Math.random() * 365) + 1; // 365 days in a year
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
    ).textContent = `In a group of ${numberOfPeople} people, with ${numberOfTestGroups} test groups, there was one or more people who shared a birthday in ${result.toFixed(
      2
    )}% of the test groups.`;

    // Update the Birthday Paradox graph with the result
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

    // Update the Birthday Paradox graph with the result
    updateGraph(groupSize, numberOfTestGroups);
  }
}


// ... (existing code)


// ... (existing code)

function updateGraph(numPeople, numberOfTestGroups) {
  const sequence = Array.from({ length: numberOfTestGroups }, (_, index) =>
    birthdayParadoxCalculator(numPeople, 1)
  );

  // Update the Birthday Paradox graph with the result
  chart.data.labels = Array.from(
    { length: numberOfTestGroups },
    (_, index) => index + 1
  );
  chart.data.datasets[0].data = sequence;
  chart.update();
}



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

const ctx = document.getElementById("birthgraph").getContext("2d");
chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Birthday Paradox",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        callback: function (value) {
          return value.toLocaleString();
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
    responsive: true,
    maintainAspectRatio: false,
  },
});

function birthdayParadoxCalculator(groupSize, numberOfTests) {
  let sharedBirthdayCount = 0;

  for (let i = 0; i < numberOfTests; i++) {
    const birthdays = generateRandomBirthdays(groupSize);

    if (hasSharedBirthday(birthdays)) {
      sharedBirthdayCount++;
    }
  }

  return sharedBirthdayCount; // Return the count of shared birthdays
}

// ... (other functions)


function updateGraph(numPeople, numTestGroups) {
  if (
    !isNaN(numPeople) &&
    numPeople > 0 &&
    !isNaN(numTestGroups) &&
    numTestGroups > 0
  ) {
    const sequence = Array.from({ length: numTestGroups }, () =>
      birthdayParadoxCalculator(numPeople, 2)
    );

    chart.data.labels = Array.from(
      { length: numTestGroups },
      (_, index) => index + 2
    );
    chart.data.datasets[0].data = sequence;

    // Set Y-axis ticks to match the number of people in each group
    chart.options.scales.y.ticks.stepSize = 2;
    chart.options.scales.y.ticks.suggestedMax = Math.ceil(numPeople); // Use suggestedMax instead of max

    chart.options.scales.x.title.text = "Number of Groups";
    chart.options.scales.y.title.text = "Number of People";
    chart.update();
  } else {
    alert("Please enter valid positive numbers for both fields.");
  }
}

// ... (other code)

