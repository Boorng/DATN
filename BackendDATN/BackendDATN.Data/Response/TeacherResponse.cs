using BackendDATN.Entity.VM.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.Response
{
    public class TeacherResponse
    {
        public List<TeacherVM> Data { get; set; } = new List<TeacherVM>();

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set; }
    }
}
