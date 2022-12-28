using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class StudentClass
    {
        public StudentClass()
        {
            Tests = new HashSet<Test>();
        }

        public int Id { get; set; }
        public int ClassId { get; set; }
        public string StudentId { get; set; } = null!;

        public virtual Class Class { get; set; } = null!;
        public virtual Student Student { get; set; } = null!;
        public virtual ICollection<Test> Tests { get; set; }
    }
}
