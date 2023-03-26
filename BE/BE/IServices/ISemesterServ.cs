using BE.Data.Response;
using BE.Entity.VM.Semester;

namespace BE.IServices
{
    public interface ISemesterServ
    {
        Task<List<SemesterVM>> GetAllAsync(string? academicYear);

        Task AddAsync(SemesterModel semesterModel);

        Task UpdateAsync(SemesterVM semesterVM);

        Task DeleteAsync(int id);

        Task<CheckDataSemesterResponse> CheckData(int semesterId);

        Task<string> GetAcademicYear(int semesterId);
    }
}
