using BackendDATN.Entity.VM.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Data.VM.Test
{
    public class SummaryResponse
    {
        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public double AverageOne { get; set; }

        public double AverageTwo { get; set; }
    }
}
