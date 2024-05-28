using BurnOut.Data;
using BurnOut.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BurnOut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _auth;

        public AuthController(IAuth auth)
        {
            _auth = auth;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            return Ok(await _auth.Register(registerDTO));
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(string username,string password)
        {
            return Ok(await _auth.LogIn(username, password));
        }
    }
}
