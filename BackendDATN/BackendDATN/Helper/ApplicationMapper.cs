using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Entity.VM.Account;
using BackendDATN.Entity.VM.Assign;
using BackendDATN.Entity.VM.Class;
using BackendDATN.Entity.VM.Conduct;
using BackendDATN.Entity.VM.Group;
using BackendDATN.Entity.VM.Semester;
using BackendDATN.Entity.VM.Student;
using BackendDATN.Entity.VM.StudentClass;
using BackendDATN.Entity.VM.Subject;
using BackendDATN.Entity.VM.Teacher;
using BackendDATN.Entity.VM.Test;

namespace BackendDATN.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Account, AccountVM>().ReverseMap();
            CreateMap<Assign, AssignVM>().ReverseMap();
            CreateMap<Class, ClassVM>().ReverseMap();
            CreateMap<Conduct, ConductVM>().ReverseMap();
            CreateMap<Semester, SemesterVM>().ReverseMap();
            CreateMap<StudentClass, StudentClassVM>().ReverseMap();
            CreateMap<Student, StudentVM>().ReverseMap();
            CreateMap<Subject, SubjectVM>().ReverseMap();
            CreateMap<Teacher, TeacherVM>().ReverseMap();
            CreateMap<Team, TeamVM>().ReverseMap();
            CreateMap<Test, TestVM>().ReverseMap();
        }
    }
}
