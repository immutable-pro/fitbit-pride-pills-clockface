import { fillPillColors } from "./pills";
import { setupHands } from "./hands";
import { setupTouchEvents, updateDisplay, updateSensors } from "./events";
import { setupHeartRateSensor } from "./heartRate";
import { setupActiveZoneMinutes } from "./activeMinutes";

console.log("Initializing app...");

fillPillColors();
setupHands();
setupTouchEvents();
setupHeartRateSensor();
setupActiveZoneMinutes();

updateSensors();
updateDisplay();

console.log("App initialized!");
