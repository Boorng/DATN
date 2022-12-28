using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Entity.VM.Assign
{
    public class AssignModel
    {
        public int SemesterId { get; set; }

        public int SubjectId { get; set; }

        public int ClassId { get; set; }

        public string TeacherId { get; set; }
    }
}
