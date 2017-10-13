using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TicketingSystem.Models
{
    public static class DbInitializer
    {

        public static void InitializeAsync(TicketingSystemContext context) 
        {
            context.Database.EnsureCreated();
         
            if (!context.Users.Any()) 
            {

         
         
                var roleStore = new RoleStore<IdentityRole>(context);
                var roleAdmin = new IdentityRole{ Name = "Administrator", NormalizedName = "Administrator"};
            
                roleStore.CreateAsync(roleAdmin);

           
                var userAdmin = new User { 
                    Name = "Administrator", 
                    Email = "admin@domain.com",
                    UserName = "admin@domain.com",
                };            

                var password = new PasswordHasher<User>();
                var hashed = password.HashPassword(userAdmin, "admin");
                userAdmin.PasswordHash = hashed;
                
                var userStore = new UserStore<User>(context);
                userStore.CreateAsync(userAdmin);

                userStore.AddToRoleAsync(userAdmin, "Administrator");
 
                

               var t1 = new Ticket {
                    Title = "Ticket 1",
                    Body = "Ticet 1 Body 1",
                    Author = context.Users.ToList()[0],
                    Assignee = context.Users.ToList()[0],
                    Created = DateTime.Today,
                    Status = true
                };

                context.Tickes.Add(t1);

            
               context.SaveChanges();  
            }
        }
    }
}