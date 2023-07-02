import document from "document";
import { ComplicationClass } from "./types";
import { Complication, State } from "../state";
import { updateDisplay } from "./display";

const AOD_COMPLICATION_ID: Complication = "time";

export const prepareAodMode = () => {
  (document.getElementById("pills") as ImageElement).href = "pills-outline.png";

  (["main-complication", "mini-complication"] as ComplicationClass[]).forEach(
    (complicationClass) => {
      document
        .getElementsByClassName(complicationClass)
        .forEach((element: GraphicsElement) => {
          if (element.id !== AOD_COMPLICATION_ID) {
            element.style.display = "none";
          } else {
            element.style.display = "inline";
            element.style.opacity = 0.5;
          }
        });
    }
  );
};

export const exitAodMode = (state: State) => {
  (document.getElementById("pills") as ImageElement).href = "pills.png";
  (
    document.getElementById(AOD_COMPLICATION_ID) as GraphicsElement
  ).style.opacity = 1;
  updateDisplay(state);
};
