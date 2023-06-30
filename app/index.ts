import { fillPillColors } from "./components/pills";
import { setupTime } from "./time";
import { setupTouchEvents } from "./events";
import { updateDisplay } from "./components/display";
import { MonitorsRegistry } from "./monitors/monitors";
import { HeartRateMonitor } from "./monitors/heartRate";
import { StepsMonitor } from "./monitors/steps";
import { ActiveMinutesMonitor } from "./monitors/activeMinutes";
import { State } from "./state";
import { setupBodySensor } from "./monitors/bodySensor";

console.log("Initializing app...");

fillPillColors();

setupTime();

const state = new State();
const monitorsRegistry = new MonitorsRegistry(state);

const hearRateMonitor = new HeartRateMonitor(3, state);
monitorsRegistry.register(hearRateMonitor);

const stepsMonitor = new StepsMonitor(1000, state);
monitorsRegistry.register(stepsMonitor);

const activeMinutesMonitor = new ActiveMinutesMonitor(60 * 1000, state);
monitorsRegistry.register(activeMinutesMonitor);

setupBodySensor(state, monitorsRegistry);
setupTouchEvents(state, monitorsRegistry);

monitorsRegistry.update();
updateDisplay(state);

console.log("App initialized!");
