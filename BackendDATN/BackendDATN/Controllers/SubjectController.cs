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
                return Ok(await _subjectServ.GetAllByGrade(grade));
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
                var data = _subjectServ.GetById(id);
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
        public IActionResult Add(SubjectModel subjectModel)
        {
            try
            {
                return Ok(_subjectServ.Add(subjectModel));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, SubjectModel subjectModel)
        {
            try
            {
                var data = _subjectServ.GetById(id);
                if(data != null)
                {
                    _subjectServ.Update(new SubjectVM
                    {
                        Id = id,
                        Name = subjectModel.Name,
                        Grade = subjectModel.Grade,
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
                var data = _subjectServ.GetById(id);
                if(data != null)
                {
                    _subjectServ.Delete(id);
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
