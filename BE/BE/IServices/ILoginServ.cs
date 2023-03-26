using BE.Data.Login;
using BE.Data.Response;

namespace BE.IServices
{
    public interface ILoginServ
    {
        Task<TokenResponse> Validate(LoginModel loginModel);
    }
}
