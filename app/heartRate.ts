import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import document from "document";
import { isAnyHearRateComplicationActive } from "./state";

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
    console.log("starting hrm...");
    !this._hrm?.activated && this._hrm?.start();
  }

  public stop() {
    console.log("stopping hrm...");
    this._hrm?.activated && this._hrm?.stop();
  }

  public get heartRate() {
    return this._hrm?.heartRate;
  }

  public subscribe(callback: () => void) {
    this._hrm?.addEventListener("reading", callback);
  }
}

export const GlobalHeartRateMonitor = new HeartRateMonitor(3);

const updateHeartRateText = (newValue: number | null) => {
  console.log("new heart rate");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("heartRate-text") as TextElement).text = value;
  (document.getElementById("heartRate-mini-text") as TextElement).text = value;
};

export const setupHeartRateSensor = () => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();

    GlobalHeartRateMonitor.subscribe(() => {
      updateHeartRateText(GlobalHeartRateMonitor.heartRate);
    });

    body.addEventListener("reading", () => {
      if (body.present && display.on && isAnyHearRateComplicationActive()) {
        GlobalHeartRateMonitor.start();
      } else {
        GlobalHeartRateMonitor.start();
      }
    });

    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      display.on && isAnyHearRateComplicationActive()
        ? GlobalHeartRateMonitor.start()
        : GlobalHeartRateMonitor.stop();
    });

    body.start();
  } else {
    updateHeartRateText(null);
  }
};
