using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Subject
    {
        public Subject()
        {
            Assigns = new HashSet<Assign>();
            Tests = new HashSet<Test>();
        }

        public int IdSubject { get; set; }
        public string Name { get; set; } = null!;
        public int Grade { get; set; }

        public virtual ICollection<Assign> Assigns { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
    }
}
