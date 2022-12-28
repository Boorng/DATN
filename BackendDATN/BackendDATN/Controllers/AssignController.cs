using BackendDATN.Entity.VM.Assign;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AssignController : ControllerBase
    {
        private readonly IAssignServ _assignServ;

        public AssignController(IAssignServ assignServ)
        {
            _assignServ = assignServ;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _assignServ.GetAllAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var data = await _assignServ.GetByIdAsync(id);
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

        [HttpGet("page/{pageIndex}")]
        public async Task<IActionResult> GetByPage(int grade, int subjectId, int semesterId, string? search, int pageIndex = 1)
        {
            try
            {
                return Ok(await _assignServ.GetByPageAsync(grade, subjectId, semesterId, search, pageIndex));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AssignModel assignModel)
        {
            try
            {
                return Ok(await _assignServ.AddAsync(assignModel));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, AssignModel assignModel)
        {
            try
            {
                var data = await _assignServ.GetByIdAsync(id);
                if(data != null)
                {
                    await _assignServ.UpdateAsync(new AssignVM
                    {
                        Id = id,
                        SemesterId = data.SemesterId,
                        ClassId = data.ClassId,
                        SubjectId = data.SubjectId,
                        TeacherId = data.TeacherId,
                    });
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
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var data = await _assignServ.GetByIdAsync(id);
                if (data != null)
                {
                    await _assignServ.DeleteAsync(id);
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
