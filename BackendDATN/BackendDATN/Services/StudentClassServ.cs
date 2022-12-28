using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Student;
using BackendDATN.Entity.VM.StudentClass;
using BackendDATN.Helper;
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

        public async Task<StudentClassVM> AddAsync(StudentClassModel studentClassModel)
        {
            var data = new StudentClass
            {
                ClassId = studentClassModel.ClassId,
                StudentId = studentClassModel.StudentId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();

            return _mapper.Map<StudentClassVM>(data);
        }

        public async Task<List<StudentClassVM>> AddListAsync(List<StudentClassModel> studentClassModels)
        {
            List<StudentClass> datas = new List<StudentClass>();
            for(int i = 0; i < studentClassModels.Count; i++)
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

            return _mapper.Map<List<StudentClassVM>>(datas);
        }
 

        public async Task DeleteAsync(int id)
        {
            var data = await _context.StudentClasses.FindAsync(id);
            
            if(data != null)
            {
                _context.Remove(id);
                await _context.SaveChangesAsync();
            }
        }

        public List<StudentClassVM> GetAll()
        {
            return _context.StudentClasses.Select(sc => new StudentClassVM
            {
                Id = sc.Id,
                ClassId = sc.ClassId,
                StudentId = sc.StudentId
            }).ToList();
        }

        public StudentClassVM? GetById(int id)
        {
            var data = _context.StudentClasses.SingleOrDefault(sc => sc.Id == id);

            if(data != null)
            {
                return new StudentClassVM
                {
                    Id = data.Id,
                    ClassId = data.ClassId,
                    StudentId = data.StudentId
                };
            }
            else
            {
                return null;
            }
        }

        public async Task<StudentClassResponse> GetByPage(int page, string? search, int ClassId)
        {
            var students = await _context.Students.ToListAsync();
            var studentclasses = await _context.StudentClasses.ToListAsync();
            var dataStudent = students.AsQueryable();
            var dataStudentClass = studentclasses.AsQueryable();

            var data = dataStudentClass
                .Where(sc => sc.ClassId == ClassId)
                .Join(dataStudent, sc => sc.StudentId, s => s.Id, (sc, s) => s);

            if(data != null)
            {
                if (!string.IsNullOrEmpty(search))
                {
                    data = data.Where(s => s.FullName.Contains(search) || s.Id.Contains(search));
                }
                var result = PaginatedList<Student>.Create(data, page, PAGE_SIZE);

                var res = data.ToList();

                return new StudentClassResponse
                {
                    Data = _mapper.Map<List<StudentVM>>(res),
                    HasPreviousPage = result.HasPreviousPage,
                    HasNextPage = result.HasNextPage
                };
            }
            else
            {
                return new StudentClassResponse
                {
                    Data = null,
                    HasPreviousPage = false,
                    HasNextPage = false
                };
            } 
        }

        public async Task UpdateAsync(StudentClassVM studentClassVM)
        {
            var data = await _context.StudentClasses.FindAsync(studentClassVM.Id);

            if(data != null)
            {
                data.ClassId = studentClassVM.ClassId;
                data.StudentId = studentClassVM.StudentId;
                _context.SaveChanges();
            }
        }
    }
}
