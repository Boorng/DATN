using BE.Data;
using BE.Data.Response;
using BE.Entity.VM.Semester;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class SemesterServ : ISemesterServ
    {
        private BackendContext _context;

        public SemesterServ(BackendContext context)
        {
            _context = context;
        }

        public async Task AddAsync(SemesterModel semesterModel)
        {
            var data = new Semester
            {
                Name = semesterModel.Name,
                SchoolYear = semesterModel.SchoolYear,
                TimeStart = DateTime.Parse(semesterModel.TimeStart),
                TimeEnd = DateTime.Parse(semesterModel.TimeEnd),
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task<CheckDataSemesterResponse> CheckData(int semesterId)
        {
            var dataConduct = await _context.Conducts.SingleOrDefaultAsync(s => s.SemesterId == semesterId);
            var dataAssign = await _context.Assigns.SingleOrDefaultAsync(s => s.SemesterId == semesterId);
            var dataTest = await _context.Tests.SingleOrDefaultAsync(s => s.SemesterId == semesterId);

            CheckDataSemesterResponse res = new CheckDataSemesterResponse();

            if(dataConduct != null)
            {
                res.HaveConduct = true;
            }

            if(dataAssign != null)
            {
                res.HaveAssign = true;
            }

            if(dataTest != null)
            {
                res.HaveTest = true;
            }

            return res;
        }

        public async Task DeleteAsync(int id)
        {
            var data = await _context.Semesters.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<SemesterVM>> GetAllAsync(string? academicYear)
        {
            var res = _context.Semesters.AsQueryable();

            if(!string.IsNullOrEmpty(academicYear))
            {
                res = res.Where(s => s.SchoolYear == academicYear);
            }

            return await res.Select(se => new SemesterVM
            {
                Id = se.IdSemester,
                Name = se.Name,
                SchoolYear = se.SchoolYear,
                TimeStart = se.TimeStart.ToString("dd/MM/yyyy"),
                TimeEnd = se.TimeEnd.ToString("dd/MM/yyyy"),
            }).OrderByDescending(s => s.Name).ToListAsync();
        }

        public async Task<string> GetAcademicYear(int semesterId)
        {
            var data = await _context.Semesters.FindAsync(semesterId);
            return data.SchoolYear;
        }

        public async Task UpdateAsync(SemesterVM semesterVM)
        {
            var data = await _context.Semesters.FindAsync(semesterVM.Id);
            if (data != null)
            {
                data.Name = semesterVM.Name;
                data.SchoolYear = semesterVM.SchoolYear;
                data.TimeStart = DateTime.Parse(semesterVM.TimeStart);
                data.TimeEnd = DateTime.Parse(semesterVM.TimeEnd);
                await _context.SaveChangesAsync();
            }
        }
    }
}
