using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Application.Extensions
{
    public static class IdenetityExtension
    {
        public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrWhiteSpace(userId))
            {
                return int.Parse(userId);
            }
            else
            {
                return default(int);
            }
        }
    }
}
