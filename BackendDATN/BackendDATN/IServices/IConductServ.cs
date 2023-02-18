﻿using BackendDATN.Data.VM.Conduct;
using BackendDATN.Entity.VM.Conduct;

namespace BackendDATN.IServices
{
    public interface IConductServ
    {
        Task<List<ConductVM>> GetAllAsync(string? classId, int? grade, int semesterId);

        Task<ConductVM> GetByIdAsync(string studentId, int semesterId);

        Task AddAsync(ConductModel conductModel);

        Task UpdateAsync(ConductVM conductVM);

        Task DeleteAsync(Guid id);

        Task DeleteById(string? studentId, int? semesterId);
    }
}
