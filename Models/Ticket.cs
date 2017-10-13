using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketingSystem.Models
{
    public class Ticket
    {
        [Key]
        public int ID {get;set;}
        public string Title {get; set;}
        public string Body {get; set;}
        public bool Status {get; set;}
        public string AuthorID {get; set;}
        public virtual User Author {get; set;}
        public string AssigneeID {get;set;}
        public virtual User Assignee {get; set;}
        public DateTime Created {get; set;}        

    }
}