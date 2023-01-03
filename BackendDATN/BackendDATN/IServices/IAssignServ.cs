using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Assign;

namespace BackendDATN.IServices
{
    public interface IAssignServ
    {
        Task<List<AssignVM>> GetAllAsync();

        Task<AssignVM?> GetByIdAsync(Guid id);

        Task<AssignVM> AddAsync(AssignModel assignModel);

        Task UpdateAsync(AssignVM assignVM);

        Task DeleteAsync(Guid id);
    }
}
