import { Component, OnInit } from '@angular/core';
import { User } from '../../utils/user.interface';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public user: User;

    constructor() { }

    ngOnInit() { 
        this.user = {
            Name: 'yyytu',
            Email: '',
            Password: '',
            ConfirmPassword: ''
        }
    }

    public Register() {
        console.log(this.user);
    }
}