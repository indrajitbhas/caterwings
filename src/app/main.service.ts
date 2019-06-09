import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { map, catchError, retry, find, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  menuURL: string = "https://us-central1-extractor-af49a.cloudfunctions.net/getMenu";
  private bsubject = new BehaviorSubject([]);
  private menuList: any = [];
  private _supl: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public  supl: Observable<any> = this._supl.asObservable();

  constructor(private http: HttpClient) {

  }

  getDish(id: string):void{
    if(this.menuList.length){
      let m = this.menuList.find(data => {
        return data.product_id == id
      })
      this._supl.next(m)
    } else {
      this.getMenu().subscribe(m =>{
        this._supl.next(m.find(x => x.product_id == id))
      })
    }
  }

  getMenu(): any{
    return this.http.get(this.menuURL).pipe(
      retry(3),
      map(res => {
        if(!res){
          throw new Error("It was expected some data")
        }
        this.menuList = res;
        return res;
      }),
      catchError(err => of([]))
    )
  }
}
