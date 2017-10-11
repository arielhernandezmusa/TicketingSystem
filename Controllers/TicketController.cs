using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketingSystem.Models;

namespace TicketingSystem.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        private readonly TicketingSystemContext db;
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
    }
}