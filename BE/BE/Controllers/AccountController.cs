using BE.Data.Response;
using BE.Data.VM.Account;
using BE.Entity.VM.Account;
using BE.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace BE.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountServ _accountServ;

        public AccountController(IAccountServ accountServ)
        {
            _accountServ = accountServ;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _accountServ.GetAllAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            try
            {
                var data = await _accountServ.GetByIdAsync(id);
                if(data != null)
                {
                    return Ok(data);
                } 
                else
                {
                    return NotFound();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromForm] bool Status)
        {
            try
            {
                await _accountServ.UpdateAsync(id, Status);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
                
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpGet("check-password/{id}")]
        public async Task<IActionResult> CheckPassword(Guid id, string password)
        {
            try
            {
                return Ok(await _accountServ.CheckPassword(id, password));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(AccountPW accountPW)
        {
            try
            {
                await _accountServ.ChangePasswordAsync(accountPW.Id, accountPW.Password);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                await _accountServ.DeleteAsync(id);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }
    }
}
