import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse} from '@angular/common/http';
import { CacheModel, MAX_CACHE_AGE } from '../models/cache.model';

@Injectable()
export class CacheService {
  
  cacheMap=new Map<string,CacheModel>();
  constructor() { }
  
  //Cache the Data recived from API
  set(req:HttpRequest<any>,res:HttpResponse<any>){
    const entry = {url:req.urlWithParams, response:res,entryTime:Date.now()};
    this.cacheMap.set(req.urlWithParams,entry);
    this.deleteExpiredCache()
  }
  
  //Get data from cache
  get(req:HttpRequest<any>){
    const entry=this.cacheMap.get(req.urlWithParams);
    if(!entry){
      return null;
    }
    const isExpired=(Date.now()-entry.entryTime)>MAX_CACHE_AGE
    return isExpired?null:entry.response;
  }
  
  //Delete cache If it is expired
  deleteExpiredCache(){
    this.cacheMap.forEach(entry=>{
      if((Date.now()-entry.entryTime)> MAX_CACHE_AGE){
        this.cacheMap.delete(entry.url);
      }
    })
  }


}
