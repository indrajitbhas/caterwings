import { Component, OnInit, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';
import { switchMap, map, last } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MainService } from '../main.service';
declare var $: any;

@Component({
  selector: 'app-dishe',
  templateUrl: './dishe.component.html',
  styleUrls: ['./dishe.component.css']
})
export class DisheComponent implements OnInit{
  currentDish: any;
  totalPrice: number;
  currentHeadN: number = 1;
  numbHeads = 1;
  subtotal = 0;
  totalPerHead = 0;
  locale;

  constructor(
              private mainservice: MainService,
              private router: Router,
              private route: ActivatedRoute,
              protected elementRef: ElementRef
             ) {
               this.locale = "GBP"
             }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.mainservice.getDish(id);
    this.mainservice.supl.subscribe( x => {
      this.currentDish = x;
      this.subtotal = x.price_net;
      this.totalPrice = x.price_net;
      this.totalPerHead = x.price_net/ x.person_number;
      console.log(x)
    })
  }

  numberOfHeadsChanged(e){
    console.log(e);
    let n = e.currentTarget;
    if(n.value <= 0){
      n.value = 1;
    }
    this.numbHeads = n.value;
    this.totalPrice = this.subtotal * this.numbHeads;
    this.totalPerH()
  }

  checkNumberOfCheckedInputs(e, n, p){
    let domElem = e.currentTarget.closest(".card").querySelectorAll("input.form-check-input");
    console.log(domElem)
    let checked = [...domElem].filter(x => x.checked);
    if(checked.length > n){
      e.currentTarget.checked = false;
      return
    }
    this.addAmount(e, p)
  }

  totalPerH(){
    this.totalPerHead = parseFloat((this.totalPrice / this.currentDish.person_number).toFixed(1));
  }

  addAmount(e, p){
    this.subtotal = this.subtotal + ((e.currentTarget.checked) ? parseFloat(p) : - parseFloat(p))
    this.totalPrice = this.subtotal * this.numbHeads;
    this.totalPerH()
  }
}
