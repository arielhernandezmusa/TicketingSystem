import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    public CurrentUser: any;
    
    constructor(private http: Http) {

    }

    public Register(user:any) {
        this.http.post('api/User/Register', user).subscribe(result => {

        }, error => {

        });
    }
    
}