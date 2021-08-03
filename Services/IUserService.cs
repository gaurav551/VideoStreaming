using System.Security.Claims;
using System.Threading.Tasks;
using JWT.DEMO.Models;

namespace JWT.DEMO.Services
{
    public interface IUserService
    {
        Task<(string,bool)> RegisterAsync(RegisterModel model);
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<AuthenticationModel> RefreshTokenAsync(string token);
        Task<ApplicationUser> GetUser(string userid);




        
    }
}