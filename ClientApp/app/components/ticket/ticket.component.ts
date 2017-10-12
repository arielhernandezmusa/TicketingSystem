import { Component, OnInit, TemplateRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import * as $ from 'jquery';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html'
})

export class TicketComponent implements OnInit {

    public tickets = [];

    constructor(private ticketService: TicketService) { }

    ngOnInit() { 
        this.ticketService.List().then(result => {
            this.tickets = result;
        });
    }

    public openModal(template: TemplateRef<any>) {
        //$('#addForm').modal('show')
    }
}