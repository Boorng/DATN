using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Student;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace BackendDATN.Services
{
    public class StudentServ : IStudentServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        private readonly IAccountServ _accountServ;

        public static int PAGE_SIZE { get; set; } = 10;

        public StudentServ(BackendContext context, IMapper mapper, IAccountServ accountServ)
        {
            _context = context;
            _mapper = mapper;
            _accountServ = accountServ;
        }

        public async Task AddAsync(StudentAdd studentAdd)
        {
            var account = await _accountServ.AddAsync(new AccountModel
            {
                Email = studentAdd.Email,
                Role = 1,
            });

            var data = new Student
            {
                Id = studentAdd.Id,
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
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task AddListAsync(List<StudentAdd> studentAdds)
        {
            List<Student> datas = new List<Student>();
            List<StudentVM> res = new List<StudentVM>();

            for (int i = 0; i < studentAdds.Count; i++)
            {
                var account = await _accountServ.AddAsync(new AccountModel
                {
                    Email = studentAdds[i].Email,
                    Role = 1,
                });

                var data = new Student
                {
                    Id = studentAdds[i].Id,
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
                };

                datas.Add(data);

            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();

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

        public async Task<List<StudentVM>> GetAllAsync(string? search)
        {
            var data = await _context.Students.ToListAsync();
            var res = data.AsQueryable();

            var result = res.Select(s => new StudentVM
            {
                Id = s.Id,
                FullName = s.FullName,
                Age = s.Age,
                Gender = s.Gender,
                Phone = s.Phone,
                Ethnic = s.Ethnic,
                Address = s.Address,
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
            });

            if (!string.IsNullOrEmpty(search))
            {
                result = result.Where(st => st.FullName.Contains(search) || st.Id.Contains(search));
            }

            return result.ToList();
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

                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateStatus(string id, int status)
        {
            var data = await _context.Students.FindAsync(id);

            if(data != null)
            {
                data.Status = status;

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


    }
}
