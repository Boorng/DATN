using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Conduct
    {
        public Guid IdConduct { get; set; }
        public string Evaluate { get; set; } = null!;
        public string Comment { get; set; } = null!;
        public int SemesterId { get; set; }
        public string StudentId { get; set; } = null!;

        public virtual Semester Semester { get; set; } = null!;
        public virtual Student Student { get; set; } = null!;
    }
}
