import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { route } from '../../../constant/router';
import { LocalStorageService, LKEY } from '../../../service/localstorage.service';
import { SessionStorage, KEY } from '../../../service/sessionStorage.service';
import { constant } from '../../../constant/constant';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';

@Component({
    selector: 'app-essay-comment-editor',
    templateUrl: './essay.comment.editor.html',
    styleUrls: ['./essay.comment.editor.scss']
})

export class EssayCommentEditor implements OnInit{
    @ViewChild('textarea') textareaRef: ElementRef;

    _TYPE = TYPE;

    userSignUrl: string = route.sign;

    isUser: boolean;

    @Input() model: CommentEditorModel;

    isCommenting: boolean = false;

    userImg: string = '../../../assets/img/default-head.png';

    constructor(private lstorage: LocalStorageService, private storage: SessionStorage, private http: HttpService) {}

    ngOnInit() {
        this.isUser = this.lstorage.get(LKEY.loginStatus) === constant.isUser? true: false;
        let info = this.storage.get(KEY.MYHOMECP_USERINFO); 
        this.userImg = (info && info.portrait) || this.userImg;       
        if(this.textareaRef) {
            this.textareaRef.nativeElement.addEventListener('focus', () => this.isCommenting = true);
        }
    }

    cancelComment = () => {
        if(this.model && this.model.cancel) {
            this.model.cancel();
        }
        this.isCommenting = false;
        this.model.comment = '';
    }

    sendComment() {
        if(this.model && this.model.send) {
            let params = this.model.send.params;
            this.model.send.func(this.cancelComment, ...params);
            return;
        }
        this.cancelComment();
    }
}

export interface CommentEditorModel {
    comment: string;
    send: {func: Function, params: Array<any>}
    cancel?: Function;
    type?: number;
}
export enum TYPE {
    COMMENT,
    REPLY
}