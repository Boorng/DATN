using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Team
    {
        public Team()
        {
            Teachers = new HashSet<Teacher>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Notification { get; set; } = null!;

        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}
