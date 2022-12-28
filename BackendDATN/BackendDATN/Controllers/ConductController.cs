using BackendDATN.Entity.VM.Conduct;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendDATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ConductController : ControllerBase
    {
        private readonly IConductServ _conductServ;

        public ConductController(IConductServ conductServ)
        {
            _conductServ = conductServ;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_conductServ.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                var data = _conductServ.GetById(id);
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

        [HttpPost]
        public IActionResult Add(ConductModel conductModel)
        {
            try
            {
                return Ok(_conductServ.Add(conductModel));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, ConductModel conductModel)
        {
            try
            {
                var data = _conductServ.GetById(id);
                if(data != null)
                {
                    _conductServ.Update(new ConductVM
                    {
                        Id = id,
                        Mark = conductModel.Mark,
                        Comment = conductModel.Comment,
                        SemesterId = conductModel.SemesterId,
                        StudentId = conductModel.StudentId
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
                var data = _conductServ.GetById(id);
                if(data != null)
                {
                    _conductServ.Delete(id);
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
