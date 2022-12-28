using BackendDATN.Entity.VM.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.Response
{
    public class StudentResponse
    {
        public List<StudentVM> Data { get; set; } = new List<StudentVM>();

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set; }
    }
}
