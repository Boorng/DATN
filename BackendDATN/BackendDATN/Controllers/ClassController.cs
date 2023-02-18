using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Class;
using BackendDATN.IServices;
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
        public async Task<IActionResult> GetAll(int? grade, string? search)
        {
            try
            {
                return Ok(await _classServ.GetAll(search, grade));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("header-teacher/{headerTeacherId}")]
        public async Task<IActionResult> GetByHeaderTeacherId(string headerTeacherId, string? academicYear)
        {
            try
            {
                return Ok(await _classServ.GetByHeaderTeacherId(headerTeacherId, academicYear));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("teacher-info/{classId}")]
        public async Task<IActionResult> GetTeacherByClassId(string classId)
        {
            try
            {
                return Ok(await _classServ.GetTeacherByClassId(classId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("check-data/{classId}")]
        public async Task<IActionResult> CheckData(string classId)
        {
            try
            {
                return Ok(await _classServ.CheckData(classId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("check-year/{academicYear}")]
        public async Task<IActionResult> CheckYear(string academicYear)
        {
            try
            {
                return Ok(await _classServ.CheckYear(academicYear));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(ClassVM classVM)
        {
            try
            {
                await _classServ.AddAsync(classVM);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ClassVM classVM)
        {
            try
            {
                await _classServ.UpdateAsync(classVM);

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _classServ.DeleteAsync(id);
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
    }
}