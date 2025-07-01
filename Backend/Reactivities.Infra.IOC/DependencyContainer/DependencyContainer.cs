using Microsoft.Extensions.DependencyInjection;
using Reactivities.Application.Services.Implemenation;
using Reactivities.Application.Services.Interfaces;
using Reactivities.Domain.Interfaces;
using Reactivities.Infra.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reactivities.Infra.IOC.DependencyContainer
{
    public static class DependencyContainer
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            #region Repository

            services.AddScoped<IActivitiesRepository, ActivitiesRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IActivityAttendeeRepository, ActivityAttendeeRepository>();

            #endregion

            #region Service

            services.AddScoped<IActivitiesService, ActivitiesService>();
            services.AddScoped<IUserService, UserService>();

            #endregion
        }
    }
}
