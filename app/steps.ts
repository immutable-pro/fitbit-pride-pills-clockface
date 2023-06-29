import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { display } from "display";
import { isAnyStepsComplicationActive } from "./state";

class StepsMonitor {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((steps: number | null) => void)[] = [];

  constructor(frequencyMs: number) {
    this._frequencyMs = frequencyMs;
  }

  public start() {
    console.log("Starting steps monitor...");
    this.notify();
    if (!this._updateInterval) {
      this._updateInterval = setInterval(
        this.notify.bind(this),
        this._frequencyMs
      );
    }
  }

  public stop() {
    console.log("Stopping steps monitor...");
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = null;
    }
  }

  public get steps() {
    return appbit.permissions.granted("access_activity")
      ? today.local.steps
      : null;
  }

  public subscribe(callback: (steps: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.steps);
    });
  }
}

const updateSteps = (newValue: number | null) => {
  console.log("updating steps...");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("steps-text") as TextElement).text = value;
  (document.getElementById("steps-mini-text") as TextElement).text = value;
};

export const GlobalStepsMonitor = new StepsMonitor(1000);

export const setupStepsSensor = () => {
  GlobalStepsMonitor.subscribe(updateSteps);

  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on && isAnyStepsComplicationActive()
      ? GlobalStepsMonitor.start()
      : GlobalStepsMonitor.stop();
  });
};
