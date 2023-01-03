using BackendDATN.Entity.VM.StudentClass;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StudentClassController : ControllerBase
    {
        private readonly IStudentClassServ _studentClassServ;

        public StudentClassController(IStudentClassServ studentClassServ)
        {
            _studentClassServ = studentClassServ;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_studentClassServ.GetAll());
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
                var data = _studentClassServ.GetById(id);

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
        public async Task<IActionResult> Add(StudentClassModel studentClassModel)
        {
            try
            {
                return Ok(await _studentClassServ.AddAsync(studentClassModel));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<StudentClassModel> studentClassModels)
        {
            try
            {
                return Ok(await _studentClassServ.AddListAsync(studentClassModels));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, StudentClassModel studentClassModel)
        {
            try
            {
                var data = _studentClassServ.GetById(id);
                if(data != null)
                {
                    await _studentClassServ.UpdateAsync(new StudentClassVM
                    {
                        Id = id,
                        ClassId = studentClassModel.ClassId,
                        StudentId = studentClassModel.StudentId
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var data = _studentClassServ.GetById(id);
                if (data != null)
                {
                    await _studentClassServ.DeleteAsync(id);
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
