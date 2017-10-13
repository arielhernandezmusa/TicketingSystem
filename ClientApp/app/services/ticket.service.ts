import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ticket } from '../utils/ticket.interface';

@Injectable()
export class TicketService {
    
    constructor(private http: Http) { }

    public List(){
        return this.http.get('api/ticket/list')
            .toPromise()
            .then( response => response.json())
            .catch(this.handleError);
    }

    public Create(ticket: Ticket) {
        return this.http.post('api/ticket/create', ticket)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    public Close(ticketid: number) {
        return this.http.post('api/ticket/close', {TicketId: ticketid})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public Get(ticketid: number) {
        return this.http.get('api/ticket/'+ticketid)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public Update(ticket: Ticket) {
        return this.http.put('api/ticket/update', ticket)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}