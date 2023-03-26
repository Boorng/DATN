using AutoMapper;
using BE.Data;
using BE.Data.VM.Assign;
using BE.Data.VM.StudentClass;
using BE.Entity.VM.Class;
using BE.Entity.VM.StudentClass;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
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
                _context.Remove(id);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteByIdAsync(string? studentId, string? classId)
        {
            if(!string.IsNullOrEmpty(studentId))
            {
                var data = _context.StudentClasses.Where(sc => sc.StudentId == studentId);
                _context.RemoveRange(data);
            }
            else
            {
                var data = _context.StudentClasses.Where(sc => sc.ClassId == classId);
                _context.RemoveRange(data);
            }
            
            await _context.SaveChangesAsync();
            
        }

        public async Task<List<StudentClassRepModel>> GetAll(string classId, string? search = null)
        {
            var studentClasses = await _context.StudentClasses.ToListAsync();
            var students = await _context.Students.ToListAsync();

            var dataSc = studentClasses.AsQueryable();
            var dataS = students.AsQueryable();

            var data = dataSc.Where(sc => sc.ClassId == classId)
                .Join(dataS, sc => sc.StudentId, s => s.IdStudent, (sc, s) => new StudentClassRepModel
                {
                    Id = sc.IdStudentClass,
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
                    SchoolYear = s.SchoolYear

                });

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(sc => sc.FullName.ToLower().Contains(search.ToLower()) || sc.StudentId.ToLower().Contains(search.ToLower()));
            }

            return data.ToList();
        }

        public async Task<List<AssignClassResponse>> GetByStudentId(string studentId)
        {
            var dataSc = _context.StudentClasses.Where(sc => sc.StudentId == studentId);
            var dataCls = _context.Classes.AsQueryable();

            var data = dataSc.Join(dataCls,
                                    sc => sc.ClassId,
                                    c => c.IdClass,
                                    (sc, c) => new AssignClassResponse
                                    {
                                        Id = sc.ClassId,
                                        Name = c.Name,
                                        AcademicYear = c.AcademicYear,
                                        Grade = c.Grade,
                                        DivisionId = sc.IdStudentClass,
                                        HeaderTeacherId = c.HeaderTeacherId,
                                    });

            return await data.OrderBy(sc => sc.Name).ToListAsync();
        }

        public async Task UpdateAsync(int id, string classId)
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
