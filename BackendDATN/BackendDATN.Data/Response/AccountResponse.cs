using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackendDATN.Entity.VM.Account;

namespace BackendDATN.Data.Response
{
    public class AccountResponse
    {
        public List<AccountVM> Data { get; set; } = new List<AccountVM>();

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set; }
    }
}
