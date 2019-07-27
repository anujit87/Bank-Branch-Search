import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  getbanks(location){
    const url=`https://vast-shore-74260.herokuapp.com/banks?city=${location.toUpperCase()}`;
    return this.http.get(url);
  }
}
