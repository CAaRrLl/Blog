import {Component, OnDestroy} from '@angular/core';
import { DialogService } from '../../../component/dialog/dialog.service';
import { Logger } from '../../../service/logger.service';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { AlertService, AlertType } from '../../../component/alert/alert.service';

@Component({
    selector:'app-insert-img',
    templateUrl:'./insert.img.html',
    styleUrls:['./insert.img.scss']
})

export class InsertImgComponent implements OnDestroy{
    
    constructor(private dialog: DialogService, private log: Logger, 
        private alert: AlertService, private http: HttpService) {}

    text: string; 
    essay: {title: string, text: string} = {title: '', text: ''};

    insertMethod: number = 0;

    changeInsertMethod() {
        if(this.insertMethod == 1) {
            this.insertMethod = 0;
        }else {
            this.insertMethod = 1;
        }
    }

    getTip() {
        return Method[this.insertMethod];
    }

    cancel() {
        this.dialog.close();
    }

    confirm() {
        this.essay.text += this.text;
        this.cancel();
    }

    getImgFromLocal(target) {
        if(!target.files) {
            this.log.warn('InsertImg', 'getImgFromLocal', '本地图片不存在');
            return;
        }
        if(target.files.length <= 0) {
            this.log.warn('InsertImg', 'getImgFromLocal', '未选中图片');
            return;
        }
        this.log.debug('InsertImg', 'getImgFromLocal', {'选中图片为': target.files});
        let valid = [].slice.call(target.files).every((file) => {
            return (file as File).type.indexOf('image') === 0;
        });
        if(!valid) {
            this.alert.show({type: AlertType.Warn, msg: '只支持图片', time: 1000});
            return;
        }
        let formdata: FormData = new FormData();
        [].slice.call(target.files).forEach((file) => {
            formdata.append('key', file);
        });
        this.log.debug('InsertImg', 'getImgFromLocal', {'提交表单为': formdata});
        this.http.postFormData(api.uploadFile, formdata).subscribe(
            res => {
                if(!res['data']) {
                    this.log.warn('InsertImg', 'getImgFromLocal', '提交图片反馈结果为空');
                    return;
                }
                let files = res['data'].files;
                if(!files || !(files instanceof Array)) {
                    this.log.warn('InsertImg', 'getImgFromLocal', '提交图片反馈结果为空');
                    return;
                }
                this.text = '';
                files.forEach((file) => {
                    let suffix = file.name && file.name.split('.') && file.name.split('.')[1];
                    this.text += '\n' + this.getImgMd(file.name, `${api.getFile}/${file.id}.${suffix}`) +'\n';
                });
                this.essay.text += this.text;
            },err => {
                this.log.error('InsertImg', 'getImgFromLocal', err);
            }
        );
        this.cancel();
    }

    getImgUrl(target) {
        let url: string = target && target.value;
        if(!url) return;
        this.text ='\n' + this.getImgMd('', url) +'\n';
    }

    getImgMd(name, url) {
        return `![${name}](${url})`;
    }

    ngOnDestroy() {
        this.dialog.close();
    }
};

enum Method {
    '或者网络图片',
    '或者本地图片'
}