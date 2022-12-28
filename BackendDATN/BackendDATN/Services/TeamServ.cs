using BackendDATN.Data;
using BackendDATN.Entity.VM.Group;
using BackendDATN.IServices;

namespace BackendDATN.Services
{
    public class TeamServ : ITeamServ
    {
        private BackendContext _context;

        public TeamServ(BackendContext context)
        {
            _context = context;
        }

        public TeamVM Add(TeamModel groupModel)
        {
            var data = new Team
            {
                Name = groupModel.Name,
                Notification = groupModel.Notification,
            };

            _context.Add(data);
            _context.SaveChanges();

            return new TeamVM
            {
                Id = data.Id,
                Name = data.Name,
                Notification = data.Notification
            };
        }

        public void Delete(int id)
        {
            var data = _context.Teams.SingleOrDefault(g => g.Id == id);
            if(data != null)
            {
                _context.Remove(data);
                _context.SaveChanges();
            }
        }

        public List<TeamVM> GetAll()
        {
            return _context.Teams.Select(g => new TeamVM {
                Id = g.Id,
                Name = g.Name,
                Notification = g.Notification
            }).ToList();
        }


        public TeamVM? GetById(int id)
        {
            var data = _context.Teams.SingleOrDefault(g => g.Id == id);
            if(data != null)
            {
                return new TeamVM
                {
                    Id = data.Id,
                    Name = data.Name,
                    Notification = data.Notification
                };
            }
            else
            {
                return null;
            }
        }

        public List<TeamVM> GetByPage(int page = 1)
        {
            throw new NotImplementedException();
        }

        public void Update(TeamVM groupVM)
        {
            var data = _context.Teams.SingleOrDefault(g => g.Id == groupVM.Id);
            if(data != null)
            {
                data.Name = groupVM.Name;
                data.Notification = groupVM.Notification;
                _context.SaveChanges();
            }
        }
    }
}
