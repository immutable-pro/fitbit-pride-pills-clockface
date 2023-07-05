/**
 * Although settings are persisted into settingsStorage on the mobile phone, it is the developer's responsibility to persist their settings on the connected device (if they so desire).
 * This is the preferred approach from a useability perspective.
 *
 * From: Although settings are persisted into settingsStorage on the mobile phone, it is the developer's responsibility to persist their settings on the connected device (if they so desire). This is the preferred approach from a useability perspective.
 */
import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";
import { Complication, State } from "./state";
import { log } from "./utils";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// Exact copy from companion/index.ts
type KEYS = "independent-complications";

type Settings = {
  changeComplicationsIndependently: boolean;
};

const loadSettings = (): Settings | null => {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    console.warn("There was an error reading the settings file.");
    return null;
  }
};

// Save settings to the filesystem
function saveSettings({ changeComplicationsIndependently }: State) {
  fs.writeFileSync(
    SETTINGS_FILE,
    {
      changeComplicationsIndependently,
    } as Settings,
    SETTINGS_TYPE
  );
}

export const setupCompanionMessages = <
  T extends string | number,
  C extends Complication
>(
  state: State
) => {
  messaging.peerSocket.addEventListener("message", (event) => {
    if (!event?.data?.key) return;
    log(`Received message: ${JSON.stringify(event.data)}`);

    const key = event.data.key as KEYS;
    const value = event.data.value;

    switch (key) {
      case "independent-complications":
        state.changeComplicationsIndependently = !!value;
        saveSettings(state);
        break;
      default:
        throw new Error(`Unknown message key received: ${key}:${value}`);
    }
  });

  // Register for the unload event
  me.addEventListener("unload", () => {
    saveSettings(state);
  });

  const settings = loadSettings();
  log(`Settings read from FS: ${JSON.stringify(settings)}`);
  state.changeComplicationsIndependently =
    settings?.changeComplicationsIndependently;
};
