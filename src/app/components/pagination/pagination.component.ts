import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {

  pages;
  @Input() currentPage;
  pageSize;
  @Output() size=new EventEmitter();
  @Input() itemsPerPage;
  @Input() total;
  @Output() pageNum = new EventEmitter<number>();
  form:FormGroup;
  pageSizeSelector=[10,20,50,100];

  constructor() { }
  ngOnInit() {
    
  }
  ngOnChanges(changes){
    this.updatePages();
    this.size.emit(this.itemsPerPage);
    this.pageNum.emit(this.currentPage);
    //this.pageSize=50;
  }

  setPage(page:number){
    this.currentPage=page
    this.pageNum.emit(this.currentPage);
    this.updatePages()
    
  }
  setNextPage(){
    if(this.currentPage<Math.ceil(this.total/this.pageSize)){
      this.currentPage=this.currentPage+1;
      this.pageNum.emit(this.currentPage);
      this.updatePages();
    }
    
  }
  setPrevPage(){
    if(this.currentPage>1){
      this.currentPage=this.currentPage-1; 
      this.pageNum.emit(this.currentPage);
      this.updatePages();
    }
    
  }
  updatePages(){
    const totalPages=Math.ceil(this.total/this.itemsPerPage);
    let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (this.currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (this.currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = this.currentPage - 5;
                endPage = this.currentPage + 4;
            }
        }

        // create an array of pages to ng-repeat in the pager control
        this.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        //console.log(this.pages)
  }

  setPageSize(event){
      console.log(event.target.value);
      this.pageSize=event.target.value;
      this.size.emit(event.target.value);
      this.updatePages();
  }

}
