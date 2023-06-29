import clock, { TickEvent } from "clock";
import document from "document";
import { Days, Months, MonthsShort } from "./locales/en";
import { zeroPad } from "./utils";

const hourHand = document.getElementById("hours") as GroupElement;
const minHand = document.getElementById("mins") as GroupElement;
const dateText = document.getElementById("date-mini-text") as TextElement;
const timeText = document.getElementById("time-mini-text") as TextElement;

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  const hourAngle = (360 / 12) * hours;
  const minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Rotate the hands every tick
function updateClock(event: TickEvent) {
  const today = event.date;
  const dayName = Days[today.getDay()];
  const dayNumberText = zeroPad(today.getDate());
  const hours = today.getHours();
  const mins = today.getMinutes();
  const hoursText = zeroPad(hours);
  const minsText = zeroPad(mins);

  timeText.text = `${hoursText}:${minsText}`;
  dateText.text = `${dayName} ${dayNumberText}`;

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours % 12, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
}

export const setupTime = () => {
  // Tick every minute
  clock.granularity = "minutes";
  // Update the clock every tick event
  clock.addEventListener("tick", updateClock);
};
