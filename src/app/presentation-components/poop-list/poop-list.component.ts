import { Component, Input, OnInit } from '@angular/core';

import { IPoopItem } from '../../interfaces/poop-item.interface';

@Component({
  selector: 'app-poop-list',
  templateUrl: './poop-list.component.html',
  styleUrls: ['./poop-list.component.scss']
})
export class PoopListComponent implements OnInit {
  @Input()
  poopListPoops: Array<IPoopItem>;

  constructor() {}

  ngOnInit(): void {}
}
