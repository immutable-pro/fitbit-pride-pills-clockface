import { settingsStorage } from "settings";
import { me as companion } from "companion";
import * as messaging from "messaging";

type KEYS = "independent-complications";

const sendValue = (key: KEYS, val: string) => {
  sendSettingData({
    key: key,
    value: JSON.parse(val),
  });
};

const sendSettingData = (data) => {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
};

// Event fires when a setting is changed
settingsStorage.addEventListener("change", ({ key, oldValue, newValue }) => {
  console.log(`key: ${key}: ${oldValue} => ${newValue}`);
  sendValue(key as KEYS, newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(
    "independent-complications",
    settingsStorage.getItem("independent-complications")
  );
}
