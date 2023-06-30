import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { me as appbit } from "appbit";
import { Complication, State } from "../state";
import { MonitorsRegistry } from "./monitors";

export const setupBodySensor = <
  T extends string | number,
  C extends Complication
>(
  state: State,
  monitorsRegistry: MonitorsRegistry<T, C>
) => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();

    body.addEventListener("reading", (_event) => {
      console.log(
        `The device is${body.present ? "" : " not"} on the user's body.`
      );
      state.isOnBody = body.present;
      monitorsRegistry.update();
    });

    display.addEventListener("change", (_event) => {
      if (display.on) {
        body.start();
      } else {
        body.stop();
      }
    });

    body.start();
  }
};
