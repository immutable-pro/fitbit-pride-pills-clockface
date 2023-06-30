import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { State } from "../state";
import { Monitor } from "./monitors";
import { log } from "../utils";

const updateCalories = (newValue: number | null) => {
  log("Updating calories.");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("calories-text") as TextElement).text = value;
  (document.getElementById("calories-mini-text") as TextElement).text = value;
};
export class CaloriesMonitor extends Monitor<number, "calories"> {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((calories: number | null) => void)[] = [];

  constructor(frequencyMs: number, state: State) {
    super(state);
    this._frequencyMs = frequencyMs;
    this.subscribe(updateCalories);
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
      ? today.adjusted.calories
      : null;
  }

  public getComplicationName: () => "calories" = () => "calories";

  public subscribe(callback: (calories: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.getValue());
    });
  }
}
