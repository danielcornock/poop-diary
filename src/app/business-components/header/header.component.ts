import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isNotHome: boolean;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe((data: RouterEvent) => {
      if (data.url) {
        this.isNotHome = data.url !== '/home';
      }
    });
  }
}
