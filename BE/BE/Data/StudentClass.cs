﻿using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class StudentClass
    {
        public StudentClass()
        {
            Tests = new HashSet<Test>();
        }

        public int IdStudentClass { get; set; }
        public string ClassId { get; set; } = null!;
        public string StudentId { get; set; } = null!;

        public virtual Class Class { get; set; } = null!;
        public virtual Student Student { get; set; } = null!;
        public virtual ICollection<Test> Tests { get; set; }
    }
}
