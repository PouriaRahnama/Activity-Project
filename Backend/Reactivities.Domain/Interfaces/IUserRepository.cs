using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByEmailAsync(string email);

        Task<User> GetByIdAsync(int id);

        Task<bool> DuplicatedEmailAsync(string email);

        Task InsertAsync(User user);

        Task SaveAsync();
    }
}
