using AutoMapper;
using BE.Data;
using BE.Entity.VM.Conduct;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ConductServ : IConductServ
    {
        private BackendContext _context;

        public readonly IMapper _mapper;

        public ConductServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(ConductModel conductModel)
        {
            var data = new Conduct
            {
                IdConduct = Guid.NewGuid(),
                Evaluate = conductModel.Evaluate,
                Comment = conductModel.Comment,
                SemesterId = conductModel.SemesterId,
                StudentId = conductModel.StudentId
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var data = await _context.Conducts.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteById(string? studentId, int? semesterId)
        {
            if(!string.IsNullOrEmpty(studentId))
            {
                var data = _context.Conducts.Where(c => c.StudentId == studentId);
                _context.RemoveRange(data);
            }
            else
            {
                var data = _context.Conducts.Where(c => c.SemesterId == semesterId);
                _context.RemoveRange(data);
            }
            
            await _context.SaveChangesAsync();
        }

        public async Task<List<ConductVM>> GetAllAsync(string? classId, int? grade, int semesterId)
        {
            var data = await _context.Conducts.Where(c => c.SemesterId == semesterId).ToListAsync();

            var res = data.AsQueryable();

            if(!string.IsNullOrEmpty(classId))
            {
                var sc = await _context.StudentClasses.Where(sc => sc.ClassId == classId).ToListAsync();

                var dataSc = sc.AsQueryable();

                res = res.Join(dataSc,
                                c => c.StudentId,
                                sc => sc.StudentId,
                                (c, sc) => c);
            }
            else
            {
                var cls = await _context.Classes.Where(cls => cls.Grade == grade).ToListAsync();
                var sc = await _context.StudentClasses.ToListAsync();

                var dataCls = cls.AsQueryable();
                var dataSc = sc.AsQueryable();

                dataSc = dataSc.Join(dataCls,
                                       sc => sc.ClassId,
                                       c => c.IdClass,
                                       (sc, c) => sc);

                res = res.Join(dataSc,
                                c => c.StudentId,
                                sc => sc.StudentId,
                                (c, sc) => c);
            }

            var result = res.Select(co => new ConductVM
            {
                Id = co.IdConduct,
                Comment = co.Comment,
                SemesterId = co.SemesterId,
                StudentId = co.StudentId,
                Evaluate = co.Evaluate
            });

            return result.ToList();
        }

        public async Task<ConductVM> GetByIdAsync(string studentId, int semesterId)
        {
            var data = await _context.Conducts.SingleOrDefaultAsync(c => c.StudentId == studentId && c.SemesterId == semesterId);

            if(data != null)
            {
                return _mapper.Map<ConductVM>(data);
            }
            else
            {
                return null;
            }
        }

        public async Task UpdateAsync(ConductVM conductVM)
        {
            var data = await _context.Conducts.FindAsync(conductVM.Id);
            if(data != null)
            {
                data.Evaluate = conductVM.Evaluate;
                data.Comment = conductVM.Comment;
                data.SemesterId = conductVM.SemesterId;
                data.StudentId = conductVM.StudentId;
                await _context.SaveChangesAsync();
            }
        }
    }
}
