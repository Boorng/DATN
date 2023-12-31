﻿using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Class
    {
        public Class()
        {
            Assigns = new HashSet<Assign>();
            StudentClasses = new HashSet<StudentClass>();
        }

        public string IdClass { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string AcademicYear { get; set; } = null!;
        public int Grade { get; set; }
        public string HeaderTeacherId { get; set; } = null!;

        public virtual Teacher HeaderTeacher { get; set; } = null!;
        public virtual ICollection<Assign> Assigns { get; set; }
        public virtual ICollection<StudentClass> StudentClasses { get; set; }
    }
}
