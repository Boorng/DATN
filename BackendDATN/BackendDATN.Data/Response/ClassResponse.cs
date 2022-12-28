using BackendDATN.Data.VM.Class;
using BackendDATN.Entity.VM.Class;

namespace BackendDATN.Data.Response
{
    public class ClassResponse
    {
        public List<ClassRepModel> Data { get; set; } = new List<ClassRepModel>();

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set; }
    }
}
