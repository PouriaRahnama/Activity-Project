using Microsoft.EntityFrameworkCore;
using Reactivities.Domain.Models.Attendee;
using Reactivities.Domain.Models.User;
using System;
namespace Reactivities.Infra.Data.Context
{
    public class ReactivitiesContext:DbContext
    {
        #region Constructor

        public ReactivitiesContext(DbContextOptions<ReactivitiesContext> options):base(options)
        {

        }

        #endregion

        #region User

        public DbSet<Activity> Activities { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        #endregion

    }
}
