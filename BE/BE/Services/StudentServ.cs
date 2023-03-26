using AutoMapper;
using BE.Data;
using BE.Data.Response;
using BE.Data.VM.Student;
using BE.Entity.VM.Account;
using BE.Entity.VM.Student;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class StudentServ : IStudentServ
    {
        private readonly BackendContext _context;

        private readonly IAccountServ _accountServ;

        public static int PAGE_SIZE { get; set; } = 10;

        public StudentServ(BackendContext context, IMapper mapper, IAccountServ accountServ)
        {
            _context = context;
            _accountServ = accountServ;
        }

        public async Task<string> AddAsync(StudentAdd studentAdd)
        {
            var account = await _accountServ.AddAsync(new AccountModel
            {
                Email = studentAdd.Email,
                Role = 1,
            });

            var data = new Student
            {
                IdStudent = studentAdd.Id,
                FullName = studentAdd.FullName,
                Age = studentAdd.Age,
                Gender = studentAdd.Gender,
                Phone = studentAdd.Phone,
                Ethnic = studentAdd.Ethnic,
                Address = studentAdd.Address,
                Birthday = DateTime.Parse(studentAdd.BirthDay),
                FatherName = studentAdd.FatherName,
                FatherCareer = studentAdd.FatherCareer,
                FatherPhone = studentAdd.FatherPhone,
                MotherName = studentAdd.MotherName,
                MotherCareer = studentAdd.MotherCareer,
                MotherPhone = studentAdd.MotherPhone,
                Status = 1,
                AccountId = account.Id,
                SchoolYear = studentAdd.SchoolYear
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();

            return account.Password;
        }

        public async Task<List<StudentAccount>> AddListAsync(List<StudentAdd> studentAdds)
        {
            List<Student> datas = new List<Student>();
            List<StudentAccount> res = new List<StudentAccount>();

            for (int i = 0; i < studentAdds.Count; i++)
            {
                var account = await _accountServ.AddAsync(new AccountModel
                {
                    Email = studentAdds[i].Email,
                    Role = 1,
                });

                var data = new Student
                {
                    IdStudent = studentAdds[i].Id,
                    FullName = studentAdds[i].FullName,
                    Age = studentAdds[i].Age,
                    Gender = studentAdds[i].Gender,
                    Phone = studentAdds[i].Phone,
                    Ethnic = studentAdds[i].Ethnic,
                    Address = studentAdds[i].Address,
                    Birthday = DateTime.Parse(studentAdds[i].BirthDay),
                    FatherName = studentAdds[i].FatherName,
                    FatherCareer = studentAdds[i].FatherCareer,
                    FatherPhone = studentAdds[i].FatherPhone,
                    MotherName = studentAdds[i].MotherName,
                    MotherCareer = studentAdds[i].MotherCareer,
                    MotherPhone = studentAdds[i].MotherPhone,
                    Status = 1,
                    AccountId = account.Id,
                    SchoolYear = studentAdds[i].SchoolYear
                };

                datas.Add(data);
                res.Add(new StudentAccount
                {
                    Email = account.Email,
                    Password = account.Password,
                    Id = data.IdStudent,
                    FullName = data.FullName
                });

            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();

            return res;
        }

        public async Task DeleteAsync(string id)
        {
            var data = await _context.Students.FindAsync(id);
            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<string>> GetAllSchoolYear()
        {
            var data = await _context.Students.ToListAsync();
            var res = data.AsQueryable();

            var result = res.Select(x => x.SchoolYear).Distinct().OrderBy(s => s);

            return result.ToList();
        }

        public async Task<List<StudentVM>> GetAllAsync(string? schoolYear, string? search)
        {
            var data = await _context.Students.ToListAsync();
            var res = data.AsQueryable();

            if(!string.IsNullOrEmpty(schoolYear))
            {
                res = res.Where(x => x.SchoolYear.ToLower() == schoolYear.ToLower());
            }

            var result = res.Select(s => new StudentVM
            {
                Id = s.IdStudent,
                FullName = s.FullName,
                Age = s.Age,
                Gender = s.Gender,
                Phone = s.Phone,
                Ethnic = s.Ethnic,
                Address = s.Address,
                Avatar = s.Avatar,
                BirthDay = s.Birthday.ToString("dd/MM/yyyy"),
                FatherName = s.FatherName,
                FatherCareer = s.FatherCareer,
                FatherPhone = s.FatherPhone,
                MotherName = s.MotherName,
                MotherCareer = s.MotherCareer,
                MotherPhone = s.MotherPhone,
                Status = s.Status,
                Email = _context.Accounts.Find(s.AccountId)!.Email,
                AccountId = s.AccountId,
                SchoolYear = s.SchoolYear,
            });

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(st => st.FullName.ToLower().Contains(search.ToLower()) || st.Id.ToLower().Contains(search.ToLower()));
            }

            return result.OrderBy(s => s.Id).ToList();
        }

        public async Task<StudentVM?> GetByAccountId(Guid accountId)
        {
            var data = await _context.Students.FirstOrDefaultAsync(s => s.AccountId == accountId);

            if(data != null)
            {
                var res = new StudentVM
                {
                    Id = data.IdStudent,
                    FullName = data.FullName,
                    Age = data.Age,
                    Gender = data.Gender,
                    Phone = data.Phone,
                    Ethnic = data.Ethnic,
                    Address = data.Address,
                    Avatar = data.Avatar,
                    BirthDay = data.Birthday.ToString("dd/MM/yyyy"),
                    FatherName = data.FatherName,
                    FatherCareer = data.FatherCareer,
                    FatherPhone = data.FatherPhone,
                    MotherName = data.MotherName,
                    MotherCareer = data.MotherCareer,
                    MotherPhone = data.MotherPhone,
                    Status = data.Status,
                    Email = _context.Accounts.Find(data.AccountId)!.Email,
                    AccountId = data.AccountId,
                    SchoolYear = data.SchoolYear
                };

                return res;
            }
            else
            {
                return null;
            }
        }

        public async Task<StudentVM?> GetById(string id)
        {
            var data = await _context.Students.FindAsync(id);

            if(data != null)
            {

                var res = new StudentVM
                {
                    Id = data.IdStudent,
                    FullName = data.FullName,
                    Age = data.Age,
                    Gender = data.Gender,
                    Phone = data.Phone,
                    Ethnic = data.Ethnic,
                    Address = data.Address,
                    Avatar = data.Avatar,
                    BirthDay = data.Birthday.ToString("dd/MM/yyyy"),
                    FatherName = data.FatherName,
                    FatherCareer = data.FatherCareer,
                    FatherPhone = data.FatherPhone,
                    MotherName = data.MotherName,
                    MotherCareer = data.MotherCareer,
                    MotherPhone = data.MotherPhone,
                    Status = data.Status,
                    Email = _context.Accounts.Find(data.AccountId)!.Email,
                    AccountId = data.AccountId,
                    SchoolYear = data.SchoolYear
                };

                return res;
            }
            else
            {
                return null;
            }
        }

        public async Task UpdateAsync(StudentVM studentVM)
        {
            var data = await _context.Students.FindAsync(studentVM.Id);
            if (data != null)
            {
                data.FullName = studentVM.FullName;
                data.Age = studentVM.Age;
                data.Gender = studentVM.Gender;
                data.Phone = studentVM.Phone;
                data.Ethnic = studentVM.Ethnic;
                data.Address = studentVM.Address;
                data.Birthday = DateTime.Parse(studentVM.BirthDay);
                data.FatherName = studentVM.FatherName;
                data.FatherCareer = studentVM.FatherCareer;
                data.FatherPhone = studentVM.FatherPhone;
                data.MotherName = studentVM.MotherName;
                data.MotherCareer = studentVM.MotherCareer;
                data.MotherPhone = studentVM.MotherPhone;
                data.Status = studentVM.Status;
                data.SchoolYear = studentVM.SchoolYear;

                await _context.SaveChangesAsync();
            }
        }

        public async Task UploadImageAsync(string id, string avatar)
        {
            var data = await _context.Students.FindAsync(id);

            if (data != null)
            {
                data.Avatar = avatar;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<CheckDataStudentResponse> CheckData(string id)
        {
            var data = await _context.Students.FindAsync(id);

            var dataAcc = _context.Accounts.AsQueryable();
            var dataSc = _context.StudentClasses.AsQueryable();
            var dataTest = _context.Tests.AsQueryable();
            var dataConduct = _context.Conducts.AsQueryable();

            CheckDataStudentResponse res = new CheckDataStudentResponse();

            var acc = dataAcc.FirstOrDefault(acc => acc.IdAccount == data.AccountId);
            var sc = dataSc.Where(sc => sc.StudentId == data.IdStudent).Select(sc => sc.IdStudentClass).ToList();
            var cd = dataConduct.Where(cd => cd.StudentId == data.IdStudent).Select(cd => cd.StudentId).ToList();

            if(acc != null)
            {
                res.HaveAccount = true;
                res.AccountId = acc.IdAccount;
            }

            if(sc.Count > 0)
            {
                for(int i = 0; i < sc.Count; i++)
                {
                    var test = dataTest.FirstOrDefault(t => t.StudentClassId == sc[i]);
                    if(test != null)
                    {
                        res.HaveTest = true;
                        res.StudentClassIds.Add(sc[i]);
                    }
                }
                res.HaveStudentClass = true;
            }

            if(cd.Count > 0)
            {
                res.HaveConduct = true;
            }

            return res;
        }
    }
}
