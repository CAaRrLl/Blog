import { Component, OnInit } from '@angular/core';
import { EssayListModel } from '../../essay.list.component/essay.list.component';

@Component({
    selector: 'app-my-essay',
    templateUrl: './my.essay.component.html',
    styleUrls: ['./my.essay.component.scss']
})

export class MyEssayComponent implements OnInit{
    essaylistModel: EssayListModel[] = [
        
    ];

    item = {id: '323', headUrl: '../../../../assets/img/Book.png', author: '反倒是可能', msg: 22, collected: 88,
    day: '09:22', time: '12:11', title: '发大大节省了空间看', text: '放声大哭JFK士大夫艰苦拉萨大家弗兰克时间大量军队卡是捷克·1', visited: 34};

    ngOnInit() {
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
        this.essaylistModel.push(this.item);
    }
}