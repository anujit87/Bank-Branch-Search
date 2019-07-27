import { HttpResponse } from '@angular/common/http';

export interface CacheModel{
    url:string,
    response:HttpResponse<any>,
    entryTime:number
}

//Cache expires in 600 Milisecond
export const MAX_CACHE_AGE=600000;