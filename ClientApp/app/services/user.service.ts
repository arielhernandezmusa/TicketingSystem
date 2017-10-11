import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../utils/user.interface';

import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {

    public CurrentUser: User;
    public SignedIn: boolean;
    
    constructor(private http: Http, private localStorageService: LocalStorageService) { 
                 
        let user = JSON.parse(this.localStorageService.get('CurrentUser')) as User;

        if (user != null) {
            this.CurrentUser = user;
            this.SignedIn = true;
        } else {
            this.SignedIn = false;
        }
        
    }

    public Register(user: User) {
        return this.http.post('api/User/Register', user).toPromise().then(result => {
            if (result.json().userRegistered == true) {
                return true;
            }
        }, error => {
            return false;
        });
    }

    public Login(user: User) {
        return this.http.post('api/User/Login', user).toPromise().then(result => {
            if (result.json().userSignedIn){
                this.CurrentUser = user;
                var strUser =  JSON.stringify(user);
                this.localStorageService.add('CurrentUser', strUser);
                this.SignedIn = true;
                return true;
            }
        }, error => {
            return false;
        })
    }
    
}