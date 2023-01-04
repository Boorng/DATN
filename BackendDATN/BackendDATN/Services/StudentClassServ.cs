using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.VM.StudentClass;
using BackendDATN.Entity.VM.StudentClass;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class StudentClassServ : IStudentClassServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public static int PAGE_SIZE { get; set; } = 10;

        public StudentClassServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(StudentClassModel studentClassModel)
        {
            var data = new StudentClass
            {
                ClassId = studentClassModel.ClassId,
                StudentId = studentClassModel.StudentId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task AddListAsync(List<StudentClassModel> studentClassModels)
        {
            List<StudentClass> datas = new List<StudentClass>();
            for (int i = 0; i < studentClassModels.Count; i++)
            {
                var data = new StudentClass
                {
                    ClassId = studentClassModels[i].ClassId,
                    StudentId = studentClassModels[i].StudentId
                };

                datas.Add(data);
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(int id)
        {
            var data = await _context.StudentClasses.FindAsync(id);

            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<StudentClassRepModel>> GetAll(int classId, string? search = null)
        {
            var studentClasses = await _context.StudentClasses.ToListAsync();
            var students = await _context.Students.ToListAsync();

            var dataSc = studentClasses.AsQueryable();
            var dataS = students.AsQueryable();

            var data = dataSc.Where(sc => sc.ClassId == classId)
                .Join(dataS, sc => sc.StudentId, s => s.Id, (sc, s) => new StudentClassRepModel
                {
                    Id = sc.Id,
                    ClassId = sc.ClassId,
                    StudentId = sc.StudentId,
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
                });

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(sc => sc.FullName.ToLower().Contains(search.ToLower()));
            }

            return data.ToList();
        }

        public async Task UpdateAsync(int id, int classId)
        {
            var data = await _context.StudentClasses.FindAsync(id);

            if (data != null)
            {
                data.ClassId = classId;
                await _context.SaveChangesAsync();
            }
        }
    }
}
