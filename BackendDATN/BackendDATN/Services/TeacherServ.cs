using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Teacher;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class TeacherServ : ITeacherServ
    {
        private BackendContext _context;

        private readonly IMapper _mapper;

        private readonly IAccountServ _accountServ;

        public static int PAGE_SIZE { get; set; } = 10;

        public TeacherServ(BackendContext context, IMapper mapper, IAccountServ accountServ)
        {
            _context = context;
            _mapper = mapper;
            _accountServ = accountServ;
        }

        public async Task AddAsync(TeacherAdd teacherAdd)
        {
            var account = await _accountServ.AddAsync(new AccountModel
            {
                Email = teacherAdd.Email,
                Role = 2,
            });

            var data = new Teacher
            {
                Id = teacherAdd.Id,
                FullName = teacherAdd.FullName,
                Age = teacherAdd.Age,
                Gender = teacherAdd.Gender,
                Address = teacherAdd.Address,
                Ethnic = teacherAdd.Ethnic,
                Phone = teacherAdd.Phone,
                Birthday = DateTime.Parse(teacherAdd.BirthDay),
                Level = teacherAdd.Level,
                Status = 1,
                Leader = false,
                ViceLeader = false,
                AccountId = account.Id,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }
        public async Task AddListAsync(List<TeacherAdd> teacherAdds)
        {
            List<Teacher> datas = new List<Teacher>();

            for (int i = 0; i < teacherAdds.Count; i++)
            {
                var account = await _accountServ.AddAsync(new AccountModel
                {
                    Email = teacherAdds[i].Email,
                    Role = 2,
                });

                var data = new Teacher
                {
                    Id = teacherAdds[i].Id,
                    FullName = teacherAdds[i].FullName,
                    Age = teacherAdds[i].Age,
                    Gender = teacherAdds[i].Gender,
                    Address = teacherAdds[i].Address,
                    Ethnic = teacherAdds[i].Ethnic,
                    Phone = teacherAdds[i].Phone,
                    Birthday = DateTime.Parse(teacherAdds[i].BirthDay),
                    Level = teacherAdds[i].Level,
                    Status = 1,
                    Leader = false,
                    ViceLeader = false,
                    AccountId = account.Id,
                };

                datas.Add(data);
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var data = await _context.Teachers.FindAsync(id);
            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<TeacherVM>> GetAllAsync(string? search)
        {
            var data = await _context.Teachers.ToListAsync();

            var res = data.AsQueryable();

            var result = res.Select(t => new TeacherVM
            {
                Id = t.Id,
                FullName = t.FullName,
                Age = t.Age,
                Gender = t.Gender,
                Phone = t.Phone,
                Ethnic = t.Ethnic,
                Address = t.Address,
                Avatar = t.Avatar,
                BirthDay = t.Birthday.ToString("dd/MM/yyyy"),
                Level = t.Level,
                Status = t.Status,
                Email = _context.Accounts.Find(t.AccountId)!.Email,
                AccountId = t.AccountId,
            });

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(st => st.FullName.Contains(search) || st.Id.Contains(search));
            }

            return result.ToList();
        }

        public async Task<List<TeacherVM>> GetAllNoLeaveAsync(string? search)
        {
            var data = await _context.Teachers.ToListAsync();

            var res = data.AsQueryable();

            var result = res.Select(t => new TeacherVM
            {
                Id = t.Id,
                FullName = t.FullName,
                Age = t.Age,
                Gender = t.Gender,
                Phone = t.Phone,
                Ethnic = t.Ethnic,
                Address = t.Address,
                Avatar = t.Avatar,
                BirthDay = t.Birthday.ToString("dd/MM/yyyy"),
                Level = t.Level,
                Status = t.Status,
                Email = _context.Accounts.Find(t.AccountId)!.Email,
                AccountId = t.AccountId,
            }).Where(t => t.Status == 1);

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(st => st.FullName.Contains(search) || st.Id.Contains(search));
            }

            return result.ToList();
        }

        public async Task UpdateAsync(TeacherVM teacherVM)
        {
            var data = await _context.Teachers.FindAsync(teacherVM.Id);

            if (data != null)
            {
                data.FullName = teacherVM.FullName;
                data.Age = teacherVM.Age;
                data.Gender = teacherVM.Gender;
                data.Address = teacherVM.Address;
                data.Ethnic = teacherVM.Ethnic;
                data.Phone = teacherVM.Phone;
                data.Birthday = DateTime.Parse(teacherVM.BirthDay);
                data.Level = teacherVM.Level;
                data.Leader = teacherVM.Leader;
                data.ViceLeader = teacherVM.ViceLeader;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateStatus(string id, int status)
        {
            var data = await _context.Teachers.FindAsync(id);

            if (data != null)
            {
                data.Status = status;

                await _context.SaveChangesAsync();
            }
        }

        public async Task UploadImageAsync(string id, string avatar)
        {
            var data = await _context.Teachers.FindAsync(id);

            if (data != null)
            {
                data.Avatar = avatar;
                await _context.SaveChangesAsync();
            }
        }
    }
}
