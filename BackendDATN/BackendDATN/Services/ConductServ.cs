using BackendDATN.Data;
using BackendDATN.Entity.VM.Conduct;
using BackendDATN.IServices;

namespace BackendDATN.Services
{
    public class ConductServ : IConductServ
    {
        private BackendContext _context;

        public static int PAGE_SIZE { get; set; } = 10;

        public ConductServ(BackendContext context)
        {
            _context = context;
        }

        public ConductVM Add(ConductModel conductModel)
        {
            var data = new Conduct
            {
                Mark = conductModel.Mark,
                Comment = conductModel.Comment,
                SemesterId = conductModel.SemesterId,
                StudentId = conductModel.StudentId
            };

            _context.Add(data);
            _context.SaveChanges();

            return new ConductVM
            {
                Id = data.Id,
                Comment = data.Comment,
                SemesterId = data.SemesterId,
                StudentId = data.StudentId
            };
        }

        public void Delete(Guid id)
        {
            var data = _context.Conducts.SingleOrDefault(co => co.Id == id);
            if(data != null)
            {
                _context.Remove(data);
                _context.SaveChanges();
            }
        }

        public List<ConductVM> GetAll()
        {
            return _context.Conducts.Select(co => new ConductVM
            {
                Id = co.Id,
                Comment = co.Comment,
                SemesterId = co.SemesterId,
                StudentId = co.StudentId
            }).ToList();

            
        }

        public ConductVM? GetById(Guid id)
        {
            var data = _context.Conducts.SingleOrDefault(co => co.Id == id);
            if(data != null)
            {
                return new ConductVM
                {
                    Id = data.Id,
                    Comment = data.Comment,
                    SemesterId = data.SemesterId,
                    StudentId = data.StudentId
                };
            }
            else
            {
                return null;
            }
        }

        public List<ConductVM> GetByPage(int page = 1)
        {
            throw new NotImplementedException();
        }

        public void Update(ConductVM conductVM)
        {
            var data = _context.Conducts.SingleOrDefault(co => co.Id == conductVM.Id);
            if(data != null)
            {
                data.Mark = conductVM.Mark;
                data.Comment = conductVM.Comment;
                data.SemesterId = conductVM.SemesterId;
                data.StudentId = conductVM.StudentId;
                _context.SaveChanges();
            }
        }
    }
}
