import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../utils/user.interface';

import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    public CurrentUser: User;
    public SignedIn: boolean;
    
    constructor(private http: Http, private localStorageService: LocalStorageService, private router: Router) { 
                 
        let user = JSON.parse(this.localStorageService.get('CurrentUser')) as User;

        if (user != null) {
            this.CurrentUser = user;
            this.SignedIn = true;
        } else {
            this.SignedIn = false;
        }
        
    }

    public Register(user: User) {
        return this.http.post('api/User/Register', user)
            .toPromise()
            .then(result => {
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
                this.CurrentUser = result.json().user;
                var strUser =  JSON.stringify(result.json().user);
                this.localStorageService.set('CurrentUser', strUser);
                this.SignedIn = true;
                return true;
            }
        }, error => {
            return false;
        })
    }

    public LogOut() {
        this.SignedIn = false;
        this.router.navigate(['/login'], {});
        this.localStorageService.remove('CurrentUser');
    }
    
    public List() {
        return this.http.get('api/User/List')
            .toPromise()
            .then(result => result.json())
            .catch(this.handleError);
    }

    public Tickets() {
        return this.http.get('api/ticket/byUser/'+this.CurrentUser.id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    
}