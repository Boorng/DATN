using BackendDATN.Data;
using BackendDATN.Helper;
using BackendDATN.IServices;
using BackendDATN.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BackendContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MyDB"));
});

#region Scope
builder.Services.AddScoped<IAccountServ, AccountServ>();

builder.Services.AddScoped<IClassServ, ClassServ>();

builder.Services.AddScoped<IAssignServ, AssignServ>();

builder.Services.AddScoped<IConductServ, ConductServ>();

builder.Services.AddScoped<ITeamServ, TeamServ>();

builder.Services.AddScoped<ISemesterServ, SemesterServ>();

builder.Services.AddScoped<IStudentClassServ, StudentClassServ>();

builder.Services.AddScoped<IStudentServ, StudentServ>();

builder.Services.AddScoped<ISubjectServ, SubjectServ>();

builder.Services.AddScoped<ITeacherServ, TeacherServ>();

builder.Services.AddScoped<ITestServ, TestServ>();

builder.Services.AddScoped<ILoginServ, LoginServ>();
#endregion

builder.Services.AddAutoMapper(typeof(ApplicationMapper));

builder.Services.AddAuthentication();

// Authentication
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var secretKey = builder.Configuration["AppSettings:SecretKey"];
var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            //tự cấp token
            ValidateIssuer = false,
            ValidateAudience = false,

            //ký vào token
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),

            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
