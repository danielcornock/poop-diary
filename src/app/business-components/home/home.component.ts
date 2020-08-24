import { Component, OnInit } from '@angular/core';
import { IPoopItem } from 'src/app/interfaces/poop-item.interface';

import { MockApiService } from '../../services/mock-api-service/mock-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public poops: Array<IPoopItem>;

  constructor(private readonly _mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.poops = this._mockApiService.getPoops();
  }
}
