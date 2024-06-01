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
        public async Task<IActionResult> Login(LogInDTO logInDTO)
        {
            var Token = await _auth.LogIn(logInDTO.Username, logInDTO.Password);
            if(Token == null)
            {
                return BadRequest("Username or password are wrong");
            }
            return Ok(new
            {
                token = Token
            });
        }
    }
}
