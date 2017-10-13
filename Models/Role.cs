using Microsoft.AspNetCore.Identity;

namespace TicketingSystem.Models
{
    public class Role : IdentityRole
    {
        public Role(string name) :base(name){}
    }
}