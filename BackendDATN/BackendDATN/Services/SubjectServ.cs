using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Entity.VM.Subject;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class SubjectServ : ISubjectServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public SubjectServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public SubjectVM Add(SubjectModel subjectModel)
        {
            var data = new Subject
            {
                Name = subjectModel.Name,
                Grade = subjectModel.Grade
            };

            _context.Add(data);
            _context.SaveChanges();

            return new SubjectVM
            {
                Id = data.Id,
                Name = data.Name,
                Grade = data.Grade
            };
        }

        public void Delete(int id)
        {
            var data = _context.Subjects.SingleOrDefault(sb => sb.Id == id);
            if(data != null)
            {
                _context.Remove(data);
                _context.SaveChanges();
            }
        }

        public async Task<List<SubjectVM>> GetAllByGrade(int grade)
        {
            var subjects = await _context.Subjects.ToListAsync();
            var data = subjects.AsQueryable();

            data = data.Where(s => s.Grade == grade);

            return _mapper.Map<List<SubjectVM>>(data);
        }

        public SubjectVM? GetById(int id)
        {
            var data = _context.Subjects.SingleOrDefault(sb => sb.Id == id);
            if (data != null)
            {
                return new SubjectVM
                {
                    Id = data.Id,
                    Name = data.Name,
                    Grade = data.Grade
                };
            }
            else
            {
                return null;
            }
        }

        public void Update(SubjectVM subjectVM)
        {
            var data = _context.Subjects.SingleOrDefault(sb => sb.Id == subjectVM.Id);
            if (data != null)
            {
                data.Name = subjectVM.Name;
                data.Grade = subjectVM.Grade;
                _context.SaveChanges();
            }
        }
    }
}
