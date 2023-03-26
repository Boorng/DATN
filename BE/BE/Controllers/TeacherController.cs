using BE.Data.Response;
using BE.Data.VM.Teacher;
using BE.Entity.VM.Teacher;
using BE.IServices;
using BE.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherServ _teacherServ;

        private readonly IWebHostEnvironment _environment;

        public TeacherController(ITeacherServ teacherServ, IWebHostEnvironment environment)
        {
            _teacherServ = teacherServ;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string? search, int? teamId)
        {
            try
            {
                return Ok(await _teacherServ.GetAllAsync(search, teamId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("no-leave")]
        public async Task<IActionResult> GetAllNoLeave(string? search, int? teamId)
        {
            try
            {
                return Ok(await _teacherServ.GetAllNoLeaveAsync(search, teamId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetByAccountId(Guid accountId)
        {
            try
            {
                return Ok(await _teacherServ.GetByAccountId(accountId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("manage-team/{teamId}")]
        public async Task<IActionResult> GetAllManageTeam(int teamId)
        {
            try
            {
                return Ok(await _teacherServ.GetAllManage(teamId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("team/{teamId}")]
        public async Task<IActionResult> GetTeamTeacher(int teamId)
        {
            try
            {
                return Ok(await _teacherServ.GetTeam(teamId));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("update-manage-team")]
        public async Task<IActionResult> UpdateManageTeam(TeacherManage teacherManage)
        {
            try
            {
                await _teacherServ.UpdateManageTeam(teacherManage);
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

        [HttpPost("delete-team/{teacherId}")]
        public async Task<IActionResult> DeleteTeacherTeam(string teacherId)
        {
            try
            {
                await _teacherServ.UpdateTeacherTeam(teacherId);
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


        [HttpPost]
        public async Task<IActionResult> Add(TeacherAdd teacherAdd)
        {
            try
            {
                
                return Ok(new MessageResponse
                {
                    Message = "Success",
                    Content = await _teacherServ.AddAsync(teacherAdd)
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

                    await _teacherServ.UploadImageAsync(id, GetSourcePath(Filename));
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

        [NonAction]
        private string GetFilePath(string ProductCode)
        {
            return this._environment.WebRootPath + "\\Uploads\\Teacher\\" + ProductCode;
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
                ImageUrl = HostUrl + "/uploads/teacher/" + productcode + "/image.png";
            }

            return ImageUrl;

        }


        [HttpPost("add-list")]
        public async Task<IActionResult> AddList(List<TeacherAdd> teacherAdds)
        {
            try
            {
                var data = await _teacherServ.AddListAsync(teacherAdds);
                MessageResponse message = new MessageResponse();
                message.Message = "Success";
                message.DataContent.AddRange(data);
                return Ok(message);
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
        public async Task<IActionResult> Update(TeacherVM teacherVM)
        {
            try
            {
                await _teacherServ.UpdateAsync(teacherVM);
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

        [HttpPut("update-team/{teamId}")]
        public async Task<IActionResult> UpdateTeam(int teamId, List<string>? teacherIds)
        {
            try
            {
                await _teacherServ.UpdateTeam(teamId, teacherIds);
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
                await _teacherServ.DeleteAsync(id);
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

        [HttpGet("check-data/{id}")]
        public async Task<IActionResult> CheckData(string id)
        {
            try
            {
                return Ok(await _teacherServ.CheckData(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("update-seennotify/{teacherId}")]
        public async Task<IActionResult> UpdateSeenNotification(string teacherId)
        {
            try
            {
                await _teacherServ.UpdateSeenNotification(teacherId);
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
