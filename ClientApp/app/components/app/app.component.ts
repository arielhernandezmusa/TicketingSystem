import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import * as $ from 'jquery';
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public p:number = 1;

    constructor(){

    }

    ngOnInit() {}
}
