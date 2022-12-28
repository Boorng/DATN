using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendDATN.Entity.VM.Teacher
{
    public class TeacherVM : TeacherAdd
    {
        public Guid AccountId { get; set; }
    }
}
