using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using JWT.DEMO.Models;
using JWT.DEMO.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JWT.DEMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> userManager;
        public UserController(IUserService userService, UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(RegisterModel model)
        {

            var result = await _userService.RegisterAsync(model);
            System.Console.WriteLine(result);
            if (result.Item2)
            {
                var token = await _userService.GetTokenAsync(new TokenRequestModel() { Email = model.Email, Password = model.Password });
                SetRefreshTokenInCookie(token.RefreshToken);
                return Json(new { message = result.Item1, status = result.Item2, token = token.Token, email = model.Email });

            }
            return Json(new { message = result.Item1, status = result.Item2, token = "", email = "" });
        }
        [HttpPost("token")]
        public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
        {
            var result = await _userService.GetTokenAsync(model);
            if(result.IsAuthenticated){
            SetRefreshTokenInCookie(result.RefreshToken);
            }
            return Ok(result);
        }
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
        {
            var result = await _userService.AddRoleAsync(model);
            return Ok(result);
        }
        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(10),
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = await _userService.RefreshTokenAsync(refreshToken);
            if (!string.IsNullOrEmpty(response.RefreshToken))
                SetRefreshTokenInCookie(response.RefreshToken);
            return Ok(response);
        }
        [Route("getuser")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
            var header = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
             var userIdFromClamsInJwt = User.FindFirst("uid")?.Value;
             var user = await _userService.GetUser(userIdFromClamsInJwt);

            System.Console.WriteLine(header);
            return Json(user);
        }
    }
}