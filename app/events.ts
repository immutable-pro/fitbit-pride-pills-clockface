import document from "document";
import { Complication, State } from "./state";
import { updateDisplay } from "./components/display";
import { MonitorsRegistry } from "./monitors/monitors";

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
