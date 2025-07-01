using Reactivities.Domain.Models.Attendee;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.Models.User
{
    public class User
    {
        #region Properties

        [Key]
        public int Id { get; set; }

        [Display(Name = "ایمیل")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(350, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string Email { get; set; }

        [Display(Name = "ایمیل")]
        [MaxLength(350, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string? Mobile { get; set; }

        [Display(Name = "نام کاربری")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(350, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string UserName { get; set; }

        [Display(Name = "نام نمایشی")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(350, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string DisplayName { get; set; }

        [Display(Name = "کلمه عبور")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(100, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string Password { get; set; }

        public bool IsEmailActive { get; set; }

        [Display(Name = "آواتار")]
        [MaxLength(70, ErrorMessage = "تعداد کاراکتر وارد شده بیش از حد مجاز است")]
        public string? Avatar { get; set; }

        public DateTime RegisterDate { get; set; }

        #endregion

        #region Relations

        public ICollection<ActivityAttendee> ActivityAttendees { get; set; }

        #endregion

    }
}
