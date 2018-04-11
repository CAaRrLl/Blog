import {
    HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
    HttpSentEvent, HttpUserEvent
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import {Observable} from 'rxjs/Observable';
import { Logger } from './logger.service';
import { code } from '../constant/code';
import { AlertService, AlertType } from '../component/alert/alert.service';
import { LocalStorageService, LKEY } from './localstorage.service';
import { constant } from '../constant/constant';
import { Router } from '@angular/router';
import { route } from '../constant/router';

  @Injectable()
  export class MyInterceptor implements HttpInterceptor{
      constructor(private alert: AlertService, private localStorageService: LocalStorageService, private route: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).map((event)=>{
            if(event instanceof HttpResponse){
                switch(event.status){
                    case 200:
                        let _code = event.body.code;
                        switch (_code) {
                            case code.accountNoExist:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.essayNoExist:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.paramsErr:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.passwordNoMatch:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.sessionNoExist:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.userNoExist:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.userRegistered:
                                this.showErrorAlert(event.body.msg);
                                throw { status: _code, statusText: event.body.msg };
                            case code.sessionExpire:
                                this.showWarnAlert('会话过期，请重新登陆');
                                this.localStorageService.set(LKEY.loginStatus, constant.isVisitor);
                                this.route.navigate([route.sign], {queryParams: {tab: 'in'}});
                                throw { status: _code, statusText: event.body.msg };
                            case code.sessionNoExist:
                                this.showWarnAlert('请先登陆');
                                this.localStorageService.set(LKEY.loginStatus, constant.isVisitor);
                                this.route.navigate([route.sign], {queryParams: {tab: 'in'}});
                                throw { status: _code, statusText: event.body.msg };
                            case code.signForge:
                                this.showErrorAlert(event.body.msg);
                                this.localStorageService.set(LKEY.loginStatus, constant.isVisitor);
                                this.route.navigate([route.sign], {queryParams: {tab: 'in'}});
                                throw { status: _code, statusText: event.body.msg };
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

    showErrorAlert(msg: string) {
        this.alert.show({type: AlertType.Error, msg: msg, time: 2000})
    }
    showWarnAlert(msg: string) {
        this.alert.show({type: AlertType.Warn, msg: msg, time: 2000})
    }
  }