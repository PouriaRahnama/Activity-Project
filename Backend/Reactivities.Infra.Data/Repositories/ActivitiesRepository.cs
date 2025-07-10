using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.DTOs.Activity;
using Reactivities.Domain.DTOs.User;
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
    public class ActivitiesRepository : IActivitiesRepository
    {
        #region Constructor

        private readonly ReactivitiesContext _context;

        public ActivitiesRepository(ReactivitiesContext context)
        {
            _context = context;
        }

        #endregion

        #region Activities

        public async Task<List<ActivityDto>> GetAllActivitiesAsync()
        {
            return await _context.Activities
                .Include(a => a.ActivityAttendees)
                .ThenInclude(a => a.User)
                .Select(a => new ActivityDto()
                {
                    City = a.City,
                    ImageName = a.ImageName,
                    Title = a.Title,
                    Venue = a.Venue,
                    Id = a.Id,
                    Description = a.Description,
                    Date = a.Date,
                    Category = a.Category,
                    IsCancelled = a.IsCancelled,
                    HostUserName = a.ActivityAttendees.FirstOrDefault(aa => aa.IsHost).User.UserName,
                    Attendees = a.ActivityAttendees.Select(aa => new ProfileDto()
                    {
                        UserName = aa.User.UserName,
                        Bio = aa.User.DisplayName,
                        DisplayName = aa.User.DisplayName,
                        Image = aa.User.Avatar
                    })
                    .ToList(),

                })
                .ToListAsync();
        }

        public async Task<ActivityDto?> GetActivity(Guid id)
        {
            return await _context.Activities
               .Include(a => a.ActivityAttendees)
               .ThenInclude(a => a.User)
               .Select(a => new ActivityDto()
               {
                   City = a.City,
                   ImageName = a.ImageName,
                   Title = a.Title,
                   Venue = a.Venue,
                   Id = a.Id,
                   Description = a.Description,
                   Date = a.Date,
                   Category = a.Category,
                   IsCancelled = a.IsCancelled,
                   HostUserName = a.ActivityAttendees.FirstOrDefault(aa => aa.IsHost).User.UserName,
                   Attendees = a.ActivityAttendees.Select(aa => new ProfileDto()
                   {
                       UserName = aa.User.UserName,
                       Bio = aa.User.DisplayName,
                       DisplayName = aa.User.DisplayName,
                       Image = aa.User.Avatar
                   })
                   .ToList(),

               })
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Activity?> GetActivityById(Guid id)
        {
            return await _context.Activities.Include(a => a.ActivityAttendees).ThenInclude(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task CreateActivityAsync(Activity activity)
        {
            await _context.Activities.AddAsync(activity);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(Activity activity)
        {
            _context.Activities.Update(activity);
        }

        public void Delete(Activity activity)
        {
            _context.Activities.Remove(activity);
        }

        #endregion
    }
}
