using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Teacher;

namespace BackendDATN.IServices
{
    public interface ITeacherServ
    {
        Task<List<TeacherVM>> GetAllAsync();

        Task<TeacherResponse> GetByPageAsync(int page, string? search);

        Task<TeacherVM?> GetByIdAsync(string id);

        Task<TeacherVM> AddAsync(TeacherAdd teacherAdd);

        Task<List<TeacherVM>> AddListAsync(List<TeacherAdd> teacherAdds);

        Task UpdateAsync(string id, TeacherModel teacherModel);

        Task DeleteAsync(string id);

        Task UploadImageAsync(string id, string avatar);
    }
}
