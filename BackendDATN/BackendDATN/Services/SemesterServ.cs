using BackendDATN.Data;
using BackendDATN.Entity.VM.Semester;
using BackendDATN.IServices;

namespace BackendDATN.Services
{
    public class SemesterServ : ISemesterServ
    {
        private BackendContext _context;

        public SemesterServ(BackendContext context)
        {
            _context = context;
        }

        public SemesterVM Add(SemesterModel semesterModel)
        {
            var data = new Semester
            {
                Name = semesterModel.Name,
                SchoolYear = semesterModel.SchoolYear,
                TimeStart = semesterModel.TimeStart,
                TimeEnd = semesterModel.TimeEnd,
            };

            _context.Add(data);
            _context.SaveChanges();

            return new SemesterVM
            {
                Id = data.Id,
                Name = data.Name,
                SchoolYear = data.SchoolYear,
                TimeStart = data.TimeStart,
                TimeEnd = data.TimeEnd,
            };
        }

        public void Delete(int id)
        {
            var data = _context.Semesters.SingleOrDefault(se => se.Id == id);
            if(data != null)
            {
                _context.Remove(data);
                _context.SaveChanges();
            }
        }

        public List<SemesterVM> GetAll()
        {
            return _context.Semesters.Select(se => new SemesterVM
            {
                Id = se.Id,
                Name = se.Name,
                SchoolYear = se.SchoolYear,
                TimeStart = se.TimeStart,
                TimeEnd = se.TimeEnd,
            }).ToList();
        }

        public SemesterVM? GetById(int id)
        {
            var data = _context.Semesters.SingleOrDefault(se => se.Id == id);
            if(data != null)
            {
                return new SemesterVM
                {
                    Id = data.Id,
                    Name = data.Name,
                    SchoolYear = data.SchoolYear,
                    TimeStart = data.TimeStart,
                    TimeEnd = data.TimeEnd
                };
            }
            else
            {
                return null;
            }
        }

        public List<SemesterVM> GetByPage(int page = 1)
        {
            throw new NotImplementedException();
        }

        public void Update(SemesterVM semesterVM)
        {
            var data = _context.Semesters.SingleOrDefault(se => se.Id == semesterVM.Id);
            if (data != null)
            {
                data.Name = semesterVM.Name;
                data.SchoolYear = semesterVM.SchoolYear;
                data.TimeStart = semesterVM.TimeStart;
                data.TimeEnd = semesterVM.TimeEnd;
                _context.SaveChanges();
            }
        }
    }
}
