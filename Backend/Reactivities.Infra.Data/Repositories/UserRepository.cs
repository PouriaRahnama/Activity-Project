using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Interfaces;
using Reactivities.Domain.Models.User;
using Reactivities.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Infra.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        #region Constructor

        private readonly ReactivitiesContext _context;

        public UserRepository(ReactivitiesContext context)
        {
            _context = context;
        }

        #endregion

        #region Methods

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users
                 .FirstOrDefaultAsync(user => user.Email == email);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users
                 .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<bool> DuplicatedEmailAsync(string email)
        {
            return await _context.Users.AnyAsync(user => user.Email == email);
        }

        public async Task InsertAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        #endregion
    }
}
