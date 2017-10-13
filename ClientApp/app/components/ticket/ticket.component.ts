import { Component, OnInit, TemplateRef } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import { UserService } from '../../services/user.service';
import { Ticket } from '../../utils/ticket.interface';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})

export class TicketComponent implements OnInit {
    public modalRef: BsModalRef;
    public subscriptions: Subscription[] = [];
    public tickets = [];
    public users = [];
    public ticket: Ticket;
    public SuccessMessage: string = '';
    private actionToDo: string;

    constructor(private ticketService: TicketService, private modalService: BsModalService,
        private userService: UserService) { }

    ngOnInit() { 
        this.LoadData();
        this.userService.List().then(result => {
            console.log(result)
            this.users = result;
        })
        
    }

    private LoadData() {
        this.ticketService.List().then(result => {
            this.tickets = result;
        });
    }

    public openModal(template: any) {
        this.actionToDo = 'create';
        this.ticket = { id: 0, title: '', body: '', authorid: '', assigneeid: '', status: true, created: new Date() };

        this.modalRef = this.modalService.show(template);
    }

    public Save(template: any) {
        if (this.actionToDo == 'create') {
            this.ticketService.Create(this.ticket).then(result => {
                this.SuccessMessage = "Ticket: \""+result.ticket.title+"\" created";
                this.DismissMessage();
                this.modalRef.hide();
                this.LoadData();
            });
        } else if (this.actionToDo == 'update') {
            console.log(this.ticket);
            
            this.ticketService.Update(this.ticket).then(result => {
                this.modalRef.hide();
                this.LoadData();
            });
        }
    }

    public Edit(TicketId: number, template: any) {
        this.actionToDo = 'update';
        this.ticketService.Get(TicketId).then(result => {
            this.ticket = result.ticket;
            this.modalRef = this.modalService.show(template);
        });
    }

    public CloseTicket(ticketid: number) {
        this.ticketService.Close(ticketid).then(result => {
            if (result.ticketClosed) {
                this.SuccessMessage = "Ticket \""+result.ticket.title+"\" closed";
                this.DismissMessage();
                this.LoadData();
            }            
        });
    }

    private DismissMessage() {
        setTimeout(()=>{
            this.SuccessMessage = '';
        }, 5000);
    }
}