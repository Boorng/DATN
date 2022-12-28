using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Student;

namespace BackendDATN.IServices
{
    public interface IStudentServ
    {
        Task<List<StudentVM>> GetAllAsync();

        Task<StudentResponse> GetByPageAsync(int page, string? search);

        Task<StudentVM?> GetByIdAsync(string id);

        Task AddAsync(StudentAdd studentAdd);

        Task AddListAsync(List<StudentAdd> studentAdds);

        Task UpdateAsync(StudentVM studentVM);

        Task UploadImageAsync(string id, string avatar);

        Task DeleteAsync(string id);
    }
}
