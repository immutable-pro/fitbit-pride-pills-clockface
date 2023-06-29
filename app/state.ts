export type Complication =
  | "hands"
  | "heartRate"
  | "activeMinutes"
  | "calories"
  | "distance"
  | "steps"
  | "floors";

export type State = {
  activeComplicationIndex: number;
  readonly length: number;
};

export const Complications: Complication[] = [
  "hands",
  "heartRate",
  "steps",
  "distance",
  "floors",
  "calories",
  "activeMinutes",
];

export const GlobalState: State = {
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
