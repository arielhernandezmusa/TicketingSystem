import { Component, OnInit } from '@angular/core';
import { User } from '../../utils/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public user: User;
    public registered: boolean;

    constructor(public userService: UserService) { }

    ngOnInit() { 

        this.registered = false;

        this.user = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    public Register() {
        this.userService.Register(this.user).then(result => {
            this.registered = result as boolean;
            console.log(result);
        });
    }
}