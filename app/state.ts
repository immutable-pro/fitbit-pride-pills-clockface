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
  public isOnBody: boolean = true;
  public activeComplicationIndex: number = 0;
  public readonly length: number = Complications.length;

  public getActiveComplication() {
    return Complications[this.activeComplicationIndex];
  }

  public getNextComplication() {
    return Complications[(this.activeComplicationIndex + 1) % this.length];
  }
}
