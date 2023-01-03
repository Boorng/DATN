using BackendDATN.Data.Response;
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
        public async Task<IActionResult> GetAll(int grade, string? search)
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

        [HttpPost]
        public async Task<IActionResult> AddAsync(ClassModel classModel)
        {
            try
            {
                await _classServ.AddAsync(classModel);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ClassModel classModel)
        {
            try
            { 
                await _classServ.UpdateAsync(new ClassVM
                {
                    Id = id,
                    Name = classModel.Name,
                    AcademicYear = classModel.AcademicYear,
                    Grade = classModel.Grade,
                    HeaderTeacherId = classModel.HeaderTeacherId,
                });

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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _classServ.DeleteAsync(id);
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
    }
}
