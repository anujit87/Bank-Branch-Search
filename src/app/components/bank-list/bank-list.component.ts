import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BankService } from '../../bank.service';
import { Bank } from '../../models/bank.model';


@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit, OnChanges {
  bankList:Bank[];
  finalbankList:Bank[];
  isFavourite=false;
  @Input() location;
  itemsPerPage=50;
  isloading=false;
  pageNumber=1;
  totalBanks;
  @Input() searchStr;
  favourites;
  @Input() showFavs;
  constructor(private bankService:BankService) { }

  ngOnInit() {
    //console.log(this.favourites)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.favourites=JSON.parse(localStorage.getItem('favourites'));
    //console.log(changes)
    this.isloading=true;
    //If location or search changes set page number to 1
    if(changes.location || changes.searchStr){
      this.pageNumber=1;
    }
    this.getAllBanks(this.location);
    if(this.searchStr){
      this.filterBankList(this.searchStr);
    }
    if(this.showFavs){
      if(this.favourites){
        this.bankList=this.favourites;
        this.totalBanks=this.favourites.length;
        this.setPaginatedBankList();
      }else{
        this.bankList=[];
        this.totalBanks=0;
      }
    }
  }

  //Get All Bank details for the selected City
  getAllBanks(city){
    this.bankService.getbanks(city).subscribe(
      (banks:Bank[])=>{
        this.bankList=banks;
        this.totalBanks=banks.length;
        this.isloading=false;
        //Update the Favouite Banks 
        if(this.favourites){
          this.bankList=this.bankList.map(
            branch=>{
              if(this.favourites.find(val=>val.ifsc===branch.ifsc)){
                branch.isFavourite=true;
              }
              return branch;
            }
          ); 
        }
        this.setPaginatedBankList();
      }
    )
  }
  
  //Filter the Bank List based on the serach criteria
  filterBankList(searchStr){
    const newList=this.bankList.filter(
      obj=>Object.keys(obj).some(
        key=>obj[key].toString().toLowerCase().includes(searchStr.toLowerCase())
      )
    );
    this.bankList=newList;
    this.totalBanks=newList.length;
    this.setPaginatedBankList();
  }
  
  //Get the page number from the pagination component
  getPageNum(pageNum){
    this.pageNumber=pageNum;
    this.setPaginatedBankList();
  }
  
  //Paginate the Bank list 
  setPaginatedBankList(){
    const newList=[].concat(this.bankList);
    if(this.itemsPerPage)
      this.finalbankList=newList.slice((this.pageNumber-1)*this.itemsPerPage,this.pageNumber*this.itemsPerPage)
    //console.log(this.finalbankList,this.pageNumber,this.itemsPerPage);
  }
  
  //Update the items Per Page value based on the value received from paginate component 
  getPageSize(size){
    //console.log(typeof size)
    this.itemsPerPage=parseInt(size);
    this.setPaginatedBankList()
  }
  
  //Mark / Unmark a Bank as Favourite
  markAsFavourite(bank){
    const favs=JSON.parse(localStorage.getItem('favourites'));
    let newFavs;
    if(favs){
      if(bank.isFavourite){
        newFavs=favs.filter(data=>data.ifsc!==bank.ifsc);
      }else{
        newFavs=[...favs,bank];
      }
      localStorage.setItem('favourites',JSON.stringify(newFavs));
    }else{
      newFavs=[bank];
      localStorage.setItem('favourites',JSON.stringify(newFavs));
    }
    this.bankList=this.bankList.map(
      branch=>{
        if(newFavs.find(val=>val.ifsc===branch.ifsc)){
          branch.isFavourite=true;
        }else{
          branch.isFavourite=false;
        }
        return branch;
      }
    )
  }

}
