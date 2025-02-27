using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT.DEMO.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SecuredController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSecuredData()
        {
            return Ok("This Secured Data is available only for Authenticated Users.");
        }
        [HttpPost]
        [Authorize(Roles ="Administrator")]
        public IActionResult PostSecuredData()
        {
            return Ok("This Secured Data is available only for Authenticated Users.");
        }
      
    }
    
}