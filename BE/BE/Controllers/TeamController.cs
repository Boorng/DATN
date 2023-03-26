using BE.Data.Response;
using BE.Entity.VM.Group;
using BE.IServices;
using BE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace BE.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamServ _teamServ;

        public TeamController(ITeamServ teamServ)
        {
            _teamServ = teamServ;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _teamServ.GetAllAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(TeamModel groupModel)
        {
            try
            {
                await _teamServ.AddAsync(groupModel);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(TeamVM teamVM)
        {
            try
            {
                await _teamServ.UpdateAsync(teamVM);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _teamServ.DeleteAsync(id);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }
    }
}
