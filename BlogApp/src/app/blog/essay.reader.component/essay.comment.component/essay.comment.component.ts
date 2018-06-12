import { Component, Input, OnChanges } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { Logger } from '../../../service/logger.service';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { CommentEditorModel, TYPE } from '../essay.comment.editor/essay.comment.editor';
import { util } from '../../../tool/utils';

@Component({
    selector: 'app-essay-comment',
    templateUrl: './essay.comment.component.html',
    styleUrls: ['./essay.comment.component.scss']
})

export class EssayCommentComponent implements OnChanges{
    @Input() essayid: string;
    @Input() change: boolean = false;

    prestatus: boolean = false;
    
    constructor(private http: HttpService, private log: Logger, private alert: AlertService) {}

    replyEditorModel: CommentEditorModel = {comment: '', send: {func: null, params: []}, cancel: null, type: TYPE.REPLY};

    page: number = 1;
    size: number = 5;
    count: number = 0;

    comments: any;

    replyCommentid: number;

    ngOnChanges() {
        if(this.change != this.prestatus) {
            this.updateView();
        }
    }

    bindReplyEditorEvent(commentid: number, recvid: number) {
        this.replyEditorModel.send.func = this.sendReply;
        this.replyEditorModel.send.params = [commentid, recvid];
        this.replyEditorModel.cancel = this.cancelEditor;
    }

    getComments(refresh: Function) {
        this.http.getJson(api.getComments, {id: this.essayid, page: this.page, size: this.size}).subscribe(
            res => {
                refresh((res as any).data);
            }, err => {
                this.log.error('EssayCommentComponent', 'getComments', err);
            }
        )
    }

    updateView() {
        this.getComments(data => {
            this.count = data.count;
            this.comments = data.comments;
            this.prestatus = this.change;
        });
    }

    getTime(timestamp: number) {
        let time = new Date(timestamp);
        return `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()} ${time.getHours()}:${time.getMinutes()}`; 
    }

    getFloor(index: number) {
        return this.count - index;
    }

    getParagraph(text: string) {
        return text.replace(/\n/g, '<br>');
    }

    isReplyEditorShow(commentid: number) {
        return commentid == this.replyCommentid;
    }

    replyEditor(commentid: number, recvid: number, recvname: string) {
        if(this.replyCommentid == commentid) {
            this.cancelEditor();
            return;
        }
        this.replyEditorModel.comment = "@" + recvname + ' ';
        this.replyCommentid = commentid;
        this.bindReplyEditorEvent(commentid, recvid);
    }

    //由CommentEditor组件执行
    sendReply = (afterSend: Function, commentid: number, recvid: number) => {
        this.replyEditorModel.comment = this.replyEditorModel.comment && util.trimleft(this.replyEditorModel.comment);
        let content = this.replyEditorModel.comment.replace(/@[^\s]*\s?/g, '');
        content = util.trim(content);
        if(!content || content.length <= 0) {
            this.alert.show({type: AlertType.Warn, msg: '回复不能为空', time: 2000});
            return;
        }
        this.http.postJson(api.addReply, {commentid: commentid, recvid: recvid, text: this.replyEditorModel.comment})
        .subscribe(
            res => {
                this.updateView();
                if(afterSend) {
                    afterSend();
                }
            }, err => {
                this.log.error('EssayCommentComponent', 'sendReply', err);
                if(afterSend) {
                    afterSend();
                }
            }
        )
    }
    cancelEditor = () => {
        this.replyCommentid = null;
        this.replyEditorModel.comment = "";
    }
}