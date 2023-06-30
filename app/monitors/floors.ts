import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { State } from "../state";
import { Monitor } from "./monitors";
import { log } from "../utils";

const updateFloors = (newValue: number | null) => {
  log("Updating floors.");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("floors-text") as TextElement).text = value;
  (document.getElementById("floors-mini-text") as TextElement).text = value;
};
export class FloorsMonitor extends Monitor<number, "floors"> {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((floors: number | null) => void)[] = [];

  constructor(frequencyMs: number, state: State) {
    super(state);
    this._frequencyMs = frequencyMs;
    this.subscribe(updateFloors);
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
      ? today.adjusted.elevationGain
      : null;
  }

  public getComplicationName: () => "floors" = () => "floors";

  public subscribe(callback: (floors: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.getValue());
    });
  }
}
