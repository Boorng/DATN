using BE.Data.Response;
using BE.Entity.VM.Student;
using BE.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentServ _studentServ;

        private readonly IWebHostEnvironment _environment;

        public StudentController(IStudentServ studentServ, IWebHostEnvironment environment)
        {
            _studentServ = studentServ;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string? schoolYear, [FromQuery] string? search)
        {
            try
            {
                return Ok(await _studentServ.GetAllAsync(schoolYear, search));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("list-schoolYear")]
        public async Task<IActionResult> GetAllSchoolYear()
        {
            try
            {
                return Ok(await _studentServ.GetAllSchoolYear());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetByAccountId(Guid accountId)
        {
            try
            {
                return Ok(await _studentServ.GetByAccountId(accountId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                return Ok(await _studentServ.GetById(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(StudentAdd studentAdd)
        {
            try
            {
                
                return Ok(new MessageResponse
                {
                    Message = "Success",
                    Content = await _studentServ.AddAsync(studentAdd)
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

        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<StudentAdd> studentAdds)
        {
            try
            {
                var data = await _studentServ.AddListAsync(studentAdds);
                MessageResponse message = new MessageResponse();
                message.Message = "Success";
                message.DataContent.AddRange(data);

                return Ok(message);
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

        [HttpPost("upload-image/{id}")]
        public async Task<IActionResult> UploadImage(string id)
        {
            try
            {
                var _uploadedfiles = Request.Form.Files;
                foreach (IFormFile source in _uploadedfiles)
                {
                    string Filename = source.FileName;
                    string Filepath = GetFilePath(Filename);

                    if (!Directory.Exists(Filepath))
                    {
                        Directory.CreateDirectory(Filepath);
                    }

                    string imagepath = Filepath + "\\image.png";

                    if (System.IO.File.Exists(imagepath))
                    {
                        System.IO.File.Delete(imagepath);
                    }
                    using (FileStream stream = System.IO.File.Create(imagepath))
                    {
                        await source.CopyToAsync(stream);
                    }

                    await _studentServ.UploadImageAsync(id, GetSourcePath(Filename));
                }

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

        [HttpPut]
        public async Task<IActionResult> Update(StudentVM studentVM)
        {
            try
            {
                await _studentServ.UpdateAsync(studentVM);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _studentServ.DeleteAsync(id);
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

        [NonAction]
        private string GetFilePath(string ProductCode)
        {
            return this._environment.WebRootPath + "\\Uploads\\Student\\" + ProductCode;
        }

        [NonAction]
        private string GetSourcePath(string productcode)
        {
            string ImageUrl = string.Empty;
            string HostUrl = "https://localhost:7152";
            string Filepath = GetFilePath(productcode);
            string Imagepath = Filepath + "\\image.png";
            if (System.IO.File.Exists(Imagepath))
            {
                ImageUrl = HostUrl + "/uploads/student/" + productcode + "/image.png";
            }

            return ImageUrl;

        }

        [HttpGet("check-data/{id}")]
        public async Task<IActionResult> CheckData(string id)
        {
            try
            {
                return Ok(await _studentServ.CheckData(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
