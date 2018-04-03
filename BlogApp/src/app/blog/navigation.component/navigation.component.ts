import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
    iconSrc: string = '../../../assets/img/mouse.png';
    iconTip: string = 'Proj';
}

export interface NavigationModel{
    
}