import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import { CacheService } from './cache/cache.service';

@Injectable()
export class HttpIntercept implements HttpInterceptor{
    constructor(private cacheService:CacheService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse=this.cacheService.get(req);
        if(cachedResponse){
            return of(cachedResponse);
        }

        return next.handle(req).pipe(
            tap(event=>{
                if(event instanceof HttpResponse){
                    this.cacheService.set(req,event);
                }
            })
        )
    }

}