using Reactivities.Domain.DTOs.User;
using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<LoginResult> LoginAsync(LoginDto model);

        Task<User> GetByEmailAsync(string email);

        Task<User> GetByIdAsync(int id);

        Task<RegisterResult> RegisterAsync(RegisterDto model);
    }
}
