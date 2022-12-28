using BackendDATN.Entity.VM.Conduct;

namespace BackendDATN.IServices
{
    public interface IConductServ
    {
        List<ConductVM> GetAll();

        List<ConductVM> GetByPage(int page = 1);

        ConductVM? GetById(Guid id);

        ConductVM Add(ConductModel conductModel);

        void Update(ConductVM conductVM);

        void Delete(Guid id);
    }
}
