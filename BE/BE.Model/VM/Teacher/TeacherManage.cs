using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Teacher
{
    public class TeacherManage
    {
        public string IdLeader { get; set; }

        public List<string> IdViceLeaders { get; set; } = new List<string>();

    }
}
