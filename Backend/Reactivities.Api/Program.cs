using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Reactivities.Api.Services.Implementation;
using Reactivities.Api.Services.Interfaces;
using Reactivities.Infra.Data.Context;
using Reactivities.Infra.IOC.DependencyContainer;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

    // تعریف SecurityScheme برای JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "لطفا 'Bearer' و سپس فاصله و توکن JWT خود را وارد کنید.\n\nمثال: \"Bearer eyJhbGciOi...\""
    });

    // اضافه کردن الزام امنیتی به تمام متدها
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});


// Configure database
builder.Services.AddDbContext<ReactivitiesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactiviesConnectionString"))
);

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactivitiesPolicy", policy =>
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:3000")  // Frontend domain
    );
});

// Register custom services
builder.Services.RegisterServices();
builder.Services.AddScoped<ITokenService, TokenService>();

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]));
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,  // Optional: Disable if issuer is not needed
            ValidateAudience = false // Optional: Disable if audience is not needed
        };
    });

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Redirect root to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseCors("ReactivitiesPolicy");  // Enable CORS

app.UseHttpsRedirection();
app.UseStaticFiles();  // Enable static file serving (optional)

app.UseAuthentication();  // Make sure authentication comes before authorization
app.UseAuthorization();

app.MapControllers();  // Map controllers to the request pipeline

app.Run();
