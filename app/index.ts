import { setupTime } from "./components/time";
import { setupCompanionMessages, setupTouchEvents } from "./events";
import { updateDisplay } from "./components/display";
import { MonitorsRegistry } from "./monitors/monitors";
import { HeartRateMonitor } from "./monitors/heartRate";
import { StepsMonitor } from "./monitors/steps";
import { ActiveMinutesMonitor } from "./monitors/activeMinutes";
import { State } from "./state";
import { setupBodySensor } from "./monitors/bodySensor";
import { log } from "./utils";
import { DistanceMonitor } from "./monitors/distance";
import { FloorsMonitor } from "./monitors/floors";
import { CaloriesMonitor } from "./monitors/calories";

log("Initializing app...");

setupTime();

const state = new State();
const monitorsRegistry = new MonitorsRegistry(state);

const hearRateMonitor = new HeartRateMonitor(3, state);
monitorsRegistry.register(hearRateMonitor);

const stepsMonitor = new StepsMonitor(1000, state);
monitorsRegistry.register(stepsMonitor);

const activeMinutesMonitor = new ActiveMinutesMonitor(60 * 1000, state);
monitorsRegistry.register(activeMinutesMonitor);

const distanceMonitor = new DistanceMonitor(60 * 1000, state);
monitorsRegistry.register(distanceMonitor);

const floorsMonitor = new FloorsMonitor(10 * 1000, state);
monitorsRegistry.register(floorsMonitor);

const caloriesMonitor = new CaloriesMonitor(30 * 1000, state);
monitorsRegistry.register(caloriesMonitor);

setupBodySensor(state, monitorsRegistry);

setupTouchEvents(state, monitorsRegistry);

setupCompanionMessages(state);

monitorsRegistry.update();
updateDisplay(state);

log("App initialized!");
