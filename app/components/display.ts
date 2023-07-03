import document from "document";
import { ComplicationClass } from "./types";
import { State } from "../state";

const toggleVisibility = (
  complicationClass: ComplicationClass,
  current: string
) => {
  document
    .getElementsByClassName(complicationClass)
    .forEach((element: GraphicsElement) => {
      element.style.display = element.id === current ? "inline" : "none";
    });
};

export const updateDisplay = (state: State) => {
  toggleVisibility("main-complication", state.getActiveComplication());
  toggleVisibility(
    "mini-complication",
    `${state.getActiveMiniComplication()}-mini`
  );
};
