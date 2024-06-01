using BurnOut.DTOs;
using BurnOut.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BurnOut.Data
{
    public class AuthService : IAuth
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager,
            IConfiguration configuration) 
        {
           _userManager = userManager;
           _roleManager = roleManager;
           _configuration = configuration;
        }
        public async Task<string> LogIn(string username, string password)
        {
            var user=await _userManager.FindByNameAsync(username);
            if (user != null && await _userManager.CheckPasswordAsync(user, password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim("name",user.UserName),
                    new Claim("userId",user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                var Roles = await _userManager.GetRolesAsync(user);
                foreach (var role in Roles)
                {
                    authClaims.Add(new Claim("Role", role));
                }
                var jwtToken = getToken(authClaims);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return token;
            }
            return null;
        }

        public async Task<string> Register(RegisterDTO register)
        {
          
            if(await UserExist(register.Username,register.Email))
            {
                return "User already exist";
            }
            ApplicationUser NewUser = new()
            {
                UserName = register.Username,
                Email = register.Email,
                PhoneNumber = register.PhoneNumber,
                License = register.License,
                CarType=register.CarType,
                Gender= register.Gender,
                Age=register.Age,
                UserID=register.UserID,
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            if (await _roleManager.RoleExistsAsync(register.userRole))
            {
                var result = await _userManager.CreateAsync(NewUser, register.Password);
                if (!result.Succeeded)
                {
                    return result.Errors.First().Description;
                }
                await _userManager.AddToRoleAsync(NewUser, register.userRole);
                return "user created successgully";
            }
            else
                return "this role doesn't exist";

        }

        public async Task<ApplicationUser> GetUser(string userId)
        {
            var user=await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
           
            return user;
        }

        public async Task<string> GetRole(ApplicationUser user)
        {
            var Roles = await _userManager.GetRolesAsync(user);
            return Roles[0];
        }

        //helper function
        private JwtSecurityToken getToken(List<Claim> authClims)
        {
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: this._configuration["JWT:ValidIssuer"],
                audience: this._configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                );
            return token;

        }
        public async Task< bool> UserExist(string username,string email)
        {
            var usernameExist = await _userManager.FindByNameAsync(username);
            var emailExist=await _userManager.FindByEmailAsync(email);
            if(usernameExist!= null || emailExist != null)
            {
                return true;
            }
            return false;
        }

       
    }
}
