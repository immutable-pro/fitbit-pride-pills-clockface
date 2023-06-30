import document from "document";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { State } from "../state";
import { Monitor } from "./monitors";

const updateHeartRateText = (newValue: number | null) => {
  const value = `${newValue ?? "--"}`;
  (document.getElementById("heartRate-text") as TextElement).text = value;
  (document.getElementById("heartRate-mini-text") as TextElement).text = value;
};

export class HeartRateMonitor extends Monitor<number, "heartRate"> {
  private _hrm: HeartRateSensor | null;

  constructor(frequency: number, state: State) {
    super(state);
    this._hrm =
      HeartRateSensor &&
      appbit.permissions.granted("access_activity") &&
      appbit.permissions.granted("access_heart_rate")
        ? new HeartRateSensor({ frequency })
        : null;

    this.subscribe(() => {
      updateHeartRateText(this.getValue());
    });
  }

  public getComplicationName: () => "heartRate" = () => "heartRate";

  public start() {
    super.start();
    !this._hrm?.activated && this._hrm?.start();
  }

  public stop() {
    super.stop();
    this._hrm?.activated && this._hrm?.stop();
  }

  public getValue() {
    return this._hrm.heartRate;
  }

  public subscribe(callback: () => void) {
    this._hrm?.addEventListener("reading", callback);
  }
}
