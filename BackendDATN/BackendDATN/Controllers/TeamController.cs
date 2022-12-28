using BackendDATN.Entity.VM.Group;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamServ _groupServ;

        public TeamController(ITeamServ groupServ)
        {
            _groupServ = groupServ;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_groupServ.GetAll());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var data = _groupServ.GetById(id);
                if(data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Add(TeamModel groupModel)
        {
            try
            {
                return Ok(_groupServ.Add(groupModel));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TeamModel groupModel)
        {
            try
            {
                var data = _groupServ.GetById(id);
                if(data != null)
                {
                    _groupServ.Update(new TeamVM
                    {
                        Id = id,
                        Name = groupModel.Name,
                        Notification = groupModel.Notification,
                    });
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var data = _groupServ.GetById(id);
                if(data != null)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
