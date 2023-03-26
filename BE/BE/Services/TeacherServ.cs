using AutoMapper;
using BE.Data;
using BE.Data.Response;
using BE.Data.VM.Teacher;
using BE.Entity.VM.Account;
using BE.Entity.VM.Group;
using BE.Entity.VM.Teacher;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class TeacherServ : ITeacherServ
    {
        private BackendContext _context;

        private readonly IMapper _mapper;

        private readonly IAccountServ _accountServ;

        public TeacherServ(BackendContext context, IMapper mapper, IAccountServ accountServ)
        {
            _context = context;
            _mapper = mapper;
            _accountServ = accountServ;
        }

        public async Task<string> AddAsync(TeacherAdd teacherAdd)
        {
            var account = await _accountServ.AddAsync(new AccountModel
            {
                Email = teacherAdd.Email,
                Role = 2,
            });

            var data = new Teacher
            {
                IdTeacher = teacherAdd.Id,
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
                IsSeenNotification = true
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();

            return account.Password;
        }
        public async Task<List<TeacherAccount>> AddListAsync(List<TeacherAdd> teacherAdds)
        {
            List<Teacher> datas = new List<Teacher>();
            List<TeacherAccount> res = new List<TeacherAccount>();

            for (int i = 0; i < teacherAdds.Count; i++)
            {
                var account = await _accountServ.AddAsync(new AccountModel
                {
                    Email = teacherAdds[i].Email,
                    Role = 2,
                });

                var data = new Teacher
                {
                    IdTeacher = teacherAdds[i].Id,
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
                    IsSeenNotification = true
                };

                datas.Add(data);
                res.Add(new TeacherAccount
                {
                    Email = account.Email,
                    Password = account.Password,
                    Id = data.IdTeacher,
                    FullName = data.FullName
                });
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();

            return res;
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

        public async Task<List<TeacherVM>> GetAllAsync(string? search, int? teamId)
        {
            var data = await _context.Teachers.ToListAsync();

            var res = data.AsQueryable();

            if (teamId != null)
            {
                res = res.Where(x => x.TeamId == teamId);
            }

            var result = res.Select(t => new TeacherVM
            {
                Id = t.IdTeacher,
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
                TeamId = t.TeamId,
                ViceLeader = t.ViceLeader,
                Leader = t.Leader,
            });

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(st => st.FullName.Contains(search) || st.Id.Contains(search));
            }

            return result.OrderBy(s => s.Id).ToList();
        }

        public async Task<TeacherVM?> GetByAccountId(Guid accountId)
        {
            var data = await _context.Teachers.SingleOrDefaultAsync(t => t.AccountId == accountId);
            if(data != null)
            {
                var result = new TeacherVM
                {
                    Id = data.IdTeacher,
                    FullName = data.FullName,
                    Age = data.Age,
                    Gender = data.Gender,
                    Phone = data.Phone,
                    Ethnic = data.Ethnic,
                    Address = data.Address,
                    Avatar = data.Avatar,
                    BirthDay = data.Birthday.ToString("dd/MM/yyyy"),
                    Level = data.Level,
                    Status = data.Status,
                    Email = _context.Accounts.Find(data.AccountId)!.Email,
                    AccountId = data.AccountId,
                    TeamId = data.TeamId,
                    ViceLeader = data.ViceLeader,
                    Leader = data.Leader,
                    IsSeenNotification = data.IsSeenNotification
                    
                };

                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<CheckDataTeacherResponse> CheckData(string id)
        {
            var data = await _context.Teachers.FindAsync(id);

            var dataAcc = _context.Accounts.AsQueryable();
            var dataAss = _context.Assigns.AsQueryable();
            var dataClass = _context.Classes.AsQueryable();

            CheckDataTeacherResponse res = new CheckDataTeacherResponse();

            var acc = dataAcc.FirstOrDefault(acc => acc.IdAccount == data.AccountId);
            var ass = dataAss.FirstOrDefault(ass => ass.TeacherId == data.IdTeacher);
            var cls = dataClass.Where(cls => cls.HeaderTeacherId == data.IdTeacher).Select(cls => cls.IdClass).ToList();

            if (acc != null)
            {
                res.HaveAccount = true;
                res.AccountId = acc.IdAccount;
            }

            if (ass != null)
            {
                res.HaveAssign = true;
            }

            if (cls.Count > 0)
            {
                res.ClassIds.AddRange(cls);
            }

            return res;
        }

        public async Task<List<TeacherVM>> GetAllNoLeaveAsync(string? search, int? teamId)
        {
            var data = await _context.Teachers.ToListAsync();

            var res = data.AsQueryable();

            var result = res.Select(t => new TeacherVM
            {
                Id = t.IdTeacher,
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
                TeamId = t.TeamId,
                Leader = t.Leader,
                ViceLeader = t.ViceLeader,
            }).Where(t => t.Status == 1);

            if(teamId != null)
            {
                result = result.Where(t => t.TeamId == teamId);
            }

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(t => t.FullName.Contains(search) || t.Id.Contains(search));
            }

            return result.ToList();
        }

        public async Task<TeamVM?> GetTeam(int teamId)
        {
            var data = await _context.Teams.FindAsync(teamId);
            if(data != null)
            {
                return _mapper.Map<TeamVM>(data);
            }
            else
            {
                return null;
            }
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
                data.Status = teacherVM.Status;
                data.TeamId = teacherVM.TeamId;
                data.Leader = teacherVM.Leader;
                data.ViceLeader = teacherVM.ViceLeader;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateTeacherTeam(string teacherId)
        {
            var data = await _context.Teachers.FindAsync(teacherId);
            data.TeamId = null;
            data.Leader = false;
            data.ViceLeader = false;
            data.IsSeenNotification = true;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateSeenNotification(string teacherId)
        {
            var data = await _context.Teachers.FindAsync(teacherId);

            data.IsSeenNotification = true;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateTeam(int teamId, List<string>? teacherIds)
        {
            var dataTeam = await _context.Teams.FirstOrDefaultAsync(t => t.IdTeam == teamId);
            if (teacherIds.Count > 0)
            {
                for (int i = 0; i < teacherIds.Count; i++)
                {
                    var data = await _context.Teachers.FindAsync(teacherIds[i]);
                    data.TeamId = teamId;
                    if(!string.IsNullOrEmpty(dataTeam!.Notification))
                    {
                        data.IsSeenNotification = false;
                    }
                }
            }
            else
            {
                var lstTeacher = _context.Teachers.Where(t => t.TeamId == teamId).Select(t => t.IdTeacher).ToList();
                for (int i = 0; i < lstTeacher.Count; i++)
                {
                    var data = await _context.Teachers.FindAsync(lstTeacher[i]);
                    data.TeamId = null;
                    data.Leader = false;
                    data.ViceLeader = false;
                    data.IsSeenNotification = true;
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateManageTeam(TeacherManage teacherManage)
        {
            var leader = await _context.Teachers.FindAsync(teacherManage.IdLeader);
            var viceLeader1 = await _context.Teachers.FindAsync(teacherManage.IdViceLeaders[0]);
            var viceLeader2 = await _context.Teachers.FindAsync(teacherManage.IdViceLeaders[1]);
            var dataGet = _context.Teachers.AsQueryable();

            if(leader != null)
            {
                leader.Leader = true;
                leader.ViceLeader = false;
                dataGet = dataGet.Where(t => t.IdTeacher != leader.IdTeacher);
            }
            if(viceLeader1 != null)
            {
                viceLeader1.Leader = false;
                viceLeader1.ViceLeader = true;
                dataGet = dataGet.Where(t => t.IdTeacher != viceLeader1.IdTeacher);
            }
            if(viceLeader2 != null)
            {
                viceLeader2.Leader = false;
                viceLeader2.ViceLeader = true;
                dataGet = dataGet.Where(t => t.IdTeacher != viceLeader2.IdTeacher);
            }
            

            var datas = dataGet.Select(t => t.IdTeacher).ToList();
            for (int i = 0; i < datas.Count; i++)
            {
                var data = await _context.Teachers.FindAsync(datas[i]);
                data.Leader = false;
                data.ViceLeader = false;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<TeacherManage> GetAllManage(int teamId)
        {
            var data = await _context.Teachers.Where(t => (t.Leader == true || t.ViceLeader == true) && t.TeamId == teamId).ToListAsync();

            TeacherManage teacherManage = new TeacherManage();

            for(int i = 0; i < data.Count; i++)
            {
                if (data[i].Leader)
                {
                    teacherManage.IdLeader = data[i].IdTeacher;
                }
                else if (data[i].ViceLeader)
                {
                    teacherManage.IdViceLeaders.Add(data[i].IdTeacher);
                }
            } 

            return teacherManage;
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
