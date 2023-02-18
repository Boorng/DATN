using BackendDATN.Entity.VM.StudentClass;

namespace BackendDATN.Data.VM.StudentClass
{
    public class StudentClassRepModel : StudentClassVM
    {
        public string StudentPhone { get; set; }

        public string FullName { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public string Phone { get; set; }

        public string Ethnic { get; set; }

        public string Address { get; set; }

        public string BirthDay { get; set; }

        public string? Avatar { get; set; }

        public string FatherName { get; set; }

        public string FatherCareer { get; set; }

        public string FatherPhone { get; set; }

        public string MotherName { get; set; }

        public string MotherCareer { get; set; }

        public string MotherPhone { get; set; }

        public string Email { get; set; }

        public int Status { get; set; }

        public string SchoolYear { get; set; }
    }
}
