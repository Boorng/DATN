using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Subject;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectServ _subjectServ;

        public SubjectController(ISubjectServ subjectServ)
        {
            _subjectServ = subjectServ;
        }

        [HttpGet("grade/{grade}")] 
        public async Task<IActionResult> GetAllByGrade(int grade)
        {
            try
            {
                return Ok(await _subjectServ.GetAllByGradeAsync(grade));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(SubjectModel subjectModel)
        {
            try
            {
                await _subjectServ.AddAsync(subjectModel);
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
        public async Task<IActionResult> Update(SubjectVM subjectVM)
        {
            try
            {
                
                await _subjectServ.UpdateAsync(subjectVM);
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
                await _subjectServ.DeleteAsync(id);
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
