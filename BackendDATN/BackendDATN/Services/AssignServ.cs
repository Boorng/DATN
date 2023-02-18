using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.VM.Assign;
using BackendDATN.Entity.VM.Assign;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class AssignServ : IAssignServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public AssignServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(AssignModel assignModel)
        {
            var data = new Assign
            {
                IdAssign = Guid.NewGuid(),
                SemesterId = assignModel.SemesterId,
                SubjectId = assignModel.SubjectId,
                ClassId = assignModel.ClassId,
                TeacherId = assignModel.TeacherId,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task AddListAsync(List<AssignModel> assignModels)
        {
            List<Assign> datas = new List<Assign>();
            for(int i = 0; i < assignModels.Count; i++)
            {
                var data = new Assign
                {
                    IdAssign = Guid.NewGuid(),
                    SemesterId = assignModels[i].SemesterId,
                    SubjectId = assignModels[i].SubjectId,
                    ClassId = assignModels[i].ClassId,
                    TeacherId = assignModels[i].TeacherId,
                };

                datas.Add(data);
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var data = _context.Assigns.SingleOrDefault(ass => ass.IdAssign == id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteById(string? teacherId, string? classId, int? subjectId, int? semesterId)
        {
            if(!string.IsNullOrEmpty(teacherId))
            {
                var data = _context.Assigns.Where(ass => ass.TeacherId == teacherId);
                _context.RemoveRange(data);
            }
            else if(classId != null)
            {
                var data = _context.Assigns.Where(ass => ass.ClassId == classId);
                _context.RemoveRange(data);
            }
            else if(subjectId != null)
            {
                var data = _context.Assigns.Where(ass => ass.SubjectId == subjectId);
                _context.RemoveRange(data);
            }
            else
            {
                var data = _context.Assigns.Where(ass => ass.SemesterId == semesterId);
                _context.RemoveRange(data);
            }
           
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByTeacherIdAsync(string teacherId)
        {
            var data = _context.Assigns.Where(ass => ass.TeacherId == teacherId);
            if (data != null)
            {
                _context.RemoveRange(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<AssignResponse>> GetAllAsync(int grade, int subjectId, int? semesterId, string? search = null)
        {
            var assigns = await _context.Assigns.ToListAsync();
            var classes = await _context.Classes.ToListAsync();
            var teachers = await _context.Teachers.ToListAsync();

            var dataAssign = assigns.AsQueryable();
            var dataClass = classes.AsQueryable();
            var dataTeacher = teachers.AsQueryable();

            if(semesterId != null)
            {
                dataAssign = dataAssign.Where(ass => ass.SemesterId == semesterId);
            }

            var data = dataClass.Where(c => c.Grade == grade)
                                .Join(dataAssign.Where(ass => ass.SubjectId == subjectId),
                                      c => c.IdClass,
                                      ass => ass.ClassId,
                                      (c, ass) => new AssignRepModel
                                      {
                                          Id = ass.IdAssign,
                                          ClassId = c.IdClass,
                                          ClassName = c.Name,
                                          TeacherId = ass.TeacherId,
                                          SubjectId = ass.SubjectId,
                                          SemesterId = ass.SemesterId,
                                          SemesterName = _context.Semesters.Find(ass.SemesterId)!.Name
                                      }).Join(dataTeacher,
                                            ass => ass.TeacherId,
                                            tc => tc.IdTeacher,
                                            (ass, tc) => new AssignResponse
                                            {
                                                Id = ass.Id,
                                                ClassId = ass.ClassId,
                                                ClassName = ass.ClassName,
                                                TeacherId = ass.TeacherId,
                                                SubjectId = ass.SubjectId,
                                                SemesterId = ass.SemesterId,
                                                SemesterName = ass.SemesterName,
                                                FullName = tc.FullName,
                                                Age = tc.Age,
                                                Gender = tc.Gender,
                                                Address = tc.Address,
                                                Ethnic = tc.Ethnic,
                                                Phone = tc.Phone,
                                                BirthDay = tc.Birthday.ToString("dd/MM/yyyy"),
                                                Avatar = tc.Avatar,
                                                Level = tc.Level,
                                                Status = tc.Status,
                                                Email = _context.Accounts.Find(tc.AccountId)!.Email
                                            }
                                      );
            if (!string.IsNullOrEmpty(search))
            {
                data = data.Where(da => da.FullName.ToLower().Contains(search.ToLower()) || da.TeacherId.ToLower().Contains(search.ToLower()));
            }

            return data.ToList();   
        }

        public async Task<List<AssignTeacherResponse>?> GetByTeacherId(string teacherId, int semesterId)
        {

            var assigns = await _context.Assigns.ToListAsync();
            var classes = await _context.Classes.ToListAsync();

            var dataAss = assigns.AsQueryable();
            var dataCls = classes.AsQueryable();

            var data = assigns.Where(ass => ass.TeacherId == teacherId && ass.SemesterId == semesterId)
                                .Join(classes,
                                    ass => ass.ClassId,
                                    c => c.IdClass,
                                    (ass, c) => new AssignTeacherResponse
                                    {
                                        Id = ass.IdAssign,
                                        ClassId = c.IdClass,
                                        ClassName = c.Name,
                                        SubjectId = ass.SubjectId,
                                        SubjectName = _context.Subjects.Find(ass.SubjectId)!.Name,
                                        SemesterId = ass.SemesterId,
                                        SemesterName = _context.Semesters.Find(ass.SemesterId)!.Name
                                    });

            return data.ToList();
          
            
        }

        public async Task UpdateAsync(AssignVM assignVM)
        {
            var data = await _context.Assigns.FindAsync(assignVM.Id);
            if (data != null)
            {
                data.SubjectId = assignVM.SubjectId;
                data.ClassId = assignVM.ClassId;
                data.TeacherId = assignVM.TeacherId;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateClassAssign(Guid id, string classId)
        {
            var data = await _context.Assigns.FindAsync(id);
            if(data != null)
            {
                data.ClassId = classId;
                await _context.SaveChangesAsync();
            }
        }
    }
}
