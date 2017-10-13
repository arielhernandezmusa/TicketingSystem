using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TicketingSystem.Models;

namespace TicketingSystem.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        private readonly TicketingSystemContext db;

        public class TicketIdWrapper {
            public int TicketId {get; set;}
        }
        public TicketController(TicketingSystemContext context) 
        {
            this.db = context;
        }
        [HttpGet("[action]")]
        [AllowAnonymous]
        public IEnumerable<Ticket>  List()
        {
            var users = this.db.Users.ToList<User>();
            var tickets = this.db.Tickes.ToList<Ticket>();

            return tickets.ToArray();
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Create([FromBody]Ticket ticket)
        {

            ticket.Created = DateTime.Today;

            this.db.Tickes.Add(ticket);
            this.db.SaveChanges();

            return CreatedAtAction("TicketCreated", new {TicketCreated = true, ticket = ticket});
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Close([FromBody]TicketIdWrapper ticketIdWrapper) {

            
            var ticket = this.db.Tickes.Where(t => t.ID == ticketIdWrapper.TicketId).FirstOrDefault();
            ticket.Status = false;
            this.db.Tickes.Update(ticket);
            this.db.SaveChanges();

            return CreatedAtAction("TicketClosed", new {
                TicketClosed = true, 
                ticket = ticket
            });
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {

            this.db.Users.ToList();
            var ticket = this.db.Tickes.Where(t => t.ID == id).FirstOrDefault();

            return CreatedAtAction("Ticket", new {ticket});
        }

        [HttpPut("[action]")]
        [AllowAnonymous]
        public IActionResult Update([FromBody]Ticket ticket) {
            this.db.Users.ToList();
            var ticketToUpdate = this.db.Tickes.Where(t => t.ID == ticket.ID).FirstOrDefault();

            ticketToUpdate.Title = ticket.Title;
            ticketToUpdate.Body = ticket.Body;
            ticketToUpdate.Author = this.db.Users.Where(u => u.Id == ticket.AuthorID).FirstOrDefault();
            ticketToUpdate.Assignee = this.db.Users.Where(u => u.Id == ticket.AssigneeID).FirstOrDefault();
            

            this.db.Tickes.Update(ticketToUpdate);
            this.db.SaveChanges();
            
            return CreatedAtAction("TicketCreated", new {});
        }

        [HttpGet("[action]/{id}")]
        public IActionResult ByUser(string id) {

            this.db.Users.ToList();
            var tickets = this.db.Tickes.Where(t => t.AssigneeID == id).ToList();

            return CreatedAtAction("TicketsAssignedToAnUse", new {tickets});
        }
       
    }

    

    
}