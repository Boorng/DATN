using BackendDATN.Data.VM.StudentClass;
using BackendDATN.Entity.VM.StudentClass;

namespace BackendDATN.IServices
{
    public interface IStudentClassServ
    {
        Task<List<StudentClassRepModel>> GetAll(int classId, string? search = null);

        Task AddAsync(StudentClassModel studentClassModel);

        Task AddListAsync(List<StudentClassModel> studentClassModels);

        Task UpdateAsync(int id, int classId);

        Task DeleteAsync(int id);
    }
}
