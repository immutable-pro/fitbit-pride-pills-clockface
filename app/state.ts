export type Complication =
  | "hands"
  | "heartRate"
  | "steps"
  | "activeMinutes"
  | "calories"
  | "distance"
  | "stairs";

export type State = {
  activeComplicationIndex: number;
  readonly length: number;
};

export const Complications: Complication[] = [
  "hands",
  "heartRate",
  "activeMinutes",
  "calories",
  "distance",
  "stairs",
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
