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

        public async Task AddAsync(SubjectModel subjectModel)
        {
            var data = new Subject
            {
                Name = subjectModel.Name,
                Grade = subjectModel.Grade
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var data = await _context.Subjects.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<SubjectVM>> GetAllByGradeAsync(int grade)
        {
            var subjects = await _context.Subjects.ToListAsync();
            var data = subjects.AsQueryable();

            data = data.Where(s => s.Grade == grade);

            return _mapper.Map<List<SubjectVM>>(data);
        }

        public async Task UpdateAsync(SubjectVM subjectVM)
        {
            var data = await _context.Subjects.FindAsync(subjectVM.Id);
            if (data != null)
            {
                data.Name = subjectVM.Name;
                data.Grade = subjectVM.Grade;
                await _context.SaveChangesAsync();
            }
        }
    }
}
