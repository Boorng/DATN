using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Conduct
    {
        public Guid Id { get; set; }
        public int Mark { get; set; }
        public string Comment { get; set; } = null!;
        public int SemesterId { get; set; }
        public string StudentId { get; set; } = null!;

        public virtual Semester Semester { get; set; } = null!;
        public virtual Student Student { get; set; } = null!;
    }
}
