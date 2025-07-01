using Reactivities.Domain.Models.Attendee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Reactivities.Domain.Models.User;

public class Activity
{
	#region Properties

	public Guid Id { get; set; }

	public string Title { get; set; }

	public DateTime Date { get; set; }

	public string Description { get; set; }

	public string Category { get; set; }

	public string City { get; set; }

	public string Venue { get; set; }

    public bool IsCancelled { get; set; }
    public string ImageName { get; set; }

    #endregion

    #region Relations

    public ICollection<ActivityAttendee> ActivityAttendees { get; set; }

    #endregion
}