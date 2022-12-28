using BackendDATN.Entity.VM.Test;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
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
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_testServ.GetAll());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                var data = _testServ.GetById(id);
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
        public IActionResult Add(TestModel testModel)
        {
            try
            {
                return Ok(_testServ.Add(testModel));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, TestModel testModel)
        {
            try
            {
                var data = _testServ.GetById(id);
                if(data != null)
                {
                    _testServ.Update(new TestVM
                    {
                        Id = id,
                        Name = testModel.Name,
                        MarkWeight = testModel.MarkWeight,
                        TestTime = testModel.TestTime,
                        Comment = testModel.Comment,
                        Mark = testModel.Mark,
                        Created_At = testModel.Created_At,
                        Updated_At = testModel.Updated_At,
                        SubjectId = testModel.SubjectId,
                        SemesterId = testModel.SemesterId,
                        DivisionId = testModel.DivisionId,
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
        public IActionResult Delete(Guid id)
        {
            try
            {
                var data = _testServ.GetById(id);
                if(data != null)
                {
                    _testServ.Delete(id);
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
