using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Domain.DTOs.User
{
    public class ProfileDto
    {
        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string Image { get; set; }
    }
}
