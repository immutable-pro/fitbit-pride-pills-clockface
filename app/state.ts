export type Complication =
  | "time"
  | "heartRate"
  | "activeMinutes"
  | "calories"
  | "distance"
  | "steps"
  | "floors";

export const Complications: Complication[] = [
  "time",
  "heartRate",
  "steps",
  "distance",
  "floors",
  "calories",
  "activeMinutes",
];

export class State {
  private _activeComplicationIndex: number = 0;
  private _activeMiniComplicationIndex: number = 1;

  public isOnBody: boolean = true;
  public isAodMode: boolean = false;
  public changeComplicationsIndependently: boolean = false;
  public keepTimeMiniComplicationAlwaysVisible: boolean = false;
  public readonly length: number = Complications.length;

  public rotateAllComplications = () => {
    this._activeComplicationIndex =
      (this._activeComplicationIndex + 1) % this.length;
    this._activeMiniComplicationIndex =
      (this._activeComplicationIndex + 1) % this.length;
  };

  public rotateMainComplication = () => {
    this._activeComplicationIndex =
      (this._activeComplicationIndex + 1) % this.length;
  };

  public rotateMiniComplication = () => {
    this._activeMiniComplicationIndex =
      (this._activeMiniComplicationIndex + 1) % this.length;
  };

  public getActiveComplication() {
    return Complications[this._activeComplicationIndex];
  }

  public getActiveMiniComplication() {
    return Complications[this._activeMiniComplicationIndex];
  }
}
