using BackendDATN.Data;
using BackendDATN.Data.Login;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginServ _loginServ;

        public LoginController(ILoginServ loginServ, IOptionsMonitor<AppSettings> appSettings)
        {
            _loginServ = loginServ;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Validate(LoginModel loginModel)
        {
           try
           {
                return Ok(await _loginServ.Validate(loginModel));
           }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
