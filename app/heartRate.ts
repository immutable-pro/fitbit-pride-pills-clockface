import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import document from "document";
import { getActiveComplication } from "./state";

class HeartRateMonitor {
  private _hrm: HeartRateSensor | null;

  constructor(frequency: number) {
    this._hrm =
      BodyPresenceSensor &&
      HeartRateSensor &&
      appbit.permissions.granted("access_activity") &&
      appbit.permissions.granted("access_heart_rate")
        ? new HeartRateSensor({ frequency })
        : null;
  }

  public start() {
    console.log("HeartRateMonitor::start()");
    this._hrm?.start();
  }

  public stop() {
    console.log("HeartRateMonitor::stop()");
    this._hrm?.stop();
  }

  public get hrm() {
    return this._hrm;
  }

  public get heartRate() {
    return this._hrm?.heartRate;
  }
}

export const GlobalHeartRateMonitor = new HeartRateMonitor(1);

const updateHeartRateText = (newValue: number | null) => {
  (document.getElementById("heartRate-text") as TextElement).text = `${
    newValue ?? "--"
  }`;
};

export const setupHeartRateSensor = () => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();

    GlobalHeartRateMonitor.hrm.addEventListener("reading", () => {
      updateHeartRateText(GlobalHeartRateMonitor.heartRate);
    });

    body.addEventListener("reading", () => {
      if (
        !body.present ||
        !display.on ||
        getActiveComplication() !== "heartRate"
      ) {
        GlobalHeartRateMonitor.stop();
      } else {
        GlobalHeartRateMonitor.start();
      }
    });

    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      display.on && getActiveComplication() === "heartRate"
        ? GlobalHeartRateMonitor.start()
        : GlobalHeartRateMonitor.stop();
    });

    body.start();
  } else {
    updateHeartRateText(null);
  }
};
