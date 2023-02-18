using BackendDATN.Data.Login;
using BackendDATN.Data.Response;

namespace BackendDATN.IServices
{
    public interface ILoginServ
    {
        Task<TokenResponse> Validate(LoginModel loginModel);
    }
}
