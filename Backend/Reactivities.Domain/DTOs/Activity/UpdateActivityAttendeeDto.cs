using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.DTOs.Activity
{
    public class UpdateActivityAttendeeDto
    {
        public Guid ActivityId { get; set; }

        public int UserId { get; set; }
    }
}
