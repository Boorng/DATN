namespace BackendDATN.Entity.VM.Teacher
{
    public class TeacherModel
    {
        public string Id { get; set; }

        public string FullName { get; set; } = null!;

        public int Age { get; set; }

        public string Gender { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Ethnic { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string BirthDay { get; set; }

        public string? Avatar { get; set; }

        public int Level { get; set; }

        public int Status { get; set; }

        public bool Leader { get; set; }

        public bool ViceLeader { get; set; }

        public int? TeamId { get; set; }
    }
}
