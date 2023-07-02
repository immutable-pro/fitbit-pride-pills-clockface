import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { me as appbit } from "appbit";
import { Complication, State } from "../state";
import { MonitorsRegistry } from "./monitors";
import { log } from "../utils";
import { exitAodMode, prepareAodMode } from "../components/aod";

export const setupBodySensor = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();
    display.aodAllowed = display.aodAvailable;

    body.addEventListener("reading", (_event) => {
      log(`The device is${body.present ? "" : " not"} on the user's body.`);
      state.isOnBody = body.present;
      monitorsRegistry.update();
    });

    display.addEventListener("change", (_event) => {
      const previousIsAodMode = state.isAodMode;
      state.isAodMode = display.aodEnabled && display.aodActive;

      if (display.on && !state.isAodMode) {
        body.start();
      } else {
        body.stop();
      }

      if (previousIsAodMode !== state.isAodMode) {
        if (state.isAodMode) {
          log("Entering AOD mode.");
          prepareAodMode();
        } else {
          log("Exiting AOD mode.");
          exitAodMode(state);
        }
        monitorsRegistry.update();
      }
    });

    body.start();
  }
};
