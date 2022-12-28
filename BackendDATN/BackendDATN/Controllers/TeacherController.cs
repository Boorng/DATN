using BackendDATN.Entity.VM.Teacher;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _teacherServ.GetAllAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Add(TeacherAdd teacherAdd)
        {
            try
            {
                return Ok(await _teacherServ.AddAsync(teacherAdd));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<TeacherAdd> teacherAdds)
        {
            try
            {
                return Ok(await _teacherServ.AddListAsync(teacherAdds));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, TeacherModel teacherModel)
        {
            try
            {
                var data = await _teacherServ.GetByIdAsync(id);
                if (data != null)
                {
                    await _teacherServ.UpdateAsync(id, teacherModel);
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
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var data = await _teacherServ.GetByIdAsync(id);
                if (data != null)
                {
                    await _teacherServ.DeleteAsync(id);
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
