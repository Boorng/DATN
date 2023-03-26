using BE.Data.Response;
using BE.Entity.VM.Test;
using BE.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestServ _testServ;

        public TestController(ITestServ testServ)
        {
            _testServ = testServ;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _testServ.GetAllAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("statistic/{academicYear}/{grade}")]
        public async Task<IActionResult> GetStatisticResult(string academicYear, int grade, string? classId)
        {
            try
            {
                return Ok(await _testServ.GetStatisticMark(academicYear, classId, grade));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            } 
        }

        [HttpGet("class/{classId}/{subjectId}/{semesterId}")]
        public async Task<IActionResult> GetResultStudentClass(string classId, int subjectId, int semesterId)
        {
            try
            {
                return Ok(await _testServ.GetListTestStudentInClass(classId, subjectId, semesterId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("student-result/{divisionId}/{grade}/{semesterId}")]
        public async Task<IActionResult> GetStudentResult(int divisionId, int grade, int semesterId)
        {
            try
            {
                return Ok(await _testServ.GetStudentResultAsync(divisionId, grade, semesterId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("summary/{divisionId}/{grade}/{academicYear}")]
        public async Task<IActionResult> GetSummaryResult(int divisionId, int grade, string academicYear)
        {
            try
            {
                return Ok(await _testServ.GetSummaryResultAsync(divisionId, grade, academicYear));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("check-add-mark")]
        public async Task<IActionResult> CheckAddMark(string classId, int semesterId, int subjectId)
        {
            try
            {
                return Ok(await _testServ.CheckAddMark(classId, semesterId, subjectId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(TestModel testModel)
        {
            try
            {
                await _testServ.AddAsync(testModel);
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

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<TestModel> testModels)
        {
            try
            {
                await _testServ.AddListAsync(testModels);
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
        public async Task<IActionResult> Update(TestVM testVM)
        {
            try
            {
                await _testServ.UpdateAsync(testVM);
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
                await _testServ.DeleteAsync(id);
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
        public async Task<IActionResult> DeleteByStudentId(int? divisionId, int? semesterId, int? subjectId)
        {
            try
            {
                await _testServ.DeleteById(divisionId, semesterId, subjectId);
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
