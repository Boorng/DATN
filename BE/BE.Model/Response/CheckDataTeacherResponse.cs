using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.Response
{
    public class CheckDataTeacherResponse
    {
        public bool HaveAccount { get; set; } = false;

        public Guid AccountId { get; set; }

        public bool HaveAssign { get; set; } = false;

        public List<string> ClassIds { get; set; } = new List<string>();
    }
}
