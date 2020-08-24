import { Injectable } from '@angular/core';
import { IPoopItem } from 'src/app/interfaces/poop-item.interface';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private _poops: Array<IPoopItem>;

  constructor() {
    this._poops = [];
  }

  public addPoop(poop: IPoopItem): void {
    this._poops.unshift(poop);
    localStorage.setItem('poops', JSON.stringify(this._poops));
  }

  public getPoops(): Array<IPoopItem> {
    if (!this._poops.length) {
      this._poops = JSON.parse(localStorage.getItem('poops')) || [];
    }

    return this._poops;
  }
}
