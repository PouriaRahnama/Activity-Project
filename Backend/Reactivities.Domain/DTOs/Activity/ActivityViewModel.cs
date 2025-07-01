using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.DTOs.Activity
{
    public class ActivityViewModel
    {
        #region Properties

        public string? Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }
        public IFormFile ImageFile { get; set; }
        public string Venue { get; set; }

        #endregion
    }
}
