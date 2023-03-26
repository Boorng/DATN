using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.VM.Assign
{
    public class AssignResponse : AssignRepModel
    {
        public string FullName { get; set; } = null!;

        public int Age { get; set; }

        public string Gender { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Ethnic { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string BirthDay { get; set; }

        public string? Avatar { get; set; }

        public int Level { get; set; }

        public int Status { get; set; }

        public string Email { get; set; }
    }
}
