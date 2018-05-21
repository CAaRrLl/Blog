import {Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../../constant/router';
import { Logger } from '../../../service/logger.service';
import { HttpService } from '../../../service/http.service';
import { EssayService } from './markdown.writer.service';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { DropdownList } from '../../../component/dropdown/dropdown.component';
import { constant } from '../../../constant/constant';
import { DialogService } from '../../../component/dialog/dialog.service';
import { Observable, Subscription } from 'rxjs/Rx'; 
import { AbstractExtendedWebDriver } from 'protractor/built/browser';
import { InsertImgComponent } from '../../component/insert-img/insert.img';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModifyComponent } from '../../component/modify.component/modify.component';
import { SelectComponent, SelectModel, Option } from '../../../component/select.component/select.component';

@Component({
    selector:'app-markdown-writer',
    templateUrl:'./markdown.writer.html',
    styleUrls:['./markdown.writer.scss'],
    providers: [EssayService]
})

export class MarkdownWriter implements OnInit, OnDestroy{

    @ViewChild('newTagOper') newTagOper: ElementRef;
    @ViewChild('essayTitleRef') essayTitleRef: ElementRef;
    @ViewChild('essayContentRef') essayContentRef: ElementRef;

    constructor(private router: Router, private render: Renderer2,private dialog: DialogService, 
    private log:Logger, private service: EssayService, private alert: AlertService) {}

    noteImgSrc: string = '../../../../assets//img/note.png';
    draftImgSrc: string = '../../../../assets//img/draft.png';

    // tags: string[] = [{id:'1',tag:'随笔'}, {id:'2',tag:'日记'}, {id:'3',tag:'css'}];

    tags: any[] = [];
    newTag: string;
    activeTag: string = '';
    tagFunc: DropdownList[] = [
        {
            iconTag: 'edit',
            content: '修改标签',
            func: () => {this.modifyTag()}
        },
        {
            iconTag: 'trash',
            content: '删除标签',
            func: () => {this.deleteTag()}
        }
    ];
    
    // essayTags: any = {
    //     '随笔': {
    //         '12': {id: '12', title:"web响应式开发", text:"内容靠脑补", size:5,readtime:11,remark:"很棒",
    //         createtime:134213213321323, updatetime:12321321323232},
    //         '13': {id: '13',title:'css学习笔记二'}
    //     }
    // };
    essayTags: any = {};
    activeEssayKey: string = '';

    //编辑器数据
    essayData: {title: string, text: string} = {title: '', text: ''};

    isPreview: boolean = false;

    titleSubscription: Subscription;
    essaySubscription: Subscription;

    ngOnInit() {
        this.titleSubscription = Observable.fromEvent(this.essayTitleRef.nativeElement, 'input').debounceTime(2000)
        .subscribe(e => {
            let title  = ((e as Event).target as HTMLInputElement).value;
            this.updateToActiveEssay({'title': title});
            this.saveEssay();
        });
        this.essaySubscription = Observable.fromEvent(this.essayContentRef.nativeElement, 'input').debounceTime(5000)
        .subscribe(e => {
            let text = ((e as Event).target as HTMLTextAreaElement).value;
            this.updateToActiveEssay({'text': text, 'size': text.length});
            this.saveEssay();
        });
        this.init();
    }

    ngOnDestroy() {
        this.titleSubscription.unsubscribe();
        this.essaySubscription.unsubscribe();
    }

    //初始化页面
    init() {
        this.service.initWriter((res, err) => {
            if(!err) { 
                this.tags = res['taglist'];
                if(!(this.tags instanceof Array)) {
                    this.log.warn('MarkdownWriterComponent', 'ngOnInit', 'tags is not array');
                    return;
                } 
                if(this.tags.length <= 0) {
                    this.activeTag = undefined;
                    this.activeEssayKey = undefined;
                    return;
                }
                this.activeTag = this.tags[0].id;
                this.essayTags = {};
                this.essayTags[this.activeTag] = {};
                if(!(res.essaytaglist instanceof Array)) {
                    this.log.warn('MarkdownWriterComponent', 'ngOnInit', 'essaytaglist is not array');                    
                    return;
                }
                res.essaytaglist.forEach(val => {
                    let essayTag = {id: val.id, title: val.title};
                    this.essayTags[this.activeTag][val.id] = essayTag;
                });
                if(!res.firstessay) {
                    this.log.warn('MarkdownWriterComponent', 'ngOnInit', 'firstessay not exist');                    
                    return;
                }
                let essay = res.firstessay;
                if(!essay.id) return;
                this.activeEssayKey = String(essay.id);
                this.saveEssayMsg(this.activeTag, this.activeEssayKey, essay);
                this.initEditor();
            }
        });
    }

    
    //初始化编辑器
    initEditor() {
        this.updateToEditor({
            'title': this.essayTags[this.activeTag][this.activeEssayKey].title,
            'text': this.essayTags[this.activeTag][this.activeEssayKey].text
        });       
    }

    //更新编辑器
    refreshEditor() {
        this.updateToEditor({
            'title': this.essayTags[this.activeTag][this.activeEssayKey].title,
            'text': this.essayTags[this.activeTag][this.activeEssayKey].text
        });
    }

    //设置某个标签的名称
    setTag(id: string, val: string) {
        this.tags.forEach((tag) => {
            if(tag.id === id) {
                tag.tag = val;
                return;
            }
        });
    }

    //存入文章信息
    saveEssayMsg(tag: string, essayTag: string, model: EssayModel) {
        if(!this.essayTags[tag]) {
            this.essayTags[tag] = {};
        }
        this.essayTags[tag][essayTag] = model;
    }

    //更新某项内容到文章模型
    updateToActiveEssay(obj: any) {
        if(this.activeTag && this.activeEssayKey) {
            for(const key in obj) {
                this.essayTags[this.activeTag][this.activeEssayKey][key] = obj[key];
            }
        }
    }

    //更新某项内容到编辑器
    updateToEditor(obj: any) {
        if(this.activeTag && this.activeEssayKey) {
            for(const key in obj) {
                this.essayData[key] = obj[key];
            }
        }
    }

    //进入博客首页
    toHome = () => {
        this.router.navigate([route.blog]);
    }

    //判断某个tag是否激活
    isTagActive(id: string) {
        return this.tags.some((val) => {
            return (val.id == id && this.activeTag == id);
        });
    }

    //判断某个文章标签是否激活
    isEssayActive(id: string) {
        return this.activeEssayKey == id;
    }

    //激活当前标签的某个文章标签
    essayActive(id: string) {
        this.activeEssayKey = id;
        this.service.getEssay(this.activeEssayKey, (err, res) => {
            if(!err) {
                if(this.activeTag) {
                    this.saveEssayMsg(this.activeTag, this.activeEssayKey, res.data);
                }
                this.refreshEditor();
            }
        });
    }

    //激活某标签
    tagActive(id: string) {
        this.activeTag = id;
        this.service.getEssayTag(this.activeTag, (data, err) => {
            if(!err) {
                if(!data) {
                    this.log.warn('MarkdownWriterComponent', 'tagActive', 'data not exist');
                    return; 
                }
                let tag = data.tag;
                data = data.data;         
                let arr = this.jsonToArray(data.essaytaglist);
                if(arr.length <= 0) {
                    this.activeEssayKey = undefined;
                    return;
                }
                this.activeEssayKey = arr[0].id;
                arr.forEach(e => {
                    this.saveEssayMsg(tag, e.id, e);
                })
                if(data.firstessay && data.firstessay.id) {
                    this.essayTags[tag][this.activeEssayKey] = data.firstessay;
                }
                this.refreshEditor();
            }
        });
    }

    //新建文章
    addEssay() {
        if(!this.activeTag) {
            this.log.warn('MarkdownWriterComponent', 'addEssay', '当前无选中标签');
            this.alert.show({type: AlertType.Warn, msg: '请选择标签', time: 1000});
            return;
        }
        let title = new Date().toLocaleDateString();
        this.service.newEssay(title, this.activeTag, (id, err) => {
            if(!err) {
                if(!id) {
                    this.log.warn('MarkdownWriterComponent', 'addEssay', 'id not exist');
                    return;
                }
                this.activeEssayKey = id;
                if(!this.essayTags[this.activeTag]) {
                    this.essayTags[this.activeTag] = {};
                }
                this.essayTags[this.activeTag] = this.jsonUnshift(this.essayTags[this.activeTag], this.activeEssayKey, {'id': id, title: title});
                console.log(this.essayTags[this.activeTag]);
                this.log.debug('MarkdownWriterComponent', 'addEssay', {'新建文章id': id});
                this.refreshEditor();
            }
        });
    }

    //新建标签
    addTag() {
        this.dropNewTagOper();
    }

    //取消新建标签
    cancelNewTag() {
        this.retractNewTagOper();
        this.newTag = '';
    }

    //提交新建标签
    submitNewTag(newTag: string) {
        if(!newTag) {
            this.log.warn('MarkdownWriterComponent', 'submitNewTag', 'newTag not exist');
            return;
        }
        this.log.debug('MarkDownWriter', 'submitCreateTag', '新建标签:' + newTag);
        this.service.newTag(newTag, (err, id) => {
            if(!err) {
                this.tags.unshift({'id':id, 'tag': newTag});
                this.cancelNewTag();
                this.activeTag = id;
            }
        });
    }

    //收起新建标签
    retractNewTagOper() {
        let el = this.newTagOper.nativeElement;
        this.render.setStyle(el, 'opacity', '0');
        this.render.setStyle(el, 'height', '0');
    }

    //展开新建标签
    dropNewTagOper() {
        let el = this.newTagOper.nativeElement;
        this.render.setStyle(el, 'opacity', '1');
        this.render.setStyle(el, 'height', '5rem');
    }

    //更新标签
    updateTag() {
        this.service.getTag((tags, err) => {
            if(!err) {
                if(!(tags instanceof Array)) {
                    this.log.warn('MarkdownWriterComponent', 'ngOnInit', 'tags is not array');
                    return;                    
                }
                this.tags = tags;
            }
        });
    }

    //更新当前文章目录
    updateEssayTag() {
        
    }

    //获取当前标签名
    getCurrentTagName(): string {
        let res: string = '';
        this.tags.forEach((tag) => {
            if(tag.id === this.activeTag) {
                res = tag.tag;
            }
            return;
        });
        return res;
    }

    //删除某篇文章的目录
    removeEssayTag(tagid, id) {
        let essayTaglist = this.essayTags[tagid];
        if(!essayTaglist || !(id in essayTaglist)) {
            this.log.warn('MarkdownWriterComponent', 'removeEssayTag', '要删除的文章不存在');
            return;
        }
        delete this.essayTags[tagid][id];
        let activeOne = '', i = 0;
        for(const id in essayTaglist) {
            if(i === 0) {
                activeOne = id;
            }else break;
            i++;
        }
        if(activeOne) {
            this.essayActive(activeOne);
        }
    }

    //获取文章信息数组用于渲染dom
    jsonToArray(json:any) {
        let res = [];
        for(const i in json) {
            res.push(json[i]);
        }
        return res;
    }

    //添加属性到对象头
    jsonUnshift(json: any, key, val) {
        let temp = json;
        json = {};
        json[key] = val;  
        Object.keys(temp).forEach((k) => {
            json[k] = temp[k];
        });
        return json;
    }

    //根据文章的状态获取不同的操作
    getEssayTagFunc(status: number) { 
        let func: DropdownList[] = [];
        switch(status) {
            case constant.isPublish:
                func.push({
                    iconTag: 'success',
                    content: '已发布'
                });
                break;
            case constant.isNotPublish:
            default:
                func.push({
                    iconTag: 'reply',
                    content: '发布更新',
                    func: () => {this.publish()}
                });
                break;
        }
        func.push({
            iconTag: 'folderopen',
            content: '移动文章',
            func: () => {this.moveEssay()}
        });
        func.push({
            iconTag: 'trash',
            content: '删除文章',
            func: () => {this.deleteEssay()}
        });
        return func;
    }

    getPartial() {
        if(typeof this.essayData.text === 'string') {
            return this.essayData.text.substr(0, 10);
        }
    }

    //删除标签
    deleteTag() {
        this.dialog.show({
            confirmBtn: {func: () => {
                this.service.deleteTag(this.activeTag, (err) => {
                    if(err) {
                        this.alert.show({type: AlertType.Error, msg: '删除标签失败', time: 2000});
                        return;
                    }
                    this.alert.show({type: AlertType.Success, msg: '删除标签成功', time: 2000});
                    this.dialog.close();
                    if(this.activeTag in this.essayTags){
                        delete this.essayTags[this.activeTag];
                        this.activeTag = undefined;
                        this.activeEssayKey = undefined;
                    }
                    this.init();
                })
            }},
            content: '确定要删除该标签吗？删除后标签下的文章也会随之删除'
        });
    }

    //删除文章
    deleteEssay() {
        this.dialog.show({
            confirmBtn: {func: () => {
                this.service.deleteEssay(this.activeEssayKey, (err) => {
                    if(err) {
                        this.alert.show({type: AlertType.Error, msg: '删除文章失败', time: 2000});
                        return;
                    }
                    this.alert.show({type: AlertType.Success, msg: '删除文章成功', time: 2000});
                    this.dialog.close();
                    if(!this.activeTag) return;
                    if(this.activeEssayKey in this.essayTags[this.activeTag]){
                        delete this.essayTags[this.activeTag][this.activeEssayKey];
                        this.activeEssayKey = undefined;
                    }
                    this.tagActive(this.activeTag);
                })
            }},
            content: '确定要删除该文章吗？'
        });
    }

    //撤消
    undo() {

    }

    //恢复
    redo() {

    }

    //插入图片
    insertImg() {
        let feedback: {text: string} = {text: ''};
        this.dialog.show({
            content: InsertImgComponent,
            confirmBtn: {hidden: true},
            cancelBtn: {hidden: true},
            params: {'essay': this.essayData}
        })
    }

    //预览
    preview() {
        this.isPreview = !this.isPreview;
    }

    //发布更新
    publish() {
        if(!this.activeEssayKey) {
            this.log.warn('MarkdownWriter', 'saveEssay', '要保存的文章id不存在');
            return;
        }
        this.saveEssay();
        this.service.publishEssay(this.activeEssayKey, (err) => {
            if(err) {
                this.alert.show({type: AlertType.Error, msg: '发布文章失败', time: 1000});
                return;
            }
            this.alert.show({type: AlertType.Success, msg: '发布文章成功', time: 1000});
            this.essayTags[this.activeTag][this.activeEssayKey]['status'] = 1;
        });
    }

    //保存
    saveEssay() {
        if(!this.activeEssayKey) {
            this.log.warn('MarkdownWriter', 'saveEssay', '要保存的文章id不存在');
            return;
        }
        this.service.saveEssay({
            id: this.activeEssayKey,
            title: this.essayData.title || '',
            text: this.essayData.text || ''
        }, (err) => {
            if(err) {
                this.alert.show({type: AlertType.Error, msg: '文章保存失败', time: 1000});
                return;
            }
            this.alert.show({type: AlertType.Success, msg: '文章保存成功', time: 1000});
        });
    } 

    //移动文章
    moveEssay() {
        let options: Option[] = [];
        this.tags.forEach((item) => {
            let option: Option = {id: '', name: ''};
            option.id = item.id;
            option.name = item.tag;
            options.push(option);
        });
        let model = {options: options, value: this.activeTag};
        this.dialog.show({
            confirmBtn: {func: () => {
                let activeTag = this.activeTag;
                let activeEssayKey = this.activeEssayKey;
                if(!activeTag || !activeEssayKey) {
                    this.log.error('MarkdownWriter', 'moveEssay', '未选择标签及文章');
                    return;
                }
                if(model.value == activeTag) {
                    this.dialog.close();
                    return;
                }
                this.service.setEssayTag(activeEssayKey, model.value, (err) => {
                    if(err) {
                        this.alert.show({type: AlertType.Error, msg: '移动文章失败', time: 1000});
                        return;
                    }
                    this.removeEssayTag(activeTag, activeEssayKey);
                    this.alert.show({type: AlertType.Success, msg: '移动文章成功', time: 1000});
                });
                this.dialog.close();
            }},
            content: SelectComponent,
            params: {model: model}
        });
    }

    //修改标签
    modifyTag() {
        let currentTag = this.getCurrentTagName();
        let model = {text: currentTag, tip: '请输入新标签名'};
        this.dialog.show({
            confirmBtn: {func: () => {
                let activeTag = this.activeTag;
                if(!activeTag) {
                    this.log.error('MarkdownWriter', 'modifyTag', '未选择标签');
                    return;
                }
                this.service.modifyTag(activeTag, model.text, (err) => {
                    if(err) {
                        this.alert.show({type: AlertType.Error, msg: '修改标签失败', time: 1000});
                        return;
                    }
                    this.setTag(activeTag, model.text);
                    this.alert.show({type: AlertType.Success, msg: '标签更新', time: 1000});
                });
                this.dialog.close();
            }},
            title: '修改标签',
            content: ModifyComponent,
            params: {model: model}
        });
    }
}

export interface EssayModel {
    id: string,
    title: string,
    text: string,
    size: number,
    readtime: number,
    remark: string,
    createtime: string, 
    updatetime: string
}