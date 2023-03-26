using AutoMapper;
using BE.Data;
using BE.Entity.VM.Account;
using BE.Entity.VM.Assign;
using BE.Entity.VM.Class;
using BE.Entity.VM.Conduct;
using BE.Entity.VM.Group;
using BE.Entity.VM.Semester;
using BE.Entity.VM.Student;
using BE.Entity.VM.StudentClass;
using BE.Entity.VM.Subject;
using BE.Entity.VM.Teacher;
using BE.Entity.VM.Test;

namespace BE.Helper
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
