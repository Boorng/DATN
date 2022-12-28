using BackendDATN.Data;
using BackendDATN.Helper;
using BackendDATN.IServices;
using BackendDATN.Services;
using Microsoft.EntityFrameworkCore;

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
#endregion

builder.Services.AddAutoMapper(typeof(ApplicationMapper));


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

app.UseAuthorization();

app.MapControllers();

app.Run();
