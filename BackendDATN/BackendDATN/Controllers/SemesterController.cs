using BackendDATN.Entity.VM.Semester;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {
        private readonly ISemesterServ _semesterServ;

        public SemesterController(ISemesterServ semesterServ)
        {
            _semesterServ = semesterServ;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_semesterServ.GetAll());
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
                var data = _semesterServ.GetById(id);
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
        public IActionResult Add(SemesterModel semesterModel)
        {
            try
            {
                return Ok(_semesterServ.Add(semesterModel));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, SemesterModel semesterModel)
        {
            try
            {
                var data = _semesterServ.GetById(id);
                if (data != null)
                {
                    _semesterServ.Update(new SemesterVM
                    {
                        Id = id,
                        Name = semesterModel.Name,
                        SchoolYear = semesterModel.SchoolYear,
                        TimeStart = semesterModel.TimeStart,
                        TimeEnd = semesterModel.TimeEnd,
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
                var data = _semesterServ.GetById(id);
                if(data != null)
                {
                    _semesterServ.Delete(id);
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
