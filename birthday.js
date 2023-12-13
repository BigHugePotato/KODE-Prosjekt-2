function birthdayParadoxCalculator(groupSize, numberOfTests) {
  let sharedBirthdayCount = 0;

  for (let i = 0; i < numberOfTests; i++) {
    const birthdays = generateRandomBirthdays(groupSize);

    if (hasSharedBirthday(birthdays)) {
      sharedBirthdayCount++;
    }
  }

  return sharedBirthdayCount;
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

// Example: X = 20, Y = 100
const groupSize = 20;
const numberOfTests = 100;

const result = birthdayParadoxCalculator(groupSize, numberOfTests);
console.log(
  `Out of ${numberOfTests} tests with groups of ${groupSize} people, ${result} had at least two people with the same birthday.`
);
