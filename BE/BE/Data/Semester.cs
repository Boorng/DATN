using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Semester
    {
        public Semester()
        {
            Assigns = new HashSet<Assign>();
            Conducts = new HashSet<Conduct>();
            Tests = new HashSet<Test>();
        }

        public int IdSemester { get; set; }
        public string Name { get; set; } = null!;
        public string SchoolYear { get; set; } = null!;
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }

        public virtual ICollection<Assign> Assigns { get; set; }
        public virtual ICollection<Conduct> Conducts { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }
}
