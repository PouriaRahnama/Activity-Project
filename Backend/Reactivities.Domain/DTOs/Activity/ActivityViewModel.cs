using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;


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

        [Required(ErrorMessage ="تصویر الزامی است")]
        public IFormFile ImageFile { get; set; }
        public string Venue { get; set; }

        #endregion
    }
}
