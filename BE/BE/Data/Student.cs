using System;
using System.Collections.Generic;

namespace BE.Data
{
    public partial class Student
    {
        public Student()
        {
            Conducts = new HashSet<Conduct>();
            StudentClasses = new HashSet<StudentClass>();
        }

        public string IdStudent { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public int Age { get; set; }
        public string Gender { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Ethnic { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public string? Avatar { get; set; }
        public string FatherName { get; set; } = null!;
        public string FatherCareer { get; set; } = null!;
        public string FatherPhone { get; set; } = null!;
        public string MotherName { get; set; } = null!;
        public string MotherCareer { get; set; } = null!;
        public string MotherPhone { get; set; } = null!;
        public int Status { get; set; }
        public string SchoolYear { get; set; } = null!;
        public Guid AccountId { get; set; }

        public virtual Account Account { get; set; } = null!;
        public virtual ICollection<Conduct> Conducts { get; set; }
        public virtual ICollection<StudentClass> StudentClasses { get; set; }
    }
}
