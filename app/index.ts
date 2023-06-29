import { fillPillColors } from "./pills";
import { setupHands } from "./hands";
import { setupTouchEvents, updateSensors } from "./events";
import { setupHeartRateSensor } from "./heartRate";

console.log("Initializing app...");

fillPillColors();
setupHands();
setupTouchEvents();
setupHeartRateSensor();

updateSensors();

console.log("App initialized!");
