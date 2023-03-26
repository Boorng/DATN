using BE.Entity.VM.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Test
{
    public class TestResponse
    {
        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public List<TestVM> FactorOne { get; set; } = new List<TestVM>();

        public TestVM FactorTwo { get; set; }

        public TestVM FactorThree { get; set; }
    }
}
