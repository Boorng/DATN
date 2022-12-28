using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.StudentClass;

namespace BackendDATN.IServices
{
    public interface IStudentClassServ
    {
        List<StudentClassVM> GetAll();

        Task<StudentClassResponse> GetByPage(int page, string? search, int ClassId);

        StudentClassVM? GetById(int id);

        Task<StudentClassVM> AddAsync(StudentClassModel studentClassModel);

        Task<List<StudentClassVM>> AddListAsync(List<StudentClassModel> studentClassModels);

        Task UpdateAsync(StudentClassVM studentClassVM);

        Task DeleteAsync(int id);
    }
}
