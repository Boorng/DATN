using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;
using PasswordGenerator;

namespace BackendDATN.Services
{
    public class AccountServ : IAccountServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public static int PAGE_SIZE { get; set; } = 10;

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

        public async Task<AccountResponse> GetByPageAsync(int page, string? search)
        {
            var allDAtas = await _context.Accounts.ToListAsync();
            var data = allDAtas.AsQueryable();

            if(!string.IsNullOrEmpty(search))
            {
                data = data.Where(ac => ac.Email.Contains(search));
            }

            var result = PaginatedList<Account>.Create(data, page, PAGE_SIZE);

            var res = result.ToList();

            AccountResponse accountResponse = new AccountResponse
            {
                Data = _mapper.Map<List<AccountVM>>(res),
               HasPreviousPage = result.HasPreviousPage,
               HasNextPage = result.HasNextPage,
            };

            return accountResponse;

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

        public async Task<AccountVM> AddAsync(AccountModel accountModel)
        {
            var account = new Account
            {
                Id = Guid.NewGuid(),
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
            var account = _context.Accounts.SingleOrDefault(a => a.Id == id);
            if(account != null)
            {
                account.UpdatedAt = DateTime.Now;
                account.Status = Status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.Id == id);
            if(account != null)
            {
                _context.Remove(account);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ChangePasswordAsync(Guid id, string password)
        {
            var account = _context.Accounts.SingleOrDefault(a => a.Id == id);
            if(account != null)
            {
                account.Password = password;
                account.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }
    }
}
