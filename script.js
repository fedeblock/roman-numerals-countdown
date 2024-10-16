// Function to convert numbers to Roman numerals
function toRoman(num) {
  // Define an array of Roman numeral symbols paired with their corresponding values
  const romanNumerals = [
    ["M", 1000],  // 1000 -> M
    ["CM", 900],  // 900 -> CM
    ["D", 500],   // 500 -> D
    ["CD", 400],  // 400 -> CD
    ["C", 100],   // 100 -> C
    ["XC", 90],   // 90 -> XC
    ["L", 50],    // 50 -> L
    ["XL", 40],   // 40 -> XL
    ["X", 10],    // 10 -> X
    ["IX", 9],    // 9 -> IX
    ["V", 5],     // 5 -> V
    ["IV", 4],    // 4 -> IV
    ["I", 1]      // 1 -> I
  ];

  let result = "";  // Initialize an empty string to store the Roman numeral result
  
  // Iterate over the Roman numeral symbols and their values
  for (let [roman, value] of romanNumerals) {
    // While the number is greater than or equal to the current value,
    // append the corresponding Roman numeral symbol to the result
    while (num >= value) {
      result += roman;
      num -= value;  // Subtract the value from the number
    }
  }
  
  return result;  // Return the final Roman numeral representation
}

// Countdown configuration
const countdownElement = document.getElementById("countdown");  // Get the countdown container element
let targetDate = new Date().getTime() + (10 * 24 * 60 * 60 * 1000);  // Set target date 10 days from now (can be customized)
let showDays = true; // Option to determine if days should be shown
let showUnits = { days: true, hours: true, minutes: true, seconds: true }; // Option to determine which units should be shown

// Function to update the countdown on the screen
function updateCountdown() {
  countdownElement.innerHTML = "";  // Clear previous content to avoid duplications

  // Calculate the time remaining
  const now = new Date().getTime();
  let timeRemaining = targetDate - now;

  // Calculate days, hours, minutes, and seconds
  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // If showDays is false, add the days to the hours
  if (!showDays) {
    hours += days * 24;
    days = 0; // Set days to zero since they are being added to hours
  }

  // Convert each unit to Roman numerals if the unit is supposed to be shown
  const daysRoman = (showUnits.days && days > 0) ? toRoman(days) + "d " : "";
  const hoursRoman = showUnits.hours ? toRoman(hours) + "h " : "";
  const minutesRoman = showUnits.minutes ? toRoman(minutes) + "m " : "";
  const secondsRoman = showUnits.seconds ? toRoman(seconds) + "s" : "";

  // Combine all Roman numeral representations
  const romanValue = daysRoman + hoursRoman + minutesRoman + secondsRoman;

  // Create elements for each character of the Roman numeral value
  for (let char of romanValue) {
    const numberElement = document.createElement("span");  // Create a new span element for each character
    numberElement.className = "countdown-number";  // Set the class name for styling purposes
    numberElement.textContent = char;  // Set the text content to the current character
    
    // Add a specific class for the unit indicators (d, h, m, s)
    if (char === 'd' || char === 'h' || char === 'm' || char === 's') {
      numberElement.classList.add("countdown-unit");
    }
    
    countdownElement.appendChild(numberElement);  // Append the character element to the countdown container
  }

  // Stop the countdown when time runs out
  if (timeRemaining < 0) {
    clearInterval(countdownInterval);  // Clear the interval to stop the countdown
    countdownElement.innerHTML = "Time's up!";  // Optionally show a message when countdown finishes
  }
}

// Start the countdown by calling updateCountdown every 1000 milliseconds (1 second)
const countdownInterval = setInterval(updateCountdown, 1000);
