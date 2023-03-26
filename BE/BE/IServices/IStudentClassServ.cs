using BE.Data.VM.Assign;
using BE.Data.VM.StudentClass;
using BE.Entity.VM.StudentClass;

namespace BE.IServices
{
    public interface IStudentClassServ
    {
        Task<List<StudentClassRepModel>> GetAll(string classId, string? search = null);

        Task<List<AssignClassResponse>> GetByStudentId(string studentId);

        Task AddAsync(StudentClassModel studentClassModel);

        Task AddListAsync(List<StudentClassModel> studentClassModels);

        Task UpdateAsync(int id, string classId);

        Task DeleteAsync(int id);

        Task DeleteByIdAsync(string? studentId, string? classId);
    }
}
