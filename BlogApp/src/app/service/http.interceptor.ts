import {
    HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
    HttpSentEvent, HttpUserEvent
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import {Observable} from 'rxjs/Observable';
import { Logger } from './logger.service';
import { code } from '../constant/code';

  @Injectable()
  export class MyInterceptor implements HttpInterceptor{
      constructor(private log:Logger){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).map((event)=>{
            if(event instanceof HttpResponse){
                switch(event.status){
                    case 200:
                        let _code = event.body.code;
                        switch (_code) {
                            case code.accountNoExist:
                                throw { status: _code, statusText: event.body.msg};
                            case code.essayNoExist:
                                throw { status: _code, statusText: event.body.msg};
                            case code.paramsErr:
                                throw { status: _code, statusText: event.body.msg};
                            case code.passwordNoMatch:
                                throw { status: _code, statusText: event.body.msg};
                            case code.sessionNoExist:
                                throw { status: _code, statusText: event.body.msg};
                            case code.userNoExist:
                                throw { status: _code, statusText: event.body.msg};
                            case code.userRegistered:
                                throw { status: _code, statusText: event.body.msg};
                            }
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