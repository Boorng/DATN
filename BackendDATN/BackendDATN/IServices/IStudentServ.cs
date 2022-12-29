using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Student;

namespace BackendDATN.IServices
{
    public interface IStudentServ
    {
        Task<List<StudentVM>> GetAllAsync(string? search);

        Task AddAsync(StudentAdd studentAdd);

        Task AddListAsync(List<StudentAdd> studentAdds);

        Task UpdateAsync(StudentVM studentVM);

        Task UpdateStatus(string id, int status);

        Task UploadImageAsync(string id, string avatar);

        Task DeleteAsync(string id);
    }
}
