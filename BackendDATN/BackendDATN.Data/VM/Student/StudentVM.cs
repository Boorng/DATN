namespace BackendDATN.Entity.VM.Student
{
    public class StudentVM : StudentAdd
    {
        public Guid AccountId { get; set; }

        public string Password { get; set; }
    }
}
