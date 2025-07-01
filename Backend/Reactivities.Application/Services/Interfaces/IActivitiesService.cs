using Reactivities.Domain.DTOs.Activity;
using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Application.Services.Interfaces
{
    public interface IActivitiesService
    {
        #region Activities

        Task<List<ActivityDto>> GetAllActivitiesAsync();

        Task<Activity?> GetActivityById(Guid id);

        Task<bool> CreateActivityAsync(ActivityViewModel activity,int userId);

        Task<bool> EditActivityAsync(ActivityViewModel model);

        Task<bool> DeleteActivityAsync(Guid id);

        Task<bool> UpdateAttendeeAsync(UpdateActivityAttendeeDto model);

        #endregion
    }
}
