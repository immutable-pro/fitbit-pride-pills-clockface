import document from "document";
import { Complication, Complications, State } from "./state";
import { updateDisplay } from "./components/display";
import { MonitorsRegistry } from "./monitors/monitors";

const onClick = <T extends string | number, C extends Complication>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  const prevState = { ...state };
  state.activeComplicationIndex =
    (state.activeComplicationIndex + 1) % state.length;
  console.log(
    `${Complications[prevState.activeComplicationIndex]} => ${
      Complications[state.activeComplicationIndex]
    }`
  );
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
  const listener = (_e: MouseEvent) => {
    onClick(state, monitorsRegistry);
  };

  document.getElementById("background").addEventListener("click", (_e) => {});
  document.getElementsByTagName("line").forEach((element) => {
    element.addEventListener("click", listener);
  });
  document.getElementsByTagName("circle").forEach((element) => {
    element.addEventListener("click", listener);
  });
  document.getElementsByTagName("text").forEach((element) => {
    element.addEventListener("click", listener);
  });
  document.getElementsByTagName("image").forEach((element) => {
    element.addEventListener("click", listener);
  });
};
