using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Class;
using BackendDATN.Entity.VM.Class;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

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

        public async Task<ClassVM> AddAsync(ClassModel classModel)
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

            return _mapper.Map<ClassVM>(data);
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

        public List<ClassVM> GetAll()
        {
            return _context.Classes.Select(c => new ClassVM
            {
                Id = c.Id,
                Name = c.Name,
                AcademicYear = c.AcademicYear,
                Grade = c.Grade,
                HeaderTeacherId = c.HeaderTeacherId

            }).ToList();
        }

        public ClassVM? GetById(int id)
        {
            var data = _context.Classes.SingleOrDefault(c => c.Id == id);
            if (data != null)
            {
                return new ClassVM
                {
                    Id = data.Id,
                    Name = data.Name,
                    AcademicYear = data.AcademicYear,
                    Grade = data.Grade,
                    HeaderTeacherId = data.HeaderTeacherId
                };
            }
            else
            {
                return null;
            }
        }

        public async Task<ClassResponse> GetByPageAsync(int page, int grade, string? search)
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

            var result = PaginatedList<ClassRepModel>.Create(data, page, PAGE_SIZE);

            var res = result.ToList();

            ClassResponse classResponse = new ClassResponse
            {
                Data = res,
                HasPreviousPage = result.HasPreviousPage,
                HasNextPage = result.HasNextPage
            };

            return classResponse;
        }

        public async Task UpdateAsync(ClassVM classVM)
        {
            var data = await _context.Classes.FindAsync(classVM.Id);

            if(data != null)
            {
                data.Name = classVM.Name;
                data.AcademicYear = classVM.AcademicYear;
                data.Grade = classVM.Grade;
                data.HeaderTeacherId = classVM.HeaderTeacherId;

                await _context.SaveChangesAsync();
            }
        }
    }
}
