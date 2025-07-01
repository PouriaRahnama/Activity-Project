using Application.Extensions;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Services.Interfaces;
using Reactivities.Domain.DTOs.Activity;

namespace Reactivities.Api.Controllers
{

    public class ActivitiesController : BaseApiController
    {
        #region Constructor
        private readonly IActivitiesService _activitiesService;
        public ActivitiesController(IActivitiesService activitiesService)
        {
            _activitiesService = activitiesService;
        }
        #endregion

        #region Activities list

        [HttpGet]
       // [Authorize]
        public async Task<IActionResult> GetAllActivities()
        {
            var activities = await _activitiesService.GetAllActivitiesAsync();
            return new JsonResult(activities);
        }

        #endregion

        #region Get activity

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var activity = await _activitiesService.GetActivityById(id);

            return new JsonResult(activity);
        }

        #endregion

        #region Create acitiviy

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateActivity([FromForm] ActivityViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new
                {
                    code = 101,
                    message = "لطفا تمام اطلاعات خواسته شده را وارد کنید."
                });
            }
            if (model.ImageFile == null || model.ImageFile.Length == 0)
            {
                return new JsonResult(new
                {
                    code = 103,
                    message = "لطفا یک تصویر انتخاب کنید."
                });
            }

            var activity = await _activitiesService.CreateActivityAsync(model,1);


            if (activity)
            {
                return new JsonResult(new
                {
                    code = 100,
                    message = "فعالیت با موفقیت ایجاد شد."
                });
            }
            else
            {
                return new JsonResult(new
                {
                    code = 102,
                    message = "خطایی رخ داده است."
                });
            }
        }

        #endregion

        #region Update

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> UpdateActivity([FromForm] ActivityViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new
                {
                    code = 101,
                    message = "لطفا تمام اطلاعات خواسته شده را وارد کنید."
                });
            }

            var result = await _activitiesService.EditActivityAsync(model);

            if (result)
            {
                return new JsonResult(new
                {
                    code = 100,
                    message = "فعالیت با موفقیت ویرایش شد."
                });
            }
            else
            {
                return new JsonResult(new
                {
                    code = 102,
                    message = "خطایی رخ داده است یا فعالیت یافت نشد."
                });
            }
        }


        #endregion

        #region Delete

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new JsonResult(new
                {
                    code = 102,
                    message = "مقدار ارسال شده صحیح نمی باشد."
                });
            }

            var result = await _activitiesService.DeleteActivityAsync(Guid.Parse(id));
            if (result)
            {
                return new JsonResult(new
                {
                    code = 100,
                    message = "فعالیت با موفقیت حذف شد."
                });
            }
            else
            {
                return new JsonResult(new
                {
                    code = 102,
                    message = "خطایی رخ داده است."
                });
            }
        }

        #endregion

        #region Update activity attendee

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            var model = new UpdateActivityAttendeeDto()
            {
                ActivityId = id,
                UserId = User.GetUserId()
            };

            var result = await _activitiesService.UpdateAttendeeAsync(model);
            if (result)
            {
                return new JsonResult(new
                {
                    code = 100,
                    message = "عملیات با موفقیت انجام شد."
                });
            }
            else
            {
                return new JsonResult(new
                {
                    code = 400,
                    message = "خطایی رخ داده است."
                });
            }
        }

        #endregion

    }
}
