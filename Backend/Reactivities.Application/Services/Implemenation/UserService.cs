using Reactivities.Application.Services.Interfaces;
using Reactivities.Domain.DTOs.User;
using Reactivities.Domain.Interfaces;
using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Application.Services.Implemenation
{
    public class UserService : IUserService
    {
        #region Constructor

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #endregion

        #region Methods

        public async Task<LoginResult> LoginAsync(LoginDto model)
        {
            model.Email = model.Email.ToLower().Trim();

            var user = await _userRepository.GetByEmailAsync(model.Email);

            if (user == null)
            {
                return LoginResult.UserNotFound;
            }

            string hashPassword = model.Password;

            if (user.Password != hashPassword)
            {
                return LoginResult.UserNotFound;
            }

            return LoginResult.Success;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            email = email.ToLower().Trim();
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<RegisterResult> RegisterAsync(RegisterDto model)
        {
            model.Email = model.Email.Trim().ToLower();

            if (await _userRepository.DuplicatedEmailAsync(model.Email))
            {
                return RegisterResult.DuplicatedEmail;
            }

            string hashPassword=model.Password;

            User user = new User()
            {
                UserName = model.UserName,
                Avatar = null,
                DisplayName = model.DisplayName,
                Email = model.Email,
                IsEmailActive = false,
                Mobile = null,
                Password = hashPassword,
                RegisterDate = DateTime.Now
            };

            await _userRepository.InsertAsync(user);
            await _userRepository.SaveAsync();

            return RegisterResult.Success;
        }



        #endregion
    }
}
