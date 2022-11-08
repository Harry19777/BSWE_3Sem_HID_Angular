import { EventEmitter, Injectable } from '@angular/core';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _sensorenDaten: Sensorendata[] = [];
  public sensoren: Sensor[] = [];

  public dataHasUpdated = new EventEmitter();

  constructor() { }

  public set sensorenDaten(v: Sensorendata[]) {
    this._sensorenDaten = v;
    this.dataHasUpdated.emit();
  }

  public get sensorenDaten(): Sensorendata[] {
    return this._sensorenDaten;
  }
}
