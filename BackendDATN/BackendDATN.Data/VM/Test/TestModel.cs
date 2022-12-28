using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Entity.VM.Test
{
    public class TestModel
    {
        public string Name { get; set; }

        public int MarkWeight { get; set; }

        public int TestTime { get; set; }

        public string Comment { get; set; } = "";

        public double Mark { get; set; }

        public DateTime Created_At { get; set; }

        public DateTime Updated_At { get; set; }

        public int SubjectId { get; set; }

        public int SemesterId { get; set; }

        public int DivisionId { get; set; }
    }
}
