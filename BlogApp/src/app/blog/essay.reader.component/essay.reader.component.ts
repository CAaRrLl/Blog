import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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
import { SideToolService } from '../../component/side.tool/side.tool.service';

@Component({
    selector: 'app-essay-reader',
    templateUrl: './essay.reader.component.html',
    styleUrls: ['./essay.reader.component.scss']
})

export class EssayReaderComponent implements OnInit, AfterViewInit, OnDestroy{
       
    essayid: string;
    essayText: string;
    essayTitle: string;

    collected: boolean;

    commentEditorModel: CommentEditorModel = {comment: '', send: {func: null, params: []}};
    //通知评论区更新
    change: boolean = true;

    constructor(private log: Logger, private http: HttpService, private alert: AlertService, private lstorage: LocalStorageService,
        private storage: SessionStorage, private aroute: ActivatedRoute, private sideToolService: SideToolService) {}

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
        if(this.lstorage.get(LKEY.loginStatus) === constant.isUser) {
            this.isCollectedByUser().subscribe(
                res => {
                    let data = res['data'];
                    if(data && data.iscollected) {
                        this.addCollectionTool(true);
                    } else {
                        this.addCollectionTool(false);
                    }
                }, err => {
                    this.log.error('EssayReaderComponent', 'ngOnInit', err);
                }
            )
        }       
    }

    isCollectedByUser() {
        return this.http.getJson(api.isCollected, {id: this.essayid});
    }

    addCollectionTool(isActive: boolean) {
        if(!this.essayid) return;
        let _func: Function;
        if(!isActive) {
            _func = () => {
                this.http.getJson(api.collectEssay, {id: this.essayid}).subscribe(
                    res => {
                        this.alert.show({type: AlertType.Success, msg: '已收藏', time: 2000});
                        this.addCollectionTool(true);
                    }, err => {
                        this.log.error('EssayReaderComponent', 'addCollectionTool', err);
                    }
                );
            }
        } else {
            _func = () => {
                this.http.getJson(api.collectCancal, {id: this.essayid}).subscribe(
                    res => {
                        this.alert.show({type: AlertType.Success, msg: '已取消收藏', time: 2000});
                        this.addCollectionTool(false);
                    }, err => {
                        this.log.error('EssayReaderComponent', 'addCollectionTool', err);
                    }
                )
            }
        }
        this.sideToolService.add({ 
            iconTag: 'heart', 
            tip: '点击收藏', 
            func: _func,
            active: isActive
        });
    }

    removeCollectionTool() {
        this.sideToolService.delete('heart');
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

    ngOnDestroy() {
        if(this.lstorage.get(LKEY.loginStatus) === constant.isUser) {
            this.removeCollectionTool();
        }  
    }

}