using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Account
    {
        public Guid IdAccount { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Status { get; set; }
        public int Role { get; set; }

        public virtual Student Student { get; set; } = null!;
        public virtual Teacher Teacher { get; set; } = null!;
    }
}
