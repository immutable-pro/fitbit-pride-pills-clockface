import { fillPillColors } from "./pills";
import { setupTime } from "./time";
import {
  setupBodySensor,
  setupTouchEvents,
  updateDisplay,
  updateSensors,
} from "./events";
import { setupHeartRateSensor } from "./heartRate";
import { setupStepsSensor } from "./steps";
import { setupActiveMinutesSensor } from "./activeMinutes";

console.log("Initializing app...");

fillPillColors();

setupTime();
setupBodySensor();
setupTouchEvents();
setupHeartRateSensor();
setupActiveMinutesSensor();
setupStepsSensor();

updateSensors();
updateDisplay();

console.log("App initialized!");
