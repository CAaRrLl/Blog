import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';

@Component({
    selector: 'app-essay-reader',
    templateUrl: './essay.reader.component.html',
    styleUrls: ['./essay.reader.component.scss']
})

export class EssayReaderComponent implements OnInit, AfterViewInit{
    
    essayid: string;
    essayText: string;
    essayTitle: string;

    commentEditorModel: CommentEditorModel = {comment: '', send: {func: null, params: []}};
    //通知评论区更新
    change: boolean = true;

    constructor(private log: Logger, private http: HttpService, private alert: AlertService,
        private storage: SessionStorage, private aroute: ActivatedRoute) {}

    ngOnInit() {
        this.essayid = this.storage.get(KEY.READER_ESSAYID);
        if(!this.essayid)  {
            history.go(-1);
            return;
        }
        this.http.getJson(api.readEssay, {id: this.essayid}).subscribe(res => {}, err => {
            this.log.error('EssayReader', 'ngOnInit', err);
        });
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

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.aroute.queryParams.map(params => params.mao).subscribe(
                mao => {
                    if(mao) {
                        let comment = document.getElementById('comment');
                        this.goToComment(comment.offsetTop);        
                    }
                }
            );
        }, 500);
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

    goToComment(offsetTop) {
        setTimeout(() => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let scrollHeight = document.body.scrollHeight;
            if(offsetTop - scrollTop <= 200 && offsetTop - scrollTop >= 0 
                || Math.abs(scrollHeight - scrollTop - window.innerHeight) < 10) return;
            window.scrollBy(0, 50);
            this.goToComment(offsetTop);
        }, 1000/60);
    }
}