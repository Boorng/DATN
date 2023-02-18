using BackendDATN.Data.Response;
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
        public async Task<IActionResult> GetAll(int semesterId, string? classId, int? grade)
        {
            try
            {
                return Ok(await _conductServ.GetAllAsync(classId, grade, semesterId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("student/{studentId}/{semesterId}")]
        public async Task<IActionResult> GetConductById(string studentId, int semesterId)
        {
            try
            {
                return Ok(await _conductServ.GetByIdAsync(studentId, semesterId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConductModel conductModel)
        {
            try
            {
                await _conductServ.AddAsync(conductModel);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                }); ;
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
        public async Task<IActionResult> Update(ConductVM conductVM)
        {
            try
            {
                await _conductServ.UpdateAsync(conductVM);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                }); ;  
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
                await _conductServ.DeleteAsync(id);
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
        public async Task<IActionResult> DeleteById(string? studentId, int? semesterId)
        {
            try
            {
                await _conductServ.DeleteById(studentId, semesterId);
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
