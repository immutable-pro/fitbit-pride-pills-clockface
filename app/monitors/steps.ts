import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { State } from "../state";
import { Monitor } from "./monitors";

const updateSteps = (newValue: number | null) => {
  console.log("updating steps...");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("steps-text") as TextElement).text = value;
  (document.getElementById("steps-mini-text") as TextElement).text = value;
};
export class StepsMonitor extends Monitor<number, "steps"> {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((steps: number | null) => void)[] = [];

  constructor(frequencyMs: number, state: State) {
    super(state);
    this._frequencyMs = frequencyMs;
    this.subscribe(updateSteps);
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
      ? today.local.steps
      : null;
  }

  public getComplicationName: () => "steps" = () => "steps";

  public subscribe(callback: (steps: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.getValue());
    });
  }
}
