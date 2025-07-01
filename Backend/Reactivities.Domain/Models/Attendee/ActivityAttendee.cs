using Reactivities.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.Models.Attendee
{
    public class ActivityAttendee
    {
        #region Properties

        public int Id { get; set; }

        public int UserId { get; set; }

        public Guid ActivityId { get; set; }

        public bool IsHost { get; set; }

        #endregion

        #region Relations

        public User.User User { get; set; }

        public Activity Activity { get; set; }

        #endregion
    }
}
