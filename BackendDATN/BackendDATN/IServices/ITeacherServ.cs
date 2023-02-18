using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Teacher;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Group;
using BackendDATN.Entity.VM.Teacher;

namespace BackendDATN.IServices
{
    public interface ITeacherServ
    {
        Task<List<TeacherVM>> GetAllAsync(string? search, int? teamId);

        Task<List<TeacherVM>> GetAllNoLeaveAsync(string? search, int? teamId);

        Task<TeacherVM?> GetByAccountId(Guid accountId);

        Task<TeamVM?> GetTeam(int teamId);

        Task<string> AddAsync(TeacherAdd teacherAdd);

        Task<List<TeacherAccount>> AddListAsync(List<TeacherAdd> teacherAdds);

        Task UpdateAsync(TeacherVM teacherVM);

        Task UpdateTeacherTeam(string teacherId);

        Task UpdateTeam(int teamId, List<string>? teacherIds);

        Task UpdateManageTeam(TeacherManage teacherManage);

        Task<TeacherManage> GetAllManage(int teamId);

        Task DeleteAsync(string id);

        Task UploadImageAsync(string id, string avatar);

        Task<CheckDataTeacherResponse> CheckData(string id);

        Task UpdateSeenNotification(string teacherId);
    }
}
