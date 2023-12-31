import { display } from "display";
import { Complication, State } from "../state";
import { log } from "../utils";

export abstract class Monitor<T, C extends Complication> {
  protected readonly _state: State;

  constructor(state: State) {
    this._state = state;

    display.addEventListener("change", (_event) => {
      this.canMonitorBeActive() ? this.start() : this.stop();
    });
  }

  public start() {
    log(`Starting ${this.getComplicationName()} monitor.`);
  }

  public stop() {
    log(`Stopping ${this.getComplicationName()} monitor.`);
  }

  public abstract subscribe(callback: (value?: T, event?: Event) => void): void;
  public abstract getValue(): T;
  public abstract getComplicationName: () => C;

  public isAnyComplicationActive(): boolean {
    return (
      this._state.getActiveComplication() === this.getComplicationName() ||
      this._state.getActiveMiniComplication() === this.getComplicationName()
    );
  }

  public canMonitorBeActive() {
    return (
      display.on &&
      !this._state.isAodMode &&
      this._state.isOnBody &&
      this.isAnyComplicationActive()
    );
  }
}

export class MonitorsRegistry<
  T extends string | number,
  C extends Complication
> {
  private readonly _registry: Monitor<T, C>[] = [];
  private readonly _state: State;

  constructor(state: State) {
    this._state = state;
  }

  public register(monitor: Monitor<T, C>) {
    this._registry.push(monitor);
  }

  public startAll() {
    this._registry.forEach((monitor) => {
      monitor.start();
    });
  }

  public stopAll() {
    this._registry.forEach((monitor) => {
      monitor.stop();
    });
  }

  public update() {
    this._registry.forEach((monitor) => {
      monitor.canMonitorBeActive() ? monitor.start() : monitor.stop();
    });
  }
}
