export type Complication =
  | "time"
  | "heartRate"
  | "activeMinutes"
  | "calories"
  | "distance"
  | "steps"
  | "floors";

export type State = {
  isOnBody: boolean;
  activeComplicationIndex: number;
  readonly length: number;
};

export const Complications: Complication[] = [
  "time",
  "heartRate",
  "steps",
  // "distance",
  // "floors",
  // "calories",
  "activeMinutes",
];

export const GlobalState: State = {
  isOnBody: true,
  activeComplicationIndex: 0,
  length: Complications.length,
};

export const getActiveComplication = () =>
  Complications[GlobalState.activeComplicationIndex];

export const getNextComplication = () =>
  Complications[(GlobalState.activeComplicationIndex + 1) % GlobalState.length];

export const isAnyHearRateComplicationActive = () =>
  getActiveComplication() === "heartRate" ||
  getNextComplication() === "heartRate";

export const isAnyActiveMinutesComplicationActive = () =>
  getActiveComplication() === "activeMinutes" ||
  getNextComplication() === "activeMinutes";

export const isAnyStepsComplicationActive = () =>
  getActiveComplication() === "steps" || getNextComplication() === "steps";
