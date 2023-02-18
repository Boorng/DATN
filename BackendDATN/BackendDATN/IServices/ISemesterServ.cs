using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Semester;

namespace BackendDATN.IServices
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
