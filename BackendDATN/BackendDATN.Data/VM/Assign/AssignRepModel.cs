using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.VM.Assign
{
    public class AssignRepModel
    {
        public Guid Id { get; set; }

        public int ClassId { get; set; }

        public string ClassName { get; set; }

        public string TeacherId { get; set; }

        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public string TeacherName { get; set; }

        public int SemesterId { get; set; }

        public string SemesterName { get; set; }
    }
}
