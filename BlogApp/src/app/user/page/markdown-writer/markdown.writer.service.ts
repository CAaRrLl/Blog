import {Injectable} from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { Logger } from '../../../service/logger.service';
import { EssayModel } from './markdown.writer';

@Injectable()
export class EssayService {
    constructor(private http: HttpService, private alert: AlertService, private log:Logger) {}

    newTag(tag: string, feedback: Function) {
        this.http.getJson(api.newtag, {'tag': tag}).subscribe(
            res => {
                this.alert.show({type: AlertType.Success, msg: '新建标签成功', time: 2000});
                feedback(null, res['data']['id']);     
            },err => {
                this.log.error('EssayService', 'newTag', err);
                feedback(err, null);
            }
        );
    }

    newEssay(title: string, tagid:string, feedback: Function) {
        this.http.postJson(api.newEssay, {'tagid': tagid, 'title': title}).subscribe(
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

    getEssayTag(tagid:string, feedback: Function) {
        this.http.getJson(api.getEssayTag, {'tagid': tagid, 'attach': 1}).subscribe(
            res => {
                this.log.debug('EssayService', 'getEssayTag', {'获取文章标签及其附带信息成功': res});
                feedback({tag: tagid, data: res['data']}, null);
            },err => {
                this.log.error('EssayService','getEssayTag',err);
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

    modifyTag(tagid:string, tag:string, feedback: Function) {
        this.http.getJson(api.modifyTag, {'tagid': tagid, 'tag': tag}).subscribe(
            res => {
                feedback(null);
            },err => {
                this.log.error('EssayService', 'modifyTag', err);
                feedback(err);
            }
        )
    }

    deleteTag(tagid:string, feedback: Function) {
        this.http.getJson(api.deleteTag, {'tagid': tagid}).subscribe(
            res => {
                feedback(null);
            },err => {
                this.log.error('EssayService', 'deleteTag', err);
                feedback(err);
            }
        )
    }

    deleteEssay(essayid:string, feedback: Function) {
        this.http.getJson(api.deleteEssay, {'essayid': essayid}).subscribe(
            res => {
                feedback(null);
            },err => {
                this.log.error('EssayService', 'deleteEssay', err);
                feedback(err);
            }
        );
    }

    saveEssay(essayModel: any, feedback: Function) {
        this.http.postJson(api.saveEssay, essayModel).subscribe(
            res => {
                feedback(null);
            },err => {
                this.log.error('EssayService', 'saveEssay', err);
                feedback(err);
            }
        );
    }

    publishEssay(essayid: string, feedback: Function) {
        this.http.getJson(api.publish, {id: essayid}).subscribe(
            res => {
                feedback(null);
            },err => {
                this.log.error('EssayService', 'publishEssay', err);
                feedback(err);                
            }
        )
    }

    getEssay(essayid: string, feedback: Function) {
        this.http.getJson(api.getEssay, {id: essayid}).subscribe(
            res => {
                this.log.debug('EssayService', 'getEssay', res)
                feedback(null, res);
            },err => {
                this.log.error('EssayService', 'getEssay', err);
                feedback(err, null);                
            }
        )
    }

    setEssayTag(essayid: string, tagid: string, feedback: Function) {
        this.http.getJson(api.setEssayTag, {id: essayid, tagid: tagid}).subscribe(
            res => {
                this.log.debug('EssayService', 'setEssayTag', res)
                feedback(null);
            },err => {
                this.log.error('EssayService', 'setEssayTag', err);
                feedback(err);                
            }
        )
    }
}