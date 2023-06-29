import { today } from "user-activity";
import document from "document";

export const getActiveZoneMinutes = () =>
  today.adjusted.activeZoneMinutes.total;

const updateActiveMinutes = () => {
  console.log("updating active minutes");
  const value = `${getActiveZoneMinutes() ?? "--"}`;
  (document.getElementById("activeMinutes-text") as TextElement).text = value;
  (document.getElementById("activeMinutes-mini-text") as TextElement).text =
    value;
};

export const setupActiveZoneMinutes = () => {
  updateActiveMinutes();
  setTimeout(updateActiveMinutes, 60 * 1000);
};
