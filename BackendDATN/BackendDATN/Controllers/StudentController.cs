using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Student;
using BackendDATN.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace BackendDATN.Controllers
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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _studentServ.GetAllAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("page/{pageIndex}")]
        public async Task<IActionResult> GetByPage([FromRoute] int pageIndex = 1, [FromQuery] string? search = null)
        {
            try
            {
                return Ok(await _studentServ.GetByPageAsync(pageIndex, search));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(StudentAdd studentAdd)
        {
            try
            {
                await _studentServ.AddAsync(studentAdd);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
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
                await _studentServ.AddListAsync(studentAdds);
                return Ok(new MessageResponse
                {
                    Message = "Success"
                });
            }
            catch (Exception e)
            {
                return BadRequest(new MessageResponse
                {
                    Message = "Fail"
                });
            }
        }

        [HttpPost("upload-image/{id}")]
        public async Task<IActionResult> UploadImage(string id)
        {
            bool Results = false;
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
                        Results = true;
                    }

                    await _studentServ.UploadImageAsync(id, GetSourcePath(Filename));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Ok(Results);
        }

        [HttpPut]
        public async Task<IActionResult> Update(StudentVM studentVM)
        {
            try
            {
                var data = await _studentServ.GetByIdAsync(studentVM.Id);
                if (data != null)
                {
                    await _studentServ.UpdateAsync(studentVM);
                    return Ok(new MessageResponse
                    {
                        Message = "Success"
                    });
                }
                else
                {
                    return NotFound(new MessageResponse
                    {
                        Message = "Not Found"
                    });
                }
            }
            catch (Exception e)
            {
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
                var data = await _studentServ.GetByIdAsync(id);
                if (data != null)
                {
                    await _studentServ.DeleteAsync(id);
                    return Ok(new MessageResponse
                    {
                        Message = "Success"
                    });
                }
                else
                {
                    return NotFound(new MessageResponse
                    {
                        Message = "Not Found"
                    });
                }
            }
            catch (Exception e)
            {
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
            string HostUrl = "https://localhost:7267/";
            string Filepath = GetFilePath(productcode);
            string Imagepath = Filepath + "\\image.png";
            if (System.IO.File.Exists(Imagepath))
            {
                ImageUrl = HostUrl + "/uploads/student/" + productcode + "/image.png";
            }

            return ImageUrl;

        }
    }
}
