using BackendDATN.Entity.VM.Account;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
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

        [HttpGet("page/{pageNum}")]
        public async Task<IActionResult> GetByPage([FromRoute] int pageNum = 1, [FromQuery] string? search = null)
        {
            try
            {
                return Ok(await _accountServ.GetByPageAsync(pageNum, search));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
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
                var res = _accountServ.GetByIdAsync(id);
                if(res != null)
                {
                    await _accountServ.UpdateAsync(id, Status);

                    return Ok();
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

        [HttpPut("changepassword/{id}")]
        public async Task<IActionResult> ChangePassword([FromRoute] Guid id, [FromForm] string password)
        {
            try
            {
                var res = await _accountServ.GetByIdAsync(id);
                if(res != null)
                {
                    await _accountServ.ChangePasswordAsync(id, password);

                    return Ok();
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                var data = await _accountServ.GetByIdAsync(id);
                if(data != null)
                {
                    await _accountServ.DeleteAsync(id);
                    return Ok();
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
    }
}
