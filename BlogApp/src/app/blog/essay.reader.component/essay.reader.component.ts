import { Component, OnInit } from '@angular/core';
import { Logger } from '../../service/logger.service';
import { HttpService } from '../../service/http.service';
import { api } from '../../constant/api';
import { SessionStorage, KEY } from '../../service/sessionStorage.service';

@Component({
    selector: 'app-essay-reader',
    templateUrl: './essay.reader.component.html',
    styleUrls: ['./essay.reader.component.scss']
})

export class EssayReaderComponent implements OnInit{
    
    essayid: string = 'ds';
    essayText: string;

    constructor(private log: Logger, private http: HttpService, private storage: SessionStorage) {}

    ngOnInit() {
        this.essayid = this.storage.get(KEY.EssayID);
        if(!this.essayid)  {
            history.go(-1);
            return;
        }
        this.http.getJson(api.getEssay, {id: this.essayid}).subscribe(
            res => {
                this.essayText = res['text'];
            }, err => {
                this.log.error('EssayReader', 'ngOnInit', err);
            }
        )
    }
}