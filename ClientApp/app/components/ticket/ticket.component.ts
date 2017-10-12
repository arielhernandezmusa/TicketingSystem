import { Component, OnInit, TemplateRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html'
})

export class TicketComponent implements OnInit {
    public modalRef: BsModalRef;
    public subscriptions: Subscription[] = [];
    public tickets = [];

    constructor(private ticketService: TicketService, private modalService: BsModalService) { }

    ngOnInit() { 
        this.ticketService.List().then(result => {
            this.tickets = result;
        });
    }

    public openModal(template: any) {
        this.modalRef = this.modalService.show(template);
    }
}