import document from "document";
import { Complication, Complications, State } from "./state";
import * as messaging from "messaging";
import { updateDisplay } from "./components/display";
import { MonitorsRegistry } from "./monitors/monitors";
import { log } from "./utils";

// Exact copy from companion/index.ts
type KEYS = "independent-complications";
const AREAS = ["leftArea", "rightArea"];

const dependentComplicationsListener = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  if (state.changeComplicationsIndependently) {
    return;
  }

  state.rotateAllComplications();
  monitorsRegistry.update();
  updateDisplay(state);
};

const independentMiniComplicationsListener = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  if (!state.changeComplicationsIndependently) {
    return;
  }

  state.rotateMiniComplication();
  monitorsRegistry.update();
  updateDisplay(state);
};

const independentMainComplicationsListener = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  if (!state.changeComplicationsIndependently) {
    return;
  }

  state.rotateMainComplication();
  monitorsRegistry.update();
  updateDisplay(state);
};

export const setupTouchEvents = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  const onClickDependentComplication = (_e: MouseEvent) => {
    dependentComplicationsListener(state, monitorsRegistry);
  };

  const onClickIndependentMainComplication = (_e: MouseEvent) => {
    independentMainComplicationsListener(state, monitorsRegistry);
  };

  const onClickIndependentMiniComplication = (_e: MouseEvent) => {
    independentMiniComplicationsListener(state, monitorsRegistry);
  };

  AREAS.forEach((elementId) => {
    (document.getElementById(elementId) as GraphicsElement).addEventListener(
      "click",
      onClickDependentComplication
    );
  });

  (document.getElementById(AREAS[0]) as GraphicsElement).addEventListener(
    "click",
    onClickIndependentMiniComplication
  );
  (document.getElementById(AREAS[1]) as GraphicsElement).addEventListener(
    "click",
    onClickIndependentMainComplication
  );
};

export const setupCompanionMessages = <
  T extends string | number,
  C extends Complication
>(
  state: State
) => {
  messaging.peerSocket.addEventListener("message", (event) => {
    if (!event?.data?.key) return;
    log(`Received message: ${JSON.stringify(event.data)}`);

    const key = event.data.key as KEYS;
    const value = event.data.value;

    switch (key) {
      case "independent-complications":
        state.changeComplicationsIndependently = !!value;
        break;
      default:
        throw new Error(`Unknown message key received: ${key}:${value}`);
    }
  });
};
