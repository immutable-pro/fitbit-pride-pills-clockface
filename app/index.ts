import { fillPillColors } from "./pills";
import { setupHands } from "./hands";
import { setupTouchEvents, updateDisplay, updateSensors } from "./events";
import { setupHeartRateSensor } from "./heartRate";
import { setupStepsSensor } from "./steps";
import { setupActiveMinutesSensor } from "./activeMinutes";

console.log("Initializing app...");

fillPillColors();
setupHands();
setupTouchEvents();
setupHeartRateSensor();
setupActiveMinutesSensor();
setupStepsSensor();

updateSensors();
updateDisplay();

console.log("App initialized!");
