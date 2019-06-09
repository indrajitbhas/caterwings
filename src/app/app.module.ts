import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetaurantMenuComponent } from './retaurant-menu/retaurant-menu.component';
import { DisheComponent } from './dishe/dishe.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './main.service';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'dishconfig/:id', component: DisheComponent},
  { path: '', component: RetaurantMenuComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RetaurantMenuComponent,
    DisheComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
