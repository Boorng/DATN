using BE.Data.Response;
using BE.Data.VM.Student;
using BE.Entity.VM.Student;

namespace BE.IServices
{
    public interface IStudentServ
    {
        Task<List<StudentVM>> GetAllAsync(string? schoolYear, string? search);

        Task<List<string>> GetAllSchoolYear();

        Task<StudentVM?> GetByAccountId(Guid accountId);

        Task<StudentVM?> GetById(string id);

        Task<string> AddAsync(StudentAdd studentAdd);

        Task<List<StudentAccount>> AddListAsync(List<StudentAdd> studentAdds);

        Task UpdateAsync(StudentVM studentVM);

        Task UploadImageAsync(string id, string avatar);

        Task DeleteAsync(string id);

        Task<CheckDataStudentResponse> CheckData(string id);

    }
}
