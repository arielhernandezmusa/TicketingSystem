using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TicketingSystem.Models
{
    public class TicketingSystemContext : IdentityDbContext<User>
    {
        public TicketingSystemContext(DbContextOptions<TicketingSystemContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickes { get;set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}