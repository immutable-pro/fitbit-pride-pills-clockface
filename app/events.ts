import document from "document";
import {
  Complications,
  GlobalState,
  Complication,
  getActiveComplication,
} from "./state";
import { GlobalHeartRateMonitor } from "./heartRate";

const updateDisplay = () => {
  const complication = getActiveComplication();
  toggleVisibility(complication);
};

const updateSensors = () => {
  const complication = getActiveComplication();
  switch (complication) {
    case "heartRate":
      GlobalHeartRateMonitor.start();
      break;
    default:
      GlobalHeartRateMonitor.stop();
      break;
  }
};

const toggleVisibility = (currentComplication: Complication) => {
  document
    .getElementsByClassName("main-complication")
    .forEach((element: GraphicsElement) => {
      element.style.visibility =
        element.id === currentComplication ? "visible" : "hidden";
    });
};

const onClick = (_evt) => {
  const prevState = { ...GlobalState };
  GlobalState.activeComplicationIndex =
    (GlobalState.activeComplicationIndex + 1) % GlobalState.length;
  console.log(
    `${Complications[prevState.activeComplicationIndex]} => ${
      Complications[GlobalState.activeComplicationIndex]
    }`
  );
  updateSensors();
  updateDisplay();
};

export const setupTouchEvents = () => {
  document.getElementById("background").addEventListener("click", onClick);
  document.getElementsByTagName("line").forEach((element) => {
    element.addEventListener("click", onClick);
  });
  document.getElementsByTagName("circle").forEach((element) => {
    element.addEventListener("click", onClick);
  });
  document.getElementsByTagName("text").forEach((element) => {
    element.addEventListener("click", onClick);
  });
  document.getElementsByTagName("image").forEach((element) => {
    element.addEventListener("click", onClick);
  });
};
