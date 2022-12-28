using BackendDATN.Data;
using BackendDATN.Entity.VM.Test;
using BackendDATN.IServices;

namespace BackendDATN.Services
{
    public class TestServ : ITestServ
    {
        private BackendContext _context;

        public TestServ(BackendContext context)
        {
            _context = context;
        }

        public TestVM Add(TestModel testModel)
        {
            var data = new Test
            {
                Name = testModel.Name,
                MarkWeight = testModel.MarkWeight,
                TestTime = testModel.TestTime,
                Comment = testModel.Comment,
                Mark = testModel.Mark,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                SubjectId = testModel.SubjectId,
                SemesterId = testModel.SemesterId,
                DivisionId = testModel.DivisionId,
            };

            _context.Add(data);
            _context.SaveChanges();

            return new TestVM
            {
                Id = data.Id,
                Name = data.Name,
                MarkWeight = data.MarkWeight,
                TestTime = data.TestTime,
                Comment = data.Comment,
                Mark = data.Mark,
                Created_At = data.CreatedAt,
                Updated_At = data.UpdatedAt,
                SubjectId = data.SubjectId,
                SemesterId = data.SemesterId,
                DivisionId = data.DivisionId,
            };
        }

        public void Delete(Guid id)
        {
            var data = _context.Tests.SingleOrDefault(ts => ts.Id == id);
            if(data != null)
            {
                _context.Tests.Remove(data);
                _context.SaveChanges();
            }
        }

        public List<TestVM> GetAll()
        {
            return _context.Tests.Select(ts => new TestVM
            {
                Id = ts.Id,
                Name = ts.Name,
                MarkWeight = ts.MarkWeight,
                TestTime = ts.TestTime,
                Comment = ts.Comment,
                Mark = ts.Mark,
                Created_At = ts.CreatedAt,
                Updated_At = ts.UpdatedAt,
                SubjectId = ts.SubjectId,
                SemesterId = ts.SemesterId,
                DivisionId = ts.DivisionId,
            }).ToList();
        }

        public TestVM GetById(Guid id)
        {
            var data = _context.Tests.SingleOrDefault(ts => ts.Id == id);
            if (data != null)
            {
                return new TestVM
                {
                    Id = data.Id,
                    Name = data.Name,
                    MarkWeight = data.MarkWeight,
                    TestTime = data.TestTime,
                    Comment = data.Comment,
                    Mark = data.Mark,
                    Created_At = data.CreatedAt,
                    Updated_At = data.UpdatedAt,
                    SubjectId = data.SubjectId,
                    SemesterId = data.SemesterId,
                    DivisionId = data.DivisionId,
                };
            }
            else
            {
                return null;
            }
        }

        public List<TestVM> GetByPage(int page = 1)
        {
            throw new NotImplementedException();
        }

        public void Update(TestVM testVM)
        {
            var data = _context.Tests.SingleOrDefault(ts => ts.Id == testVM.Id);
            if (data != null)
            {
                data.Name = testVM.Name;
                data.MarkWeight = testVM.MarkWeight; 
                data.TestTime = testVM.TestTime;
                data.Comment = testVM.Comment;
                data.Mark = testVM.Mark;
                data.CreatedAt = DateTime.Now;
                data.UpdatedAt = DateTime.Now;
                data.SubjectId = testVM.SubjectId;
                data.SemesterId = testVM.SemesterId;
                data.DivisionId = testVM.DivisionId;
                _context.SaveChanges();
            }
        }
    }
}
