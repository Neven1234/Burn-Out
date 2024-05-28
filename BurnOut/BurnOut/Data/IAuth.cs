using BurnOut.DTOs;
using BurnOut.Models;

namespace BurnOut.Data
{
    public interface IAuth
    {
        Task<string> LogIn(string username,string password);
        Task<string> Register(RegisterDTO register);

        Task <ApplicationUser> GetUser(string username);
        Task<string> GetRole(ApplicationUser user);
    }
}
