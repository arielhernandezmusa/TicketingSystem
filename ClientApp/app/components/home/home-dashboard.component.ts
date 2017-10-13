import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { UserService } from '../../services/user.service';
import { Ticket } from '../../utils/ticket.interface';

@Component({
  templateUrl: 'home-dashboard.component.html'
})
export class HomeDashboardComponent implements OnInit {
 
  public ticketsOpened = [];
  public ticketsClosed = [];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  
    this.userService.Tickets().then(result => {
      console.log(result.tickets);
      this.ticketsOpened = result.tickets.filter((t:Ticket) => t.status == true);
      this.ticketsClosed = result.tickets.filter((t:Ticket) => t.status == false);
    });
    
    
  }
}

