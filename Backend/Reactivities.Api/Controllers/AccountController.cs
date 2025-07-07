using Application.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Api.Services.Interfaces;
using Reactivities.Application.Services.Interfaces;
using Reactivities.Domain.DTOs.User;

namespace Reactivities.Api.Controllers
{
    public class AccountController : BaseApiController
    {
        #region Constructor

        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AccountController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        #endregion

        #region Actions

        #region Login

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin(LoginDto model)
        {
            var result = await _userService.LoginAsync(model);

            switch (result)
            {
                case LoginResult.Success:
                    var user = await _userService.GetByEmailAsync(model.Email);

                    string token = _tokenService.CreateToken(user);
                    return new JsonResult(new UserDto()
                    {
                        Avatar = user.Avatar,
                        DisplayName = user.DisplayName,
                        Token = token,
                        UserName = user.UserName
                    });

                case LoginResult.Error:
                    return Unauthorized();

                case LoginResult.UserNotFound:
                    return Unauthorized();

            }

            return Ok();
        }


        #endregion

        #region Register

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> PostRegister([FromBody] RegisterDto model)
        {
            #region Validations

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            #endregion

            var result = await _userService.RegisterAsync(model);

            switch (result)
            {
                case RegisterResult.Success:

                    var user = await _userService.GetByEmailAsync(model.Email);

                    return new JsonResult(new UserDto()
                    {
                        Avatar = user.Avatar,
                        DisplayName = user.DisplayName,
                        Token = _tokenService.CreateToken(user),
                        UserName = user.UserName
                    });

                case RegisterResult.Error:
                    return BadRequest("Operation failed");

                case RegisterResult.DuplicatedEmail:
                    return BadRequest("Email is exists");
            }

            return BadRequest();
        }

        #endregion

        #region Get current user

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userService.GetByIdAsync(User.GetUserId());

            return new JsonResult(new UserDto()
            {
                Avatar = user.Avatar,
                DisplayName = user.DisplayName,
                UserName = user.UserName               
            });
        }

        #endregion

        #endregion

    }
}
