namespace TicketingSystem.Models
{
    public static class DbInitializer
    {
        public static void Initialize(TicketingSystemContext context) 
        {
            context.Database.EnsureCreated();

            
        }
    }
}