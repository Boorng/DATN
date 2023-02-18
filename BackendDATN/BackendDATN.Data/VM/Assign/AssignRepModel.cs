using BackendDATN.Entity.VM.Assign;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.VM.Assign
{
    public class AssignRepModel : AssignVM
    {
        public string ClassName { get; set; }

        public string SemesterName { get; set; }
    }
}
