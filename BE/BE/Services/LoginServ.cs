using BE.Data;
using BE.Data.Login;
using BE.Data.Response;
using BE.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE.Services
{
    public class LoginServ : ILoginServ
    {
        private readonly BackendContext _context;
        private readonly AppSettings _appSettings;


        public LoginServ(BackendContext context, IOptionsMonitor<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.CurrentValue;
        }

        public async Task<TokenResponse> Validate(LoginModel loginModel)
        {
            var user = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == loginModel.Email && a.Password == loginModel.Password);

            if (user == null)
            {
                return new TokenResponse
                {
                    Message = "Invalid email/password"
                };
            }
            else
            {
                var check = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == loginModel.Email && a.Password == loginModel.Password && a.Role == loginModel.Role);
                if(check == null)
                {
                    return new TokenResponse
                    {
                        Message = "No permission"
                    };
                }
                else
                {
                    return new TokenResponse
                    {
                        Message = "Success",
                        Token = GeneratorToken(check)
                    };
                }
               
            }
        }

        private string GeneratorToken(Account account)
        {
            var jwtTokenHandle = new JwtSecurityTokenHandler();

            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, account.Email),
                    new Claim("Id", account.IdAccount.ToString()),
                    new Claim("Role", account.Role.ToString()),
                    new Claim("TokenId", Guid.NewGuid().ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = jwtTokenHandle.CreateToken(tokenDescription);

            var accessToken = jwtTokenHandle.WriteToken(token);

            return accessToken;

        }

    }
}
