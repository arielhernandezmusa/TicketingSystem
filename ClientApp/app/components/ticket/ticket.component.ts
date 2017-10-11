import { Component, OnInit, TemplateRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html'
})

export class TicketComponent implements OnInit {

    public tickets = [];
    public modalRef: BsModalRef;

    constructor(private ticketService: TicketService, private modalService: BsModalService) { }

    ngOnInit() { 
        this.ticketService.List().then(result => {
            this.tickets = result;
        });
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
}