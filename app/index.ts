import { fillPillColors } from "./pills";
import { setupHands } from "./hands";
import { setupTouchEvents } from "./events";
import { setupHeartRateSensor } from "./heartRate";

console.log("Initializing app...");

fillPillColors();
setupHands();
setupTouchEvents();
setupHeartRateSensor();

console.log("App initialized!");
