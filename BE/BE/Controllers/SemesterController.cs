using BE.Data.Response;
using BE.Entity.VM.Semester;
using BE.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace BE.Controllers
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
        public async Task<IActionResult> GetAll(string? academicYear)
        {
            try
            {
                return Ok(await _semesterServ.GetAllAsync(academicYear));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("academicYear/{semesterId}")]
        public async Task<IActionResult> GetAcademicYear(int semesterId)
        {
            try
            {
                return Ok(await _semesterServ.GetAcademicYear(semesterId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        [HttpGet("check-data/{semesterId}")]
        public async Task<IActionResult> CheckData(int semesterId)
        {
            try
            {
                return Ok(await _semesterServ.CheckData(semesterId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(SemesterModel semesterModel)
        {
            try
            {
                await _semesterServ.AddAsync(semesterModel);
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
        public async Task<IActionResult> Update(SemesterVM semesterVM)
        {
            try
            {
                await _semesterServ.UpdateAsync(semesterVM);
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
                await _semesterServ.DeleteAsync(id);
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
