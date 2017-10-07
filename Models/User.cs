using Microsoft.AspNetCore.Identity;

namespace TicketingSystem.Models
{
    public class User: IdentityUser
    {
        public string Name {get; set;}
    }
}