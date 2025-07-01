using Reactivities.Domain.Interfaces;
using Reactivities.Domain.Models.Attendee;
using Reactivities.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Infra.Data.Repositories
{
    public class ActivityAttendeeRepository : IActivityAttendeeRepository
    {
        private readonly ReactivitiesContext _context;

        public ActivityAttendeeRepository(ReactivitiesContext context)
        {
            _context = context;
        }

        public async Task InsertAsync(ActivityAttendee activityAttendee)
        {
            await _context.ActivityAttendees.AddAsync(activityAttendee);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
