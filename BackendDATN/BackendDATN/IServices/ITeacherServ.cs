using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Teacher;

namespace BackendDATN.IServices
{
    public interface ITeacherServ
    {
        Task<List<TeacherVM>> GetAllAsync(string? search);

        Task<List<TeacherVM>> GetAllNoLeaveAsync(string? search);

        Task AddAsync(TeacherAdd teacherAdd);

        Task AddListAsync(List<TeacherAdd> teacherAdds);

        Task UpdateAsync(TeacherVM teacherVM);

        Task UpdateStatus(string id, int status);

        Task DeleteAsync(string id);

        Task UploadImageAsync(string id, string avatar);
    }
}
