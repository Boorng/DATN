using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Teacher;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherServ _teacherServ;

        public TeacherController(ITeacherServ teacherServ)
        {
            _teacherServ = teacherServ;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string? search)
        {
            try
            {
                return Ok(await _teacherServ.GetAllAsync(search));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("no-leave")]
        public async Task<IActionResult> GetAllNoLeave(string? search)
        {
            try
            {
                return Ok(await _teacherServ.GetAllNoLeaveAsync(search));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Add(TeacherAdd teacherAdd)
        {
            try
            {
                await _teacherServ.AddAsync(teacherAdd);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<TeacherAdd> teacherAdds)
        {
            try
            {
                await _teacherServ.AddListAsync(teacherAdds);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(TeacherVM teacherVM)
        {
            try
            {
                await _teacherServ.UpdateAsync(teacherVM);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });

            }
            catch (Exception e)
            {
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(string id, int status)
        {
            try
            {
                await _teacherServ.UpdateStatus(id, status);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _teacherServ.DeleteAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
