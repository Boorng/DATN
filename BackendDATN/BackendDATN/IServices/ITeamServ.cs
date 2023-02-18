using BackendDATN.Entity.VM.Group;

namespace BackendDATN.IServices
{
    public interface ITeamServ
    {
        Task<List<TeamVM>> GetAllAsync();

        Task AddAsync(TeamModel groupModel);

        Task UpdateAsync(TeamVM groupVM);

        Task DeleteAsync(int id);
    }
}
