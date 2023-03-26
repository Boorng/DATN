using BE.Data;
using BE.Entity.VM.Group;
using BE.IServices;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class TeamServ : ITeamServ
    {
        private BackendContext _context;

        public TeamServ(BackendContext context)
        {
            _context = context;
        }

        public async Task AddAsync(TeamModel groupModel)
        {
            var data = new Team
            {
                Name = groupModel.Name,
                Notification = groupModel.Notification,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var data = await _context.Teams.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<TeamVM>> GetAllAsync()
        {
            return await _context.Teams.Select(g => new TeamVM {
                Id = g.IdTeam,
                Name = g.Name,
                Notification = g.Notification
            }).ToListAsync();
        }

        public List<TeamVM> GetByPage(int page = 1)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(TeamVM groupVM)
        {
            var data = await _context.Teams.FindAsync(groupVM.Id);
            if(data != null)
            {
                data.Name = groupVM.Name;
                if(data.Notification != groupVM.Notification && !string.IsNullOrEmpty(data.Notification))
                {
                    var dataTeacher = await _context.Teachers.Where(t => t.TeamId == data.IdTeam).Select(t => t.IdTeacher).ToListAsync();
                    for(int i = 0; i < dataTeacher.Count; i++)
                    {
                        var dataUpdate = await _context.Teachers.FindAsync(dataTeacher[i]);
                        dataUpdate!.IsSeenNotification = false;
                    }

                    data.Notification = groupVM.Notification;
                }
                
                await _context.SaveChangesAsync();
            }
        }
    }
}
