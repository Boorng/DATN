using BE.Data.Response;
using BE.Data.VM.Class;
using BE.Entity.VM.Class;

namespace BE.IServices
{
    public interface IClassServ
    {
        Task<bool> CheckYear(string academicYear);

        Task<List<ClassRepModel>> GetAll(string? search, int? grade);

        Task<List<ClassVM>?> GetByHeaderTeacherId(string headerTeacherId, string? academicYear);

        Task<string> GetTeacherByClassId(string classId);

        Task AddAsync(ClassVM classVM);

        Task UpdateAsync(ClassVM classVM);

        Task DeleteAsync(string id);

        Task<CheckDataClassResponse> CheckData(string classId);
    }
}