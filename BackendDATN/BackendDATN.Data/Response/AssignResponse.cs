using BackendDATN.Data.VM.Assign;

namespace BackendDATN.Data.Response
{
    public class AssignResponse
    {
        public List<AssignRepModel> Data { get; set; } = new List<AssignRepModel>();

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set; }
    }
}
