using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Account
    {
        public Account()
        {
            Students = new HashSet<Student>();
            Teachers = new HashSet<Teacher>();
        }

        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Status { get; set; }
        public int Role { get; set; }

        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}
