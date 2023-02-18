using BackendDATN.Entity.VM.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.VM.Test
{
    public class TestStudentResponse
    {
        public int DivisionId { get; set; }

        public string StudentId { get; set; }

        public string StudentName { get; set; }

        public int SubjectId { get; set; }

        public List<TestVM> FactorOne { get; set; } = new List<TestVM>();

        public TestVM FactorTwo { get; set; }

        public TestVM FactorThree { get; set; }
    }
}
