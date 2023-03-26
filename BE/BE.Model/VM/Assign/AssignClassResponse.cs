using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Assign
{
    public class AssignClassResponse
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string AcademicYear { get; set; }

        public int Grade { get; set; }

        public int DivisionId { get; set; }

        public string HeaderTeacherId { get; set; }
    }
}
