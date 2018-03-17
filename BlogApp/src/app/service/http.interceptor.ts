import {
    HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
    HttpSentEvent, HttpUserEvent
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import {Observable} from 'rxjs/Observable';
import { Logger } from './logger.service';

  @Injectable()
  export class MyInterceptor implements HttpInterceptor{
      constructor(private log:Logger){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).map((event)=>{
            if(event instanceof HttpResponse){
                switch(event.status){
                    case 200:
                        break;
                    case 404:
                        break;
                    default:
                }
            }
            return event;
        });
    }
  }