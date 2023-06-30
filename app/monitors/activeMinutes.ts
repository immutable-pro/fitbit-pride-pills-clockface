import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { State } from "../state";
import { Monitor } from "./monitors";

const updateActiveMinutes = (newValue: number | null) => {
  console.log("updating activeMinutes...");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("activeMinutes-text") as TextElement).text = value;
  (document.getElementById("activeMinutes-mini-text") as TextElement).text =
    value;
};

export class ActiveMinutesMonitor extends Monitor<number, "activeMinutes"> {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((activeMinutes: number | null) => void)[] = [];

  constructor(frequencyMs: number, state: State) {
    super(state);
    this._frequencyMs = frequencyMs;
    this.subscribe(updateActiveMinutes);
  }

  public getValue: () => number = () =>
    appbit.permissions.granted("access_activity")
      ? today.local.activeZoneMinutes.total
      : null;

  public getComplicationName: () => "activeMinutes" = () => "activeMinutes";

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

  public subscribe(callback: (activeMinutes: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.getValue());
    });
  }
}
