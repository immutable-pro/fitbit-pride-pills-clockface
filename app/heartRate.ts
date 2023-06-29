import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import document from "document";
import { isAnyHearRateComplicationActive } from "./state";

class HeartRateMonitor {
  private _hrm: HeartRateSensor | null;

  constructor(frequency: number) {
    this._hrm =
      HeartRateSensor &&
      appbit.permissions.granted("access_activity") &&
      appbit.permissions.granted("access_heart_rate")
        ? new HeartRateSensor({ frequency })
        : null;
  }

  public start() {
    !this._hrm?.activated && this._hrm?.start();
  }

  public stop() {
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
  const value = `${newValue ?? "--"}`;
  (document.getElementById("heartRate-text") as TextElement).text = value;
  (document.getElementById("heartRate-mini-text") as TextElement).text = value;
};

export const setupHeartRateSensor = () => {
  GlobalHeartRateMonitor.subscribe(() => {
    updateHeartRateText(GlobalHeartRateMonitor.heartRate);
  });

  display.addEventListener("change", (_event) => {
    display.on && isAnyHearRateComplicationActive()
      ? GlobalHeartRateMonitor.start()
      : GlobalHeartRateMonitor.stop();
  });
};
