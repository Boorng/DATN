using BackendDATN.Entity.VM.Semester;

namespace BackendDATN.IServices
{
    public interface ISemesterServ
    {
        List<SemesterVM> GetAll();

        List<SemesterVM> GetByPage(int page = 1);

        SemesterVM? GetById(int id);

        SemesterVM Add(SemesterModel semesterModel);

        void Update(SemesterVM semesterVM);

        void Delete(int id);
    }
}
