using System;
using System.Collections.Generic;

namespace BackendDATN.Data
{
    public partial class Test
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public int MarkWeight { get; set; }
        public int TestTime { get; set; }
        public string Comment { get; set; } = null!;
        public double Mark { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int SubjectId { get; set; }
        public int SemesterId { get; set; }
        public int DivisionId { get; set; }

        public virtual StudentClass Division { get; set; } = null!;
        public virtual Semester Semester { get; set; } = null!;
        public virtual Subject Subject { get; set; } = null!;
    }
}
