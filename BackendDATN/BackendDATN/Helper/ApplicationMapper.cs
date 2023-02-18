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
            CreateMap<Account, AccountVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdAccount))
                .ReverseMap();
            CreateMap<Assign, AssignVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdAssign))
                .ReverseMap();
            CreateMap<Class, ClassVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdClass))
                .ReverseMap();
            CreateMap<Conduct, ConductVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdConduct))
                .ReverseMap();
            CreateMap<Semester, SemesterVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdSemester))
                .ReverseMap();
            CreateMap<StudentClass, StudentClassVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdStudentClass))
                .ReverseMap();
            CreateMap<Student, StudentVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdStudent))
                .ReverseMap();
            CreateMap<Subject, SubjectVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdSubject))
                .ReverseMap();
            CreateMap<Teacher, TeacherVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdTeacher))
                .ReverseMap();
            CreateMap<Team, TeamVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdTeam))
                .ReverseMap();
            CreateMap<Test, TestVM>()
                .ForMember(dest => dest.Id, act => act.MapFrom(src => src.IdTest))
                .ReverseMap();
        }
    }
}
