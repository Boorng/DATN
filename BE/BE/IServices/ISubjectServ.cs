using BE.Data.Response;
using BE.Entity.VM.Subject;

namespace BE.IServices
{
    public interface ISubjectServ
    {
        Task<List<SubjectVM>> GetAllByGradeAsync(int grade);

        Task AddAsync(SubjectModel subjectModel);

        Task UpdateAsync(SubjectVM subjectVM);

        Task DeleteAsync(int id);

        Task<CheckDataSubjectResponse> CheckData(int subjectId);
    }
}
