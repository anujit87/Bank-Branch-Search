import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankService } from '../../bank.service';

@Component({
  selector: 'app-bank-search',
  templateUrl: './bank-search.component.html',
  styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

  locations=['Bangalore','Mumbai','Chennai','Hyderabad','Delhi'];
  searchForm:FormGroup;
  selectedCity='Mumbai';
  searchString;
  showFavs=false;

  constructor(private bankService:BankService) { }

  ngOnInit() {
    
    this.searchForm=new FormGroup({
      city:new FormControl('Mumbai'),
      searchText:new FormControl(null)
    });
  }

  changeCity(event){
    console.log(this.searchForm.value);
    this.selectedCity=this.searchForm.value.city;
    
  }

  searchBranch(event){
    //console.log(event.target.value)
    this.searchString=event.target.value;
  }

}
