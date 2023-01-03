using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Class;
using BackendDATN.Entity.VM.Class;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BackendDATN.Services
{
    public class ClassServ : IClassServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public static int PAGE_SIZE { get; set; } = 10;

        public ClassServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(ClassModel classModel)
        {
            var data = new Class
            {
                Name = classModel.Name,
                AcademicYear = classModel.AcademicYear,
                Grade = classModel.Grade,
                HeaderTeacherId = classModel.HeaderTeacherId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var data = await _context.Classes.FindAsync(id);

            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }   
        }

        public async Task<List<ClassRepModel>> GetAll(string? search, int grade)
        {
            var classes = await _context.Classes.ToListAsync();
            var studentClasses = await _context.StudentClasses.ToListAsync();
            var dataClass = classes.AsQueryable();
            var dataStudentClass = studentClasses.AsQueryable();

            var data = dataClass.Where(c => c.Grade == grade).Select(c => new ClassRepModel
            {
                Id = c.Id,
                Name = c.Name,
                AcademicYear = c.AcademicYear,
                Grade = c.Grade,
                HeaderTeacherId = c.HeaderTeacherId,
                HeaderTeacherName = _context.Teachers.Find(c.HeaderTeacherId)!.FullName,
                CountStudent = dataStudentClass.Count(sc => sc.ClassId == c.Id)
            });

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(st => st.Name.Contains(search));
            }

            return data.ToList();

        }

        public async Task UpdateAsync(ClassVM classVM)
        {
            var data = await _context.Classes.FindAsync(classVM.Id);

            if(data != null)
            {
                data.Name = classVM.Name;
                data.AcademicYear = classVM.AcademicYear;
                data.HeaderTeacherId = classVM.HeaderTeacherId;

                await _context.SaveChangesAsync();
            }
        }
    }
}
