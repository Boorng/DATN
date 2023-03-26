using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Teacher
    {
        public Teacher()
        {
            Assigns = new HashSet<Assign>();
            Classes = new HashSet<Class>();
        }

        public string IdTeacher { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public int Age { get; set; }
        public string Gender { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Ethnic { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public string? Avatar { get; set; }
        public int Level { get; set; }
        public int Status { get; set; }
        public bool Leader { get; set; }
        public bool ViceLeader { get; set; }
        public bool IsSeenNotification { get; set; }
        public int? TeamId { get; set; }
        public Guid AccountId { get; set; }

        public virtual Account Account { get; set; } = null!;
        public virtual Team? Team { get; set; }
        public virtual ICollection<Assign> Assigns { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
