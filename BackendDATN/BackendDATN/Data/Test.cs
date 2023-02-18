using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Test
    {
        public Guid IdTest { get; set; }
        public string? Comment { get; set; }
        public int MarkWeight { get; set; }
        public double Mark { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int SubjectId { get; set; }
        public int SemesterId { get; set; }
        public int StudentClassId { get; set; }

        public virtual Semester Semester { get; set; } = null!;
        public virtual StudentClass StudentClass { get; set; } = null!;
        public virtual Subject Subject { get; set; } = null!;
    }
}
