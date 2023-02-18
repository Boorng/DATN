namespace BackendDATN.Data.Response
{
    public class CheckDataStudentResponse
    {
        public bool HaveAccount { get; set; } = false;

        public Guid AccountId { get; set; }

        public bool HaveStudentClass { get; set; } = false;

        public List<int> StudentClassIds { get; set; } = new List<int>();

        public bool HaveTest { get; set; } = false;

        public bool HaveConduct { get; set; } = false;
    }
}
