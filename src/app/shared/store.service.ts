import { EventEmitter, Injectable } from '@angular/core';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public sensoren_Daten: Sensorendata[] = [];
  public sensoren: Sensor[] = [];

  public dataHasUpdated = new EventEmitter();

  constructor() { }

  public set sensorenDaten(v: Sensorendata[]) {
    this.sensoren_Daten = v;
    this.dataHasUpdated.emit();
  }

  public get sensorenDaten(): Sensorendata[] {
    return this.sensoren_Daten;
  }
}
