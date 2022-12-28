using BackendDATN.Entity.VM.Group;

namespace BackendDATN.IServices
{
    public interface ITeamServ
    {
        List<TeamVM> GetAll();

        List<TeamVM> GetByPage(int page = 1);

        TeamVM GetById(int id);

        TeamVM Add(TeamModel groupModel);

        void Update(TeamVM groupVM);

        void Delete(int id);
    }
}
