export interface Ticket {   
    id: number; 
    title: string;
    body: string;
    status: boolean;
    authorid: string;
    assigneeid: string;
    created: Date;
}