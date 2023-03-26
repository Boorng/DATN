using BE.Data.Response;
using BE.Entity.VM.Account;

namespace BE.IServices
{
    public interface IAccountServ
    {
        Task<List<AccountVM>> GetAllAsync();

        Task<List<AccountVM>> GetByNameAsync(int page = 1);

        Task<AccountVM?> GetByIdAsync(Guid id);

        Task<bool> CheckPassword(Guid id, string password);
        
        Task<AccountVM> AddAsync(AccountModel accountModel);

        Task UpdateAsync(Guid id, bool Status);

        Task DeleteAsync(Guid id);

        Task ChangePasswordAsync(Guid id, string password);
    }
}
