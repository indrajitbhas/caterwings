import { Component, OnInit } from '@angular/core';
import { of, Subject, from } from 'rxjs';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retaurant-menu',
  templateUrl: './retaurant-menu.component.html',
  styleUrls: ['./retaurant-menu.component.css']
})
export class RetaurantMenuComponent implements OnInit {
  menu: Array<any>;
  locale;

  constructor(private services: MainService, private router: Router) {
    this.menu = [{}];
    this.locale = "GBP";
  }

  ngOnInit() {
    this.showMenu();
  }

  showMenu():void{
    this.services.getMenu().subscribe((data) => {
      this.menu = data;
      //console.log(this.menu)
    })
  }
}
