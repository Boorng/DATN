using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Class;
using BackendDATN.Entity.VM.Class;
using BackendDATN.Entity.VM.Teacher;
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

        public ClassServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(ClassVM classVM)
        {
            var data = new Class
            {
                IdClass = classVM.Id,
                Name = classVM.Name,
                AcademicYear = classVM.AcademicYear,
                Grade = classVM.Grade,
                HeaderTeacherId = classVM.HeaderTeacherId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var data = await _context.Classes.FindAsync(id);

            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> CheckYear(string academicYear)
        {
            var data = await _context.Classes.FirstOrDefaultAsync(c => c.AcademicYear == academicYear);

            if(data != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<List<ClassRepModel>> GetAll(string? search, int? grade)
        {
            var classes = await _context.Classes.ToListAsync();
            var studentClasses = await _context.StudentClasses.ToListAsync();
            var dataClass = classes.AsQueryable();
            var dataStudentClass = studentClasses.AsQueryable();

            if(grade != null)
            {
                dataClass = dataClass.Where(c => c.Grade == grade);
            }

            var data = dataClass.Select(c => new ClassRepModel
            {
                Id = c.IdClass,
                Name = c.Name,
                AcademicYear = c.AcademicYear,
                Grade = c.Grade,
                HeaderTeacherId = c.HeaderTeacherId,
                HeaderTeacherName = _context.Teachers.Find(c.HeaderTeacherId)!.FullName,
                CountStudent = dataStudentClass.Count(sc => sc.ClassId == c.IdClass)
            });

            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(st => st.AcademicYear.Contains(search));
            }

            return data.ToList();
        }

        public async Task<List<ClassVM>?> GetByHeaderTeacherId(string headerTeacherId, string? academicYear)
        {
            var data = _context.Classes.Where(c => c.HeaderTeacherId == headerTeacherId).AsQueryable();

            if(!string.IsNullOrEmpty(academicYear))
            {
                data = data.Where(c => c.AcademicYear.Contains(academicYear));
            }

            var res = await data.OrderByDescending(c => c.AcademicYear).ToListAsync();

            if(res.Count > 0)
            {
                return _mapper.Map<List<ClassVM>>(res);
            }
            else
            {
                return null;
            }
        }

        public async Task<string> GetTeacherByClassId(string classId)
        {
            var data = await _context.Classes.SingleOrDefaultAsync(c => c.IdClass == classId);

            var res = await _context.Teachers.SingleOrDefaultAsync(t => t.IdTeacher == data.HeaderTeacherId);

            return res!.FullName;
        }

        public async Task UpdateAsync(ClassVM classVM)
        {
            var data = await _context.Classes.FindAsync(classVM.Id);

            if (data != null)
            {
                data.Name = classVM.Name;
                data.AcademicYear = classVM.AcademicYear;
                data.HeaderTeacherId = classVM.HeaderTeacherId;

                await _context.SaveChangesAsync();
            }
        }

        public async Task<CheckDataClassResponse> CheckData(string classId)
        {
            var dataAss = _context.Assigns.AsQueryable();
            var dataSc = _context.StudentClasses.AsQueryable();
            var dataTest = _context.Tests.AsQueryable();

            CheckDataClassResponse res = new CheckDataClassResponse();

            var ass = await dataAss.FirstOrDefaultAsync(ass => ass.ClassId == classId);
            var sc = await dataSc.Where(sc => sc.ClassId == classId).Select(sc => sc.IdStudentClass).ToListAsync();

            if(ass != null)
            {
                res.HaveAssign = true;
            }

            if (sc.Count > 0)
            {
                for (int i = 0; i < sc.Count; i++)
                {
                    var test = await dataTest.FirstOrDefaultAsync(t => t.StudentClassId == sc[i]);
                    if (test != null)
                    {
                        res.HaveTest = true;
                        res.StudentClassIds.Add(sc[i]);
                    }
                }
                res.HaveStudentClass = true;
            }

            return res;
        }
    }
}