using System;
using System.ComponentModel.DataAnnotations;

namespace TicketingSystem.Models
{
    public class Ticket
    {
        [Key]
        public int ID {get;set;}
        public string Title {get; set;}
        public string Body {get; set;}
        public int AuthorId {get;set;}
        public virtual User Author {get; set;}
        public int AssigneeId {get; set;}
        public virtual User Assignee {get; set;}
        public DateTime Created {get; set;}
        
    }
}