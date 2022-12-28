using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Student;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

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
                Status = studentAdd.Status,
                AccountId = account.Id,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task AddListAsync(List<StudentAdd> studentAdds)
        {
            List<Student> datas = new List<Student>();

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
                    Status = studentAdds[i].Status,
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

        public async Task<List<StudentVM>> GetAllAsync()
        {
            var data = await _context.Students.ToListAsync();
            var res = data.AsQueryable();

            var result = res.Select(d => new StudentVM
            {
                Id = d.Id,
                FullName = d.FullName,
                Age = d.Age,
                Gender = d.Gender,
                Phone = d.Phone,
                Ethnic = d.Ethnic,
                Address = d.Address,
                BirthDay = d.Birthday.ToString("dd/MM/yyyy"),
                FatherName = d.FatherName,
                FatherCareer = d.FatherCareer,
                FatherPhone = d.FatherPhone,
                MotherName = d.MotherName,
                MotherCareer = d.MotherCareer,
                MotherPhone = d.MotherPhone,
                Status = d.Status,
                Email = _context.Accounts.Find(d.AccountId)!.Email,
                AccountId = d.AccountId,
            });

            return result.ToList();
        }

        public async Task<StudentVM?> GetByIdAsync(string id)
        {
            var data = await _context.Students.FindAsync(id);

            if (data != null)
            {
                return new StudentVM
                {
                    Id = data.Id,
                    FullName = data.FullName,
                    Age = data.Age,
                    Gender = data.Gender,
                    Phone = data.Phone,
                    Ethnic = data.Ethnic,
                    Address = data.Address,
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
                };
            }
            return null;
        }

        public async Task<StudentResponse> GetByPageAsync(int page, string? search)
        {
            var students = await _context.Students.ToListAsync();
            var data = students.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(st => st.FullName.Contains(search) || st.Id.Contains(search));
            }

            var dataRes = data.Select(d => new StudentVM
            {
                Id = d.Id,
                FullName = d.FullName,
                Age = d.Age,
                Gender = d.Gender,
                Phone = d.Phone,
                Ethnic = d.Ethnic,
                Address = d.Address,
                BirthDay = d.Birthday.ToString("dd/MM/yyyy"),
                FatherName = d.FatherName,
                FatherCareer = d.FatherCareer,
                FatherPhone = d.FatherPhone,
                MotherName = d.MotherName,
                MotherCareer = d.MotherCareer,
                MotherPhone = d.MotherPhone,
                Status = d.Status,
                Email = _context.Accounts.Find(d.AccountId)!.Email,
                AccountId = d.AccountId,

            });

            var result = PaginatedList<StudentVM>.Create(dataRes, page, PAGE_SIZE);

            var res = result.ToList();

            StudentResponse studentResponse = new StudentResponse
            {
                Data = res,
                HasPreviousPage = result.HasPreviousPage,
                HasNextPage = result.HasNextPage
            };

            return studentResponse;

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
