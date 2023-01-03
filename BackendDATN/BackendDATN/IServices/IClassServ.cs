using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Class;
using BackendDATN.Entity.VM.Class;

namespace BackendDATN.IServices
{
    public interface IClassServ
    {
        Task<List<ClassRepModel>> GetAll(string? search, int grade);

        Task AddAsync(ClassModel classModel);

        Task UpdateAsync(ClassVM classVM);

        Task DeleteAsync(int id);
    }
}
