using BackendDATN.Data.VM.Assign;
using BackendDATN.Data.VM.StudentClass;
using BackendDATN.Entity.VM.StudentClass;

namespace BackendDATN.IServices
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
