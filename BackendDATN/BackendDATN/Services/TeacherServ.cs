using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Teacher;
using BackendDATN.Helper;
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

        public async Task<TeacherVM> AddAsync(TeacherAdd teacherAdd)
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
                Birthday = teacherAdd.BirthDay,
                Level = teacherAdd.Level,
                Status = teacherAdd.Status,
                Leader = teacherAdd.Leader,
                ViceLeader = teacherAdd.ViceLeader,
                AccountId = account.Id,
                TeamId = teacherAdd.TeamId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();

            return _mapper.Map<TeacherVM>(data);
        }
        public async Task<List<TeacherVM>> AddListAsync(List<TeacherAdd> teacherAdds)
        {
            List<Teacher> datas = new List<Teacher>();

            for(int i = 0; i < teacherAdds.Count; i++)
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
                    Birthday = teacherAdds[i].BirthDay,
                    Level = teacherAdds[i].Level,
                    Status = teacherAdds[i].Status,
                    Leader = teacherAdds[i].Leader,
                    ViceLeader = teacherAdds[i].ViceLeader,
                    AccountId = account.Id,
                    TeamId = teacherAdds[i].TeamId
                };

                datas.Add(data);
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();

            return _mapper.Map<List<TeacherVM>>(datas);
        }

        public async Task DeleteAsync(string id)
        {
            var data = await _context.Teachers.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<TeacherVM>> GetAllAsync()
        {
            var data = await _context.Teachers.ToListAsync();

            return _mapper.Map<List<TeacherVM>>(data);
        }

        public async Task<TeacherVM?> GetByIdAsync(string id)
        {
            var data = await _context.Teachers.FindAsync(id);
            
            return _mapper.Map<TeacherVM>(data);
        }

        public async Task<TeacherResponse> GetByPageAsync(int page, string? search)
        {
            var teachers = await _context.Teachers.ToListAsync();
            var data = teachers.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(tc => tc.FullName.Contains(search) || tc.Id.Contains(search));
            }

            var result = PaginatedList<Teacher>.Create(data, page, PAGE_SIZE);

            var res = result.ToList();

            TeacherResponse teacherResponse = new TeacherResponse
            {
                Data = _mapper.Map<List<TeacherVM>>(res),
                HasPreviousPage = result.HasPreviousPage,
                HasNextPage = result.HasNextPage
            };

            return teacherResponse;
        }

        public async Task UpdateAsync(string id, TeacherModel teacherModel)
        {
            var data = await _context.Teachers.FindAsync(id);

            if (data != null)
            {
                data.FullName = teacherModel.FullName;
                data.Age = teacherModel.Age;
                data.Gender = teacherModel.Gender;
                data.Address = teacherModel.Address;
                data.Ethnic = teacherModel.Ethnic;
                data.Phone = teacherModel.Phone;
                data.Birthday = teacherModel.BirthDay;
                data.Level = teacherModel.Level;
                data.Status = teacherModel.Status;
                data.Leader = teacherModel.Leader;
                data.ViceLeader = teacherModel.ViceLeader;
                data.TeamId = teacherModel.TeamId;
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
