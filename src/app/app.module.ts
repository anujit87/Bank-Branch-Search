import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BankSearchComponent } from './components/bank-search/bank-search.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { CacheService } from './cache/cache.service';
import { HttpIntercept } from './http-intercept';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BankSearchComponent,
    PaginationComponent,
    BankListComponent,
    BankDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'', component:BankSearchComponent},
      { path:'banks/:ifsc', component:BankDetailsComponent},
      
    ])
  ],
  providers: [
    CacheService,
    {provide:Cache,useClass:CacheService},
    {provide:HTTP_INTERCEPTORS,useClass:HttpIntercept,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
