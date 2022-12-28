using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;

namespace BackendDATN.IServices
{
    public interface IAccountServ
    {
        Task<List<AccountVM>> GetAllAsync();

        Task<AccountResponse> GetByPageAsync(int page, string? search);

        Task<List<AccountVM>> GetByNameAsync(int page = 1);

        Task<AccountVM?> GetByIdAsync(Guid id);

        Task<AccountVM> AddAsync(AccountModel accountModel);

        Task UpdateAsync(Guid id, bool Status);

        Task DeleteAsync(Guid id);

        Task ChangePasswordAsync(Guid id, string password);
    }
}
