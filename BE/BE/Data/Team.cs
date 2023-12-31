﻿using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Team
    {
        public Team()
        {
            Teachers = new HashSet<Teacher>();
        }

        public int IdTeam { get; set; }
        public string Name { get; set; } = null!;
        public string? Notification { get; set; }

        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}
