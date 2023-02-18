using BackendDATN.Data.VM.Test;
using BackendDATN.Entity.VM.Test;

namespace BackendDATN.IServices
{
    public interface ITestServ
    {
        Task<List<TestVM>> GetAllAsync();

        Task<List<StatisticResponse>> GetStatisticMark(string academicYear, string? classId, int grade);

        Task<List<TestStudentResponse>?> GetListTestStudentInClass(string classId, int subjectId, int semesterId);

        Task<List<TestResponse>?> GetStudentResultAsync(int divisionId, int grade, int semesterId);

        Task<List<SummaryResponse>> GetSummaryResultAsync(int divisionId, int grade, string academicYear);

        Task AddAsync(TestModel testModel);

        Task AddListAsync(List<TestModel> testModels);

        Task<List<int>> CheckAddMark(string classId, int semesterId, int subjectId);
      
        Task UpdateAsync(TestVM testVM);

        Task DeleteAsync(Guid id);

        Task DeleteById(int? divisionId, int? semesterId, int? subjectId);
    }
}
    