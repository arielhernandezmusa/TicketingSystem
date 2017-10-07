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
        public async Task<IActionResult> Register([FromBody]User user) {

            var result = await this.userManager.CreateAsync(user, user.PasswordHash);

            var users = this.db.Users.ToList<User>();

            return CreatedAtAction("UserRegistered", new {id = 1}, user);
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]UserViewModel userViewModel)
        {
            var result = await this.signInManager.PasswordSignInAsync(userViewModel.Email, userViewModel.Password, false, false);

            return CreatedAtAction("LoggedIn", new {id=1}, userViewModel);
        }

    }
}