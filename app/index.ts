import { fillPillColors } from "./pills";
import { setupHands } from "./hands";
import { setupTouchEvents } from "./events";

console.log("Initializing app...");

fillPillColors();
setupHands();
setupTouchEvents();

console.log("App initialized!");
