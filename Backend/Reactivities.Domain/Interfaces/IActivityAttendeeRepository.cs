using Reactivities.Domain.Models.Attendee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.Interfaces
{
    public interface IActivityAttendeeRepository
    {
        Task InsertAsync(ActivityAttendee activityAttendee);

        Task SaveAsync();
    }
}
