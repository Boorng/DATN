﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Data.Login
{
    public class LoginModel
    {
        public string Email { get; set; }

        public string Password { get; set; }   

        public int Role { get; set; }
    }
}
