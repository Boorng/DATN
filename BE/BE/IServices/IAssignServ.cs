using BE.Data.VM.Assign;
using BE.Entity.VM.Assign;

namespace BE.IServices
{
    public interface IAssignServ
    {
        Task<List<AssignResponse>> GetAllAsync(int grade, int subjectId, int? semesterId, string? search = null);

        Task<List<AssignTeacherResponse>?> GetByTeacherId(string teacherId, int semesterId);

        Task AddAsync(AssignModel assignModel);

        Task AddListAsync(List<AssignModel> assignModels);

        Task UpdateAsync(AssignVM assignVM);

        Task DeleteAsync(Guid id);

        Task DeleteById(string? teacherId, string? classId, int? subjectId, int? semesterId);

        Task UpdateClassAssign(Guid id, string classId);
    }
}
