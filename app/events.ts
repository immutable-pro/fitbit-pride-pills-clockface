import { me as appbit } from "appbit";
import document from "document";
import {
  Complications,
  GlobalState,
  Complication,
  getActiveComplication,
  getNextComplication,
  isAnyHearRateComplicationActive,
  isAnyStepsComplicationActive,
  isAnyActiveMinutesComplicationActive,
} from "./state";
import { GlobalHeartRateMonitor } from "./heartRate";
import { GlobalStepsMonitor } from "./steps";
import { GlobalActiveMinutesMonitor } from "./activeMinutes";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";

export const updateDisplay = () => {
  const complication = getActiveComplication();
  toggleComplicationVisibility(complication);
  const miniComplication = `${getNextComplication()}-mini`;
  toggleMiniComplicationVisibility(miniComplication);
};

export const updateSensors = () => {
  isAnyHearRateComplicationActive()
    ? GlobalHeartRateMonitor.start()
    : GlobalHeartRateMonitor.stop();

  isAnyActiveMinutesComplicationActive()
    ? GlobalActiveMinutesMonitor.start()
    : GlobalActiveMinutesMonitor.stop();

  isAnyStepsComplicationActive()
    ? GlobalStepsMonitor.start()
    : GlobalStepsMonitor.stop();
};

const toggleComplicationVisibility = (currentComplication: Complication) => {
  document
    .getElementsByClassName("main-complication")
    .forEach((element: GraphicsElement) => {
      element.style.display =
        element.id === currentComplication ? "inline" : "none";
    });
};

const toggleMiniComplicationVisibility = (currentMiniComplication: string) => {
  document
    .getElementsByClassName("mini-complication")
    .forEach((element: GraphicsElement) => {
      element.style.display =
        element.id === currentMiniComplication ? "inline" : "none";
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

export const setupBodySensor = () => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();
    body.start();

    display.addEventListener("change", (_event) => {
      if (display.on) {
        body.start();
      } else {
        body.stop();
      }
    });
  }
};
