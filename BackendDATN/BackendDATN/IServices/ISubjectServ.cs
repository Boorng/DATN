using BackendDATN.Entity.VM.Subject;

namespace BackendDATN.IServices
{
    public interface ISubjectServ
    {
        Task<List<SubjectVM>> GetAllByGradeAsync(int grade);

        Task AddAsync(SubjectModel subjectModel);

        Task UpdateAsync(SubjectVM subjectVM);

        Task DeleteAsync(int id);
    }
}
