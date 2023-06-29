import clock from "clock";
import document from "document";

let hourHand = document.getElementById("hours") as GroupElement;
let minHand = document.getElementById("mins") as GroupElement;

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
}

export const setupHands = () => {
  // Tick every minute
  clock.granularity = "minutes";
  // Update the clock every tick event
  clock.addEventListener("tick", updateClock);
};
