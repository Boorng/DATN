using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Entity.VM.Teacher
{
    public class TeacherVM : TeacherAdd
    {
        public Guid AccountId { get; set; }

        public string? TeamName { get; set; }
    }
}
