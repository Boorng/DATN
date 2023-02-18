using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Assign
    {
        public Guid IdAssign { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public string ClassId { get; set; } = null!;
        public string TeacherId { get; set; } = null!;

        public virtual Class Class { get; set; } = null!;
        public virtual Semester Semester { get; set; } = null!;
        public virtual Subject Subject { get; set; } = null!;
        public virtual Teacher Teacher { get; set; } = null!;
    }
}
