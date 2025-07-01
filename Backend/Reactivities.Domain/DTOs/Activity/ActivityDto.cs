using Reactivities.Domain.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.DTOs.Activity
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public string HostUserName { get; set; }

        public bool IsCancelled { get; set; }
        public string ImageName { get; set; }

        public List<ProfileDto> Attendees { get; set; }

    }
}
