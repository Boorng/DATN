using BackendDATN.Entity.VM.Subject;

namespace BackendDATN.IServices
{
    public interface ISubjectServ
    {
        Task<List<SubjectVM>> GetAllByGrade(int grade);

        SubjectVM? GetById(int id);

        SubjectVM Add(SubjectModel subjectModel);

        void Update(SubjectVM subjectVM);

        void Delete(int id);
    }
}
