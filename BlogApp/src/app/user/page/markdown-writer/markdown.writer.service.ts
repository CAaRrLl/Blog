import {Injectable} from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { Logger } from '../../../service/logger.service';

@Injectable()
export class EssayService {
    constructor(private http: HttpService, private alert: AlertService, private log:Logger) {}

    newTag(tag: string, feedback: Function) {
        this.http.getJson(api.newtag, {'tag': tag}).subscribe(
            res => {
                this.alert.show({type: AlertType.Success, msg: '新建标签成功', time: 2000});
                feedback(null);     
            },err => {
                this.log.error('EssayService', 'newTag', err);
                feedback(err);
            }
        );
    }

    newEssay(title: string, tag:string, feedback: Function) {
        this.http.postJson(api.newEssay, {'tag': tag, 'title': title}).subscribe(
            res=>{
                this.alert.show({type: AlertType.Success, msg: '新建文章成功', time: 2000});
                feedback(res['data']['id'], null);
            },err=>{
                this.log.error('EssayService', 'newEssay', err);
                feedback(null, err);
            }
        );
    }

    getTag(feedback: Function) {
        this.http.getJson(api.getTag).subscribe(
            res=>{
                this.log.debug('EssayService', 'getTag', {'获取标签成功': res});
                feedback(res['data']['taglist'], null);
            },err=>{
                this.log.error('EssayService', 'getTag', err);
                feedback(null, err);
            }
        );
    }

    getEssay(tag:string, feedback: Function) {
        this.http.getJson(api.getEssayTag, {'tag': tag, 'attach': 1}).subscribe(
            res => {
                this.log.debug('EssayService', 'getEssay', {'获取文章标签及其附带信息成功': res});
                feedback(res['data'], null);
            },err => {
                this.log.error('EssayService','getEssay',err);
                feedback(null, err);
            }
        )
    }

    initWriter(feedback: Function) {
        this.http.getJson(api.getTag, {attach: 1}).subscribe(
            res => {
                this.log.debug('EssayService', 'initWriter', {'获取编辑器初始数据':res});
                feedback(res['data'], null);
            },err => {
                this.log.error('EssayService', 'initWriter', err);
                feedback(null, err);
            }
        );
    }
}