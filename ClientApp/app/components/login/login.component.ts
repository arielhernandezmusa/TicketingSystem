import { Component, OnInit } from '@angular/core';
import { User } from '../../utils/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {

    public user: User;
    public errorMessage: string;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() { 
        this.user = {
            id: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    public SignIn() {
        this.userService.Login(this.user).then(result => {
            if (result as boolean) {
                this.router.navigate(['/home'], {});
            } else {
                this.errorMessage = 'Mail or password incorrect';
            }
        })
    }
}