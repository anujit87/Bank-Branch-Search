import { Component, OnInit } from '@angular/core';
import { BankService } from '../../bank.service';
import { ActivatedRoute } from '@angular/router';
import { filter,map, switchMap } from 'rxjs/operators';
import { Bank } from '../../models/bank.model';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  
  bankDetails:Bank;
  constructor(private bankService:BankService, private route:ActivatedRoute) { }

  ngOnInit() {
    const ifsc=this.route.snapshot.paramMap.get('ifsc');
    const city=this.route.snapshot.queryParamMap.get('city');
    //console.log(ifsc,city)
    this.bankService.getbanks(city).pipe(
      switchMap((data:[{}])=>data),
      filter((res:{ifsc})=>res.ifsc==ifsc)
    ).subscribe(
      (filteredVal:Bank)=>this.bankDetails=filteredVal
    )
  }

  /*formatObj(obj){
    for(let key in obj){
      if(key!=='ifsc')
      obj[key]=obj[key].toString().split(' ').map(word=>word.charAt(0)+word.toLowerCase().slice(1)).join(' ');
    }
    return obj;
  }*/

}
