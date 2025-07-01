using Reactivities.Domain.DTOs.Activity;
using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.Interfaces
{
    public interface IActivitiesRepository
    {
        #region Activities

        Task<List<ActivityDto>> GetAllActivitiesAsync();

        Task<Activity?> GetActivityById(Guid id);

        Task CreateActivityAsync(Activity activity);

        Task SaveAsync();

        void Update(Activity activity);

        void Delete(Activity activity);

        #endregion
    }
}
