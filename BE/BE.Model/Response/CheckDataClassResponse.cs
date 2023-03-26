using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.Response
{
    public class CheckDataClassResponse
    {
        public bool HaveAssign { get; set; } = false;

        public bool HaveStudentClass { get; set; } = false;

        public List<int> StudentClassIds { get; set; } = new List<int>();

        public bool HaveTest { get; set; } = false;
    }
}
