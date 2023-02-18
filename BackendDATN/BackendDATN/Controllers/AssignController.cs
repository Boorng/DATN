using BackendDATN.Data.Response;
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

        [HttpGet("{grade}/{subjectId}")]
        public async Task<IActionResult> GetAll(int grade, int subjectId, int? semesterId, string? search = null)
        {
            try
            {
                return Ok(await _assignServ.GetAllAsync(grade, subjectId, semesterId, search));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("teacher/{teacherId}")]
        public async Task<IActionResult> GetByTeacherId(string teacherId, int semesterId)
        {
            try
            {
                return Ok(await _assignServ.GetByTeacherId(teacherId, semesterId));
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
                await _assignServ.AddAsync(assignModel);
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

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<AssignModel> assignModels)
        {
            try
            {
                await _assignServ.AddListAsync(assignModels);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(AssignVM assignVM)
        {
            try
            {
                await _assignServ.UpdateAsync(assignVM);
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

        [HttpPut("{id}/{classId}")]
        public async Task<IActionResult> UpdateClassAssign(Guid id, string classId)
        {
            try
            {
                await _assignServ.UpdateClassAssign(id, classId);
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
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _assignServ.DeleteAsync(id);
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

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteById(string? teacherId, string? classId, int? subjectId, int? semesterId)
        {
            try
            {
                await _assignServ.DeleteById(teacherId, classId, subjectId, semesterId);
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
