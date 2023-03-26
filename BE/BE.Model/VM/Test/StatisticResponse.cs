using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Test
{
    public class StatisticResponse
    {
        public int DivisionId { get; set; }

        public string StudentId { get; set; }

        public double AverageMarkSemesterOne { get; set; }

        public double AverageMarkSemesterTwo { get; set; }
    }
}
