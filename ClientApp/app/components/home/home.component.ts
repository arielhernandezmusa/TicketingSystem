import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    public constructor(public userService: UserService){

    }

    ngOnInit() {

        

        $('#menu ul').hide();
        $('#menu ul').children('.current').parent().show();
       // $('#menu ul:first').show();
        $('#menu li a').click(
            function() {
                console.log('asdad');
                var checkElement = $(this).next();
                if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                    return false;
                }
                if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                    $('#menu ul:visible').slideUp('normal');
                    checkElement.slideDown('normal');
                     return false;
                }
           }
        );

       
    }
    
    public Toggle() {
        $("#wrapper").toggleClass("toggled");
    }

    public Toggle2(){
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
   }         

   public LogOut() {
       this.userService.LogOut();
   }

}
