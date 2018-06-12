import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Logger } from '../../service/logger.service';
import { HttpService } from '../../service/http.service';
import { api } from '../../constant/api';
import { SessionStorage, KEY } from '../../service/sessionStorage.service';
import { LocalStorageService, LKEY } from '../../service/localstorage.service';
import { constant } from '../../constant/constant';
import { route } from '../../constant/router';
import { AlertService, AlertType } from '../../component/alert/alert.service';
import { CommentEditorModel } from './essay.comment.editor/essay.comment.editor';
import { util } from '../../tool/utils';

@Component({
    selector: 'app-essay-reader',
    templateUrl: './essay.reader.component.html',
    styleUrls: ['./essay.reader.component.scss']
})

export class EssayReaderComponent implements OnInit{
    essayid: string;
    essayText: string;
    essayTitle: string;

    commentEditorModel: CommentEditorModel = {comment: '', send: {func: null, params: []}};
    //通知评论区更新
    change: boolean = true;

    constructor(private log: Logger, private http: HttpService, private alert: AlertService,
        private storage: SessionStorage) {}

    ngOnInit() {
        this.essayid = this.storage.get(KEY.READER_ESSAYID);
        if(!this.essayid)  {
            history.go(-1);
            return;
        }
        this.http.getJson(api.getEssay, {id: this.essayid}).subscribe(
            res => {
                let data = res['data'];
                this.essayText = data.text;
                this.essayTitle = data.title;
            }, err => {
                this.log.error('EssayReader', 'ngOnInit', err);
            }
        )
        this.initCommentEditorModel();
    }

    initCommentEditorModel() {
        this.commentEditorModel.send.func = this.sendComment;
    }

    sendComment = (afterSend: Function) => {
        this.commentEditorModel.comment = this.commentEditorModel.comment && util.trim(this.commentEditorModel.comment);
        let content = this.commentEditorModel.comment.replace(/\s/g, '');
        if(!content || content.length <=0 ) {
            this.alert.show({type: AlertType.Warn, msg: '留言不能为空', time: 2000});
            return;
        }
        this.http.postJson(api.addComment, {essayid: this.essayid, text: this.commentEditorModel.comment}).subscribe(
            res => {
                this.alert.show({type: AlertType.Success, msg: '留言成功', time: 2000});
                this.change = !this.change;
                if(afterSend) {
                    afterSend();
                }
            }, err => {
                this.log.error('EssayReaderComponent', 'sendComment', err);
                if(afterSend) {
                    afterSend();
                }
            }
        )
    }
}