import {Component, ViewChild, ElementRef, Renderer2, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../../constant/router';
import { Logger } from '../../../service/logger.service';
import { HttpService } from '../../../service/http.service';
import { EssayService } from './markdown.writer.service';
import { AlertService, AlertType } from '../../../component/alert/alert.service';

@Component({
    selector:'app-markdown-writer',
    templateUrl:'./markdown.writer.html',
    styleUrls:['./markdown.writer.scss'],
    providers: [EssayService]
})

export class MarkdownWriter implements OnInit{

    @ViewChild('newTagOper') newTagOper:ElementRef;

    constructor(private router: Router, private render: Renderer2, 
    private log:Logger, private service: EssayService, private alert: AlertService) {}

    noteImgSrc: string = '../../../../assets//img/note.png';

    // tags: string[] = ['随笔', '日记', 'css'];
    // newTag: string;
    // activeTag: string = '随笔';

    tags: string[] = [];
    newTag: string;
    activeTag: string = '';
    
    // essayTags: any = {
    //     '随笔': {
    //         '12': {id: '12', title:"web响应式开发", text:"内容靠脑补", size:5,readtime:11,remark:"很棒",
    //         createtime:134213213321323, updatetime:12321321323232},
    //         '13': {id: '13',title:'css学习笔记二'}
    //     }
    // };
    essayTags: any = {};
    activeEssayKey: string = '';
    newEssayTag: string;

    ngOnInit() {
        this.service.initWriter((res, err) => {
            if(!err) { 
                this.tags = res['taglist'];
                if(!(this.tags instanceof Array)) {
                    this.log.warn('MarkdownWriterComponent', 'ngOnInit', 'tags is not array');
                    return;
                } 
                if(this.tags.length <= 0) {
                    this.submitNewTag('随笔');
                    return;
                }
                this.activeTag = this.tags[0];
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
            }
        })
    }

    //存入文章信息
    saveEssayMsg(tag: string, essayTag: string, model: EssayModel) {
        if(!this.essayTags[tag]) {
            this.essayTags[tag] = {};
        }
        this.essayTags[tag][essayTag] = model;
    }

    //进入博客首页
    toHome = () => {
        this.router.navigate([route.blog]);
    }

    //判断某个tag是否激活
    isTagActive(name: string) {
        return this.tags.some((val) => {
            return (val === name && this.activeTag === name);
        });
    }

    //判断某个文章标签是否激活
    isEssayActive(id: string) {
        return this.activeEssayKey == id;
    }

    //激活当前标签的某个文章标签
    essayActive(id: string) {
        this.activeEssayKey = id;
    }

    //激活某标签
    tagActive(name: string) {
        this.activeTag = name;
        this.service.getEssay(this.activeTag, (data, err) => {
            if(!err) {
                if(!data) {
                    this.log.warn('MarkdownWriterComponent', 'tagActive', 'data not exist');
                    return; 
                }
                let arr = this.jsonToArray(data.essaytaglist);
                if(arr.length <= 0) return;
                this.activeEssayKey = arr[0].id;
                arr.forEach(e => {
                    this.saveEssayMsg(this.activeTag, e.id, e);
                })
                if(data.firstessay && data.firstessay.id) {
                    this.essayTags[this.activeTag][this.activeEssayKey] = data.firstessay;
                }
            }
        });
    }

    //新建文章
    addEssay() {
        if(!this.activeTag) {
            this.log.warn('MarkdownWriterComponent', 'addEssay', '当前无选中标签');
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
                this.essayTags[this.activeTag][this.activeEssayKey] = {'id': id, title: title};
                this.log.debug('MarkdownWriterComponent', 'addEssay', {'新建文章id': id});
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
        if(this.tags.indexOf(newTag) !== -1) {
            this.alert.show({type: AlertType.Warn, msg: '标签已存在', time: 2000});
            return;
        }
        this.service.newTag(newTag, (err) => {
            if(!err) {
                this.tags.unshift(newTag);
                this.cancelNewTag();
                this.activeTag = newTag;
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

    //获取文章信息数组用于渲染dom
    jsonToArray(json:any) {
        let res = [];
        for(const i in json) {
            res.push(json[i]);
        }
        return res;
    }

}

interface EssayModel {
    title: string,
    text: string,
    size: number,
    readtime: number,
    remark: string,
    createtime: string, 
    updatetime: string
}