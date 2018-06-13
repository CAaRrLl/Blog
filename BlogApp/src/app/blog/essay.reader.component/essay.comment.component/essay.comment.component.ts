import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { Logger } from '../../../service/logger.service';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { CommentEditorModel, TYPE } from '../essay.comment.editor/essay.comment.editor';
import { util } from '../../../tool/utils';
import { SessionStorage, KEY } from '../../../service/sessionStorage.service';
import { EIO } from 'constants';
import { DialogService } from '../../../component/dialog/dialog.service';
import { PaginationModel } from '../../../component/pagination.component/pagination.component';
import { LocalStorageService, LKEY } from '../../../service/localstorage.service';
import { constant } from '../../../constant/constant';

@Component({
    selector: 'app-essay-comment',
    templateUrl: './essay.comment.component.html',
    styleUrls: ['./essay.comment.component.scss']
})

export class EssayCommentComponent implements OnChanges, OnInit{
    @Input() essayid: string;
    @Input() change: boolean = false;

    prestatus: boolean = false;
    
    constructor(private http: HttpService, private log: Logger, private alert: AlertService, 
        private storage: SessionStorage, private dialog: DialogService, private lstorage: LocalStorageService) {}

    replyEditorModel: CommentEditorModel = {comment: '', send: {func: null, params: []}, cancel: null, type: TYPE.REPLY};

    count: number = 0;

    comments: any = [];

    replyCommentid: number;

    //用于判断是否有删除评论的权限
    userID: number; 
    isUser: boolean = false;

    loading: boolean = false;

    //分页数据模型
    paginationModel: PaginationModel;

    ngOnInit() {
        let info = this.storage.get(KEY.MYHOMECP_USERINFO);
        this.userID = info && info.id;
        this.isUser = this.lstorage.get(LKEY.loginStatus) == constant.isUser? true : false;
    }

    ngOnChanges() {
        if(this.change != this.prestatus) {
            this.getComments(this.updateView);
        }
    }

    bindReplyEditorEvent(commentid: number, recvid: number) {
        this.replyEditorModel.send.func = this.sendReply;
        this.replyEditorModel.send.params = [commentid, recvid];
        this.replyEditorModel.cancel = this.cancelEditor;
    }

    getComments(refresh: Function) {
        this.loading = true;
        this.http.getJson(api.getComments, {id: this.essayid, page: 1, size: 5}).subscribe(
            res => {
                refresh((res as any).data);
                this.paginationModel = {count: res['data'].count || 0, curPage: 1, size: 5, request: this.nextComments};
                this.loading = false;
            }, err => {
                this.log.error('EssayCommentComponent', 'getComments', err);
                this.loading = false;
            }
        )
    }

    nextComments = () => {
        this.loading = true;
        this.http.getJson(api.getComments, {id: this.essayid, page: this.paginationModel.curPage, size: this.paginationModel.size})
        .subscribe(
            res => {
                let data = res['data'];
                this.count = data.count || 0;
                this.comments = data.comments || [];
                this.prestatus = this.change;
                this.paginationModel.count = this.count;
                this.loading = false;
            }, err => {
                this.log.error('EssayCommetComponent', 'nextComments', err);
                this.loading = false;
            }
        )
    }

    updateView = (data) => {
        this.count = data.count || 0;
        this.comments = data.comments || [];
        this.prestatus = this.change;
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
        location.hash = '#' + commentid;
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
                this.getComments(this.updateView);  
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

    showDel(event) {
        let container = event.target;
        let delEl = container.querySelector('a.del');
        if(!delEl) return;
        delEl.style.display = 'initial';
    }

    hiddenDel(event) {
        let container = event.target;
        let delEl = container.querySelector('a.del');
        if(!delEl) return;
        delEl.style.display = 'none';
    }

    replyDel(id: number) {
        this.dialog.show({
            title: '删除回复',
            confirmBtn: {
                func: () => {
                    this.http.postJson(api.delReply, {id: id}).subscribe(
                        res => {
                            this.alert.show({type: AlertType.Success, msg: '回复已删除', time: 2000});
                            this.getComments(this.updateView);
                            this.dialog.close();
                        }, err => {
                            this.log.error('EssayCommentComponent', 'replyDel', err);
                            this.dialog.close();
                        }
                    );
                }
            },
            content: '确认要删除该回复?'
        });
        
    }

    commentDel(id: number) {
        this.dialog.show({
            title: '删除留言',
            confirmBtn: {
                func: () => {
                        this.http.postJson(api.delComment, {id: id}).subscribe(
                        res => {
                            this.alert.show({type: AlertType.Success, msg: '评论已删除', time: 2000});
                            this.getComments(this.updateView);
                            this.dialog.close();
                        }, err => {
                            this.log.error('EssayCommentComponent', 'commentDel', err);
                            this.dialog.close();
                        }
                    )
                }
            },
            content: '确认要删除该留言?'
        });
    }
}