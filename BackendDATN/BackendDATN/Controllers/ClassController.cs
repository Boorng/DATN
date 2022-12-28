using BackendDATN.Entity.VM.Class;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassServ _classServ;

        public ClassController(IClassServ classServ)
        {
            _classServ = classServ;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_classServ.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var data = _classServ.GetById(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("page/{pageIndex}")]
        public async Task<IActionResult> GetByPage(string? search, int grade, int pageIndex = 1)
        {
            try
            {
                return Ok(await _classServ.GetByPageAsync(pageIndex, grade, search));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(ClassModel classModel)
        {
            try
            {
                return Ok(await _classServ.AddAsync(classModel));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ClassModel classModel)
        {
            try
            {
                var data = _classServ.GetById(id);
                if (data != null)
                {
                    await _classServ.UpdateAsync(new ClassVM
                    {
                        Id = id,
                        Name = classModel.Name,
                        AcademicYear = classModel.AcademicYear,
                        Grade = classModel.Grade,
                        HeaderTeacherId = classModel.HeaderTeacherId,
                    });
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var data = _classServ.GetById(id);
                if(data != null)
                {
                    await _classServ.DeleteAsync(id);
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
    }
}
