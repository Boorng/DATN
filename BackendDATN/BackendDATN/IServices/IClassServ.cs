using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Class;

namespace BackendDATN.IServices
{
    public interface IClassServ
    {
        List<ClassVM> GetAll();

        Task<ClassResponse> GetByPageAsync(int page, int grade, string? search);

        ClassVM? GetById(int id);

        Task<ClassVM> AddAsync(ClassModel classModel);

        Task UpdateAsync(ClassVM classVM);

        Task DeleteAsync(int id);
    }
}
