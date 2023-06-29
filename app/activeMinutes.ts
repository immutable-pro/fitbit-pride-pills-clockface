import { me as appbit } from "appbit";
import { today } from "user-activity";
import document from "document";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { isAnyActiveMinutesComplicationActive } from "./state";

class ActiveMinutesMonitor {
  private _frequencyMs: number;
  private _updateInterval: number | null = null;
  private _callbacks: ((activeMinutes: number | null) => void)[] = [];

  constructor(frequencyMs: number) {
    this._frequencyMs = frequencyMs;
  }

  public start() {
    console.log("Starting activeMinutes monitor...");
    this.notify();
    if (!this._updateInterval) {
      this._updateInterval = setInterval(
        this.notify.bind(this),
        this._frequencyMs
      );
    }
  }

  public stop() {
    console.log("Stopping activeMinutes monitor...");
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = null;
    }
  }

  public get activeMinutes() {
    return appbit.permissions.granted("access_activity")
      ? today.adjusted.activeZoneMinutes.total
      : null;
  }

  public subscribe(callback: (activeMinutes: number | null) => void) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => {
      cb(this.activeMinutes);
    });
  }
}

const updateActiveMinutes = (newValue: number | null) => {
  console.log("updating activeMinutes...");
  const value = `${newValue ?? "--"}`;
  (document.getElementById("activeMinutes-text") as TextElement).text = value;
  (document.getElementById("activeMinutes-mini-text") as TextElement).text =
    value;
};

export const GlobalActiveMinutesMonitor = new ActiveMinutesMonitor(60 * 1000);

export const setupActiveMinutesSensor = () => {
  if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
    const body = new BodyPresenceSensor();

    GlobalActiveMinutesMonitor.subscribe(updateActiveMinutes);

    body.addEventListener("reading", () => {
      if (
        body.present &&
        display.on &&
        isAnyActiveMinutesComplicationActive()
      ) {
        GlobalActiveMinutesMonitor.start();
      } else {
        GlobalActiveMinutesMonitor.stop();
      }
    });

    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      display.on && isAnyActiveMinutesComplicationActive()
        ? GlobalActiveMinutesMonitor.start()
        : GlobalActiveMinutesMonitor.stop();
    });

    body.start();
  } else {
    updateActiveMinutes(null);
  }
};