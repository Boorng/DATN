using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.Response
{
    public class StatisticResultResponse
    {
        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public double AverageMark { get; set; }
    }
}
