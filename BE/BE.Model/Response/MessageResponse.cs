namespace BE.Data.Response
{
    public class MessageResponse
    {
        public string Message { get; set; }

        public string Content { get; set; }

        public List<object> DataContent { get; set; } = new List<object>();
    }
}
