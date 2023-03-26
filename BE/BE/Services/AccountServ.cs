using AutoMapper;
using BE.Data;
using BE.Data.Response;
using BE.Entity.VM.Account;
using BE.Helper;
using BE.IServices;
using Microsoft.EntityFrameworkCore;
using PasswordGenerator;

namespace BE.Services
{
    public class AccountServ : IAccountServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public AccountServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<AccountVM>> GetAllAsync()
        {
            var data = await _context.Accounts.ToListAsync();

            return _mapper.Map<List<AccountVM>>(data);
        }

        public Task<List<AccountVM>> GetByNameAsync(int page = 1)
        {
            throw new NotImplementedException();
        }

        public async Task<AccountVM?> GetByIdAsync(Guid id)
        {
            var data = await _context.Accounts.FindAsync(id);
            return _mapper.Map <AccountVM>(data);
        }

        public async Task<bool> CheckPassword(Guid id, string password)
        {
            var data = await _context.Accounts.FindAsync(id);

            if(data.Password == password)
            {
                return true;
            }
            return false;

        }

        public async Task<AccountVM> AddAsync(AccountModel accountModel)
        {
            var account = new Account
            {
                IdAccount = Guid.NewGuid(),
                Email = accountModel.Email,
                Password = (new Password(12)).Next(),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Status = true,
                Role = accountModel.Role
            };

            await _context.AddAsync(account);

            return _mapper.Map<AccountVM>(account);

        }

        public async Task UpdateAsync(Guid id, bool Status)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.IdAccount == id);
            if(account != null)
            {
                account.UpdatedAt = DateTime.Now;
                account.Status = Status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.IdAccount == id);
            if(account != null)
            {
                _context.Remove(account);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ChangePasswordAsync(Guid id, string password)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(a => a.IdAccount == id);
            if(account != null)
            {
                account.Password = password;
                account.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }
    }
}
