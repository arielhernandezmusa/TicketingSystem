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
    public class UserController : Controller
    {

        private readonly TicketingSystemContext db;
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;

        public UserController(TicketingSystemContext context, UserManager<User> userManager, SignInManager<User> signInManager) 
        {
            this.db = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]UserViewModel userViewModel) {

            var user = new User {Name = userViewModel.Name, Email = userViewModel.Email, UserName = userViewModel.Email };

            var result = await this.userManager.CreateAsync(user, userViewModel.Password);

            return CreatedAtAction("UserRegistered", new { UserRegistered = true});
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Login([FromBody]UserViewModel userViewModel)
        {
            var u = this.db.Users.Where(user => user.UserName == userViewModel.Email).FirstOrDefault();

            if (u == null) {
                return CreatedAtAction("SignIn", new {userSignedIn = false});
            }

            var password = new PasswordHasher<User>();
            PasswordVerificationResult result = password.VerifyHashedPassword(u, u.PasswordHash, userViewModel.Password);
            if (result.ToString().Equals("Failed")) 
            {
                return CreatedAtAction("SignIn", new {userSignedIn = false}); 
            }


            return CreatedAtAction("SignIn", new {userSignedIn = true, user = u});
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public IEnumerable<User>  List()
         {
             var users = this.db.Users.ToList<User>();
            
             return users.ToArray();
         }


    }
}