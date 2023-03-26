using BE.Data.Response;
using BE.Data.VM.Teacher;
using BE.Entity.VM.Account;
using BE.Entity.VM.Group;
using BE.Entity.VM.Teacher;

namespace BE.IServices
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
