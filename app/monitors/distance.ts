import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { State } from "../state";
import { Monitor } from "./monitors";
import { log } from "../utils";

const updateDistance = (newValue: number | null) => {
  log("Updating distance.");
  // Distance comes in meters
  let value = "--";
  if (newValue) {
    value = `${(newValue / 1000).toFixed(1)}`;
  }
  (document.getElementById("distance-text") as TextElement).text = value;
  (document.getElementById("distance-mini-text") as TextElement).text = value;
};
export class DistanceMonitor extends Monitor<number, "distance"> {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((distance: number | null) => void)[] = [];

  constructor(frequencyMs: number, state: State) {
    super(state);
    this._frequencyMs = frequencyMs;
    this.subscribe(updateDistance);
  }

  public start() {
    super.start();
    this.notify();
    if (!this._updateInterval) {
      this._updateInterval = setInterval(
        this.notify.bind(this),
        this._frequencyMs
      );
    }
  }

  public stop() {
    super.stop();
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = null;
    }
  }

  public getValue(): number {
    return appbit.permissions.granted("access_activity")
      ? today.adjusted.distance
      : null;
  }

  public getComplicationName: () => "distance" = () => "distance";

  public subscribe(callback: (distance: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.getValue());
    });
  }
}
