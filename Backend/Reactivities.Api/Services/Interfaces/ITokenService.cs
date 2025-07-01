using Reactivities.Domain.Models.User;

namespace Reactivities.Api.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
