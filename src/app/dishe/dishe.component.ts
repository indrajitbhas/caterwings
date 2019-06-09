import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-dishe',
  templateUrl: './dishe.component.html',
  styleUrls: ['./dishe.component.css']
})
export class DisheComponent implements OnInit, OnDestroy{
  currentDish: any;
  totalPrice: number;
  currentHeadN: number = 1;
  numbHeads = 1;
  subtotal = 0;
  totalPerHead = 0;
  inputElems = [];
  savedUserSelections = {};
  locale: string;
  wdom: any;

  constructor(
              private mainservice: MainService,
              private route: ActivatedRoute,
              protected elementRef: ElementRef
             ) {
               this.locale = "GBP"
             }

  ngOnInit() {
    this.wdom = this.elementRef.nativeElement;
    let that = this;
    let id = this.route.snapshot.paramMap.get('id');
    this.savedUserSelections = JSON.parse(localStorage.getItem("savedUserSelections"));
    setTimeout(function(){that.getSetOfInputs()},0)
    this.mainservice.getDish(id);
    this.mainservice.supl.subscribe( x => {
      this.currentDish = x;
      this.getTotalPrice();
      this.wdom.querySelector("#numberOfHeads").value = this.currentDish.person_number;
    })
  }

  getSetOfInputs(){
      this.inputElems = this.wdom.querySelectorAll("input.form-check-input");
      if(!this.inputElems.length) return;
      let ids = [...this.inputElems].map(x => x.id.slice(2));
      if(this.savedUserSelections && Object.keys(this.savedUserSelections).includes(this.currentDish.product_id.toString())){
        ids.forEach(x => {
            if(this.savedUserSelections[this.currentDish.product_id].options.includes(x)){
              this.elementRef.nativeElement.querySelector("#cw"+x).checked = true
            }
        })
        this.elementRef.nativeElement.querySelector("#numberOfHeads").value = this.savedUserSelections[this.currentDish.product_id].numberOfH;
      }
  }

  ngOnDestroy(){
    this.beforeUnloadHander();
  }

  beforeUnloadHander(){
    let that = this;
    if(localStorage.getItem("savedUserSelections")){
      this.savedUserSelections = JSON.parse(localStorage.getItem("savedUserSelections"));
    } else {
      this.savedUserSelections = Object.create(null);
    }

    this.savedUserSelections[this.currentDish.product_id] = {
      options: (that.inputElems.length > 0) ? [...that.inputElems].filter(x => x.checked).map(x => x.id.slice(2)):[],
      numberOfH: that.elementRef.nativeElement.querySelector("#numberOfHeads").value
    }

    localStorage.setItem("savedUserSelections", JSON.stringify(this.savedUserSelections))
  }

  numberOfHeadsChanged(){
    let n = this.elementRef.nativeElement.querySelector("#numberOfHeads");
    if(n.value <= this.currentDish.person_number){
      n.value = this.currentDish.person_number
    }
  }

  checkNumberOfCheckedInputs(e: any, n: any){
    let domElem = e.currentTarget.closest(".card").querySelectorAll("input.form-check-input");
    let checked = [...domElem].filter(x => x.checked);
    if(checked.length > n){
      e.currentTarget.checked = false;
      return
    }
  }


  getTotalPrice(){
    this.numberOfHeadsChanged()
    this.inputElems = this.wdom.querySelectorAll("input.form-check-input");
    let tp = [...this.inputElems].filter(x => x['value'] > 0 && x['checked']).reduce((a, s) => a + parseFloat(s.value), 0);
    //tp *= this.wdom.querySelector("#numberOfHeads").value;
    this.totalPrice = (tp + this.currentDish.price_net ) * this.wdom.querySelector("#numberOfHeads").value;
    this.totalPerHead = parseFloat((this.totalPrice / this.currentDish.person_number).toFixed(1));
  }
}

// Joke time:
// Q. How does a computer get drunk?
// A. It takes screenshots.
