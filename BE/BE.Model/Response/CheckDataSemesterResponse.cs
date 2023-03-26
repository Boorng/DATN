using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.Response
{
    public class CheckDataSemesterResponse
    {
        public bool HaveTest { get; set; } = false;

        public bool HaveAssign { get; set; } = false;

        public bool HaveConduct { get; set; } = false;
    }
}
