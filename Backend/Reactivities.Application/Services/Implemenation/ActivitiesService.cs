using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Services.Interfaces;
using Reactivities.Domain.DTOs.Activity;
using Reactivities.Domain.Interfaces;
using Reactivities.Domain.Models.Attendee;
using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Application.Services.Implemenation
{
    public class ActivitiesService : IActivitiesService
    {
        #region Constructor

        private readonly IActivitiesRepository _activitiesRepository;
        private readonly IActivityAttendeeRepository _activityAttendeeRepository;
        private readonly IUserRepository _userRepository;

        public ActivitiesService(IActivitiesRepository activitiesRepository, IActivityAttendeeRepository activityAttendeeRepository, IUserRepository userRepository)
        {
            _activitiesRepository = activitiesRepository;
            _activityAttendeeRepository = activityAttendeeRepository;
            _userRepository = userRepository;
        }

        #endregion

        #region Activities

        public async Task<List<ActivityDto>> GetAllActivitiesAsync()
        {
            return await _activitiesRepository.GetAllActivitiesAsync();
        }

        public async Task<ActivityDto?> GetActivity(Guid id)
        {
            return await _activitiesRepository.GetActivity(id);
        }

        public async Task<Activity?> GetActivityById(Guid id)
        {
            return await _activitiesRepository.GetActivityById(id);
        }

        public async Task<bool> CreateActivityAsync(ActivityViewModel activity, int userId)
        {
            if (activity is null)
            {
                return false;
            }

            var model = new Activity()
            {
                Id = Guid.Parse(activity.Id!),
                Category = activity.Category,
                City = activity.City,
                Date = activity.Date,
                Description = activity.Description,
                Title = activity.Title,
                Venue = activity.Venue,
                IsCancelled = false
            };
            // ✅ ذخیره تصویر در صورت وجود
            if (activity.ImageFile != null)
            {
                var imageName = Guid.NewGuid().ToString() + Path.GetExtension(activity.ImageFile.FileName);
                var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", imageName);

                // ساخت پوشه اگر وجود نداشت
                var folder = Path.GetDirectoryName(savePath);
                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                using var stream = new FileStream(savePath, FileMode.Create);
                await activity.ImageFile.CopyToAsync(stream);

                model.ImageName = imageName;
            }
            await _activitiesRepository.CreateActivityAsync(model);
            await _activitiesRepository.SaveAsync();

            var attendee = new ActivityAttendee()
            {
                ActivityId = model.Id,
                IsHost = true,
                UserId = userId
            };

            await _activityAttendeeRepository.InsertAsync(attendee);
            await _activityAttendeeRepository.SaveAsync();

            return true;

        }

        public async Task<bool> EditActivityAsync(ActivityViewModel model)
        {
            if (string.IsNullOrEmpty(model.Id))
                return false;

            var id = Guid.Parse(model.Id);
            var activity = await _activitiesRepository.GetActivityById(id);

            if (activity == null)
                return false;

            activity.Title = model.Title;
            activity.Description = model.Description;
            activity.Category = model.Category;
            activity.City = model.City;
            activity.Venue = model.Venue;
            activity.Date = model.Date;

            // ✅ اگر تصویر جدیدی ارسال شده
            if (model.ImageFile != null)
            {
                // 🧹 حذف تصویر قبلی (در صورت وجود)
                if (!string.IsNullOrEmpty(activity.ImageName))
                {
                    var oldPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", activity.ImageName);
                    if (File.Exists(oldPath))
                        File.Delete(oldPath);
                }

                // 💾 ذخیره تصویر جدید
                var imageName = Guid.NewGuid().ToString() + Path.GetExtension(model.ImageFile.FileName);
                var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", imageName);

                var folder = Path.GetDirectoryName(savePath);
                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                using var stream = new FileStream(savePath, FileMode.Create);
                await model.ImageFile.CopyToAsync(stream);

                activity.ImageName = imageName;
            }

            _activitiesRepository.Update(activity);
            await _activitiesRepository.SaveAsync();

            return true;
        }


        public async Task<bool> DeleteActivityAsync(Guid id)
        {
            var activity = await _activitiesRepository.GetActivityById(id);
            if (activity == null)
            {
                return false;
            };

            _activitiesRepository.Delete(activity);
            await _activitiesRepository.SaveAsync();

            return true;
        }

        public async Task<bool> UpdateAttendeeAsync(UpdateActivityAttendeeDto model)
        {
            var activity = await _activitiesRepository.GetActivityById(model.ActivityId);

            if (activity == null)
                return false;

            var user = await _userRepository.GetByIdAsync(model.UserId);

            if (user == null)
                return false;

            var hostUser = activity.ActivityAttendees
                .FirstOrDefault(a => a.IsHost)?
                .User;

            var attendee = activity.ActivityAttendees
                .FirstOrDefault(a => a.UserId == user.Id);

            if (attendee != null && hostUser.Id == user.Id)
            {
                activity.IsCancelled = !activity.IsCancelled;
            }

            if (attendee != null && hostUser.Id != user.Id)
            {
                activity.ActivityAttendees.Remove(attendee);
            }

            if (attendee == null)
            {
                attendee = new ActivityAttendee()
                {
                    UserId = user.Id,
                    IsHost = false,
                    ActivityId = activity.Id
                };

                activity.ActivityAttendees.Add(attendee);
            }

            await _activitiesRepository.SaveAsync();

            return true;
        }

        #endregion
    }
}
