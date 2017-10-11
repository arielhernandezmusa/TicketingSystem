using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace TicketingSystem.Models
{
    public class User: IdentityUser
    {
        public string Name {get; set;}
        [InverseProperty("Author")]
        [JsonIgnore]
        public List<Ticket> TicketsOwner { get; set; }
        [InverseProperty("Assignee")]
        [JsonIgnore]
        public List<Ticket> TicketsAssigne { get; set; }
    }
}