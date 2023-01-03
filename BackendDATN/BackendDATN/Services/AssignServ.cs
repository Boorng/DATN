using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Assign;
using BackendDATN.Entity.VM.Assign;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class AssignServ : IAssignServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public static int PAGE_SIZE { get; set; } = 10;

        public AssignServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AssignVM> AddAsync(AssignModel assignModel)
        {
            var data = new Assign
            {
                Id = Guid.NewGuid(),
                SemesterId = assignModel.SemesterId,
                SubjectId = assignModel.SubjectId,
                ClassId = assignModel.ClassId,
                TeacherId = assignModel.TeacherId,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();

            return _mapper.Map<AssignVM>(data);
        }

        public async Task DeleteAsync(Guid id)
        {
            var data = _context.Assigns.SingleOrDefault(ass => ass.Id == id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<AssignVM>> GetAllAsync()
        {
            var data = await _context.Assigns.ToListAsync();
            
            return _mapper.Map<List<AssignVM>>(data);
        }

        public async Task<AssignVM?> GetByIdAsync(Guid id)
        {
            return _mapper.Map<AssignVM>(await _context.Assigns.FindAsync(id));
            
        }

        public async Task UpdateAsync(AssignVM assignVM)
        {
            var data = await _context.Assigns.FindAsync(assignVM.Id);
            if (data != null)
            {
                data.SemesterId = assignVM.SemesterId;
                data.SubjectId = assignVM.SubjectId;
                data.ClassId = assignVM.ClassId;
                data.TeacherId = assignVM.TeacherId;
                await _context.SaveChangesAsync();
            }
        }
    }
}
