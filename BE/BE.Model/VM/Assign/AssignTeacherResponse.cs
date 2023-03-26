using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Assign
{
    public class AssignTeacherResponse
    {
        public Guid Id { get; set; }

        public string ClassId { get; set; }

        public string ClassName { get; set; }

        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public int SemesterId { get; set; }

        public string SemesterName { get; set; }
    }
}
