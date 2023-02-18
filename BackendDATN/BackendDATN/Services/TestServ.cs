using AutoMapper;
using BackendDATN.Data;
using BackendDATN.Data.Response;
using BackendDATN.Data.VM.Test;
using BackendDATN.Entity.VM.Semester;
using BackendDATN.Entity.VM.Test;
using BackendDATN.Helper;
using BackendDATN.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackendDATN.Services
{
    public class TestServ : ITestServ
    {
        private readonly BackendContext _context;

        private readonly IMapper _mapper;

        public TestServ(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;  
        }

        public async Task AddAsync(TestModel testModel)
        {
            var data = new Test
            {
                IdTest = Guid.NewGuid(),
                Comment = testModel.Comment,
                MarkWeight = testModel.MarkWeight,
                Mark = testModel.Mark,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                SubjectId = testModel.SubjectId,
                SemesterId = testModel.SemesterId,
                StudentClassId = testModel.DivisionId,
            };

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task AddListAsync(List<TestModel> testModels)
        {
            var datas = new List<Test>();

            for(int i = 0; i < testModels.Count; i ++)
            {
                var data = new Test
                {
                    IdTest = Guid.NewGuid(),
                    Comment = testModels[i].Comment,
                    MarkWeight = testModels[i].MarkWeight,
                    Mark = testModels[i].Mark,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    SubjectId = testModels[i].SubjectId,
                    SemesterId = testModels[i].SemesterId,
                    StudentClassId = testModels[i].DivisionId,
                };

                datas.Add(data);
            }

            await _context.AddRangeAsync(datas);
            await _context.SaveChangesAsync();
        }

        public async Task<List<int>> CheckAddMark(string classId, int semesterId, int subjectId)
        {
            var res = new List<int>();
            var dataStu = await _context.StudentClasses.FirstOrDefaultAsync(sc => sc.ClassId == classId);
            var markTwo = await _context.Tests.FirstOrDefaultAsync(t => t.SubjectId == subjectId 
                                                                    && t.SemesterId == semesterId
                                                                    && t.StudentClassId == dataStu!.IdStudentClass 
                                                                    && t.MarkWeight == 2);
            var markThree = await _context.Tests.FirstOrDefaultAsync(t => t.SubjectId == subjectId
                                                                    && t.SemesterId == semesterId
                                                                    && t.StudentClassId == dataStu!.IdStudentClass
                                                                    && t.MarkWeight == 3);
            if (markTwo != null)
            {
                res.Add(2);
            }

            if(markThree != null)
            {
                res.Add(3);
            }

            return res;
        }

        public async Task DeleteAsync(Guid id)
        {
            var data = await _context.Tests.FindAsync(id);
            if(data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteById(int? divisionId, int? semesterId, int? subjectId)
        {
            if(divisionId != null)
            {
                var data = _context.Tests.Where(t => t.StudentClassId == divisionId);
                _context.RemoveRange(data);
            }
            else if(semesterId != null)
            {
                var data = _context.Tests.Where(t => t.SemesterId == semesterId);
                _context.RemoveRange(data);
            }
            else if(subjectId != null)
            {
                var data = _context.Tests.Where(t => t.SubjectId == subjectId);
                _context.RemoveRange(data);
            }
         
            await _context.SaveChangesAsync();
        }

        public async Task<List<TestVM>> GetAllAsync()
        {
            return await _context.Tests.Select(ts => new TestVM
            {
                Id = ts.IdTest,
                Comment = ts.Comment,
                MarkWeight = ts.MarkWeight,
                Mark = ts.Mark,
                Created_At = ts.CreatedAt,
                Updated_At = ts.UpdatedAt,
                SubjectId = ts.SubjectId,
                SemesterId = ts.SemesterId,
                DivisionId = ts.StudentClassId,
            }).ToListAsync();
        }

        public async Task<List<StatisticResponse>> GetStatisticMark(string academicYear, string? classId, int grade)
        {
            var sc = await _context.StudentClasses.ToListAsync();

            var dataSc = sc.AsQueryable();

            if (!string.IsNullOrEmpty(classId))
            {
                dataSc = dataSc.Where(sc => sc.ClassId == classId);
            }
            else
            {
                var cls = await _context.Classes.Where(c => c.Grade == grade && c.AcademicYear == academicYear).ToListAsync();

                var dataCls = cls.AsQueryable();

                dataSc = dataSc.Join(dataCls,
                                            sc => sc.ClassId,
                                            c => c.IdClass,
                                            (sc, c) => sc);
            }

            var dataSubjects = _context.Subjects.Where(s => s.Grade == grade);
            var dataSemester = await _context.Semesters
                .Where(s => s.SchoolYear == academicYear)
                .Select(se => new SemesterVM
                {
                    Id = se.IdSemester,
                    Name = se.Name,
                    SchoolYear = se.SchoolYear,
                    TimeStart = se.TimeStart.ToString("dd/MM/yyyy"),
                    TimeEnd = se.TimeEnd.ToString("dd/MM/yyyy"),
                })
                .OrderByDescending(s => s.Name)
                .ToListAsync();

            var data = dataSc.Select(sc => new
            {
                DivisionId = sc.IdStudentClass,
                StudentId = sc.StudentId,
                dataSemesterOne = dataSubjects.Select(s => new TestResponse
                {
                    SubjectId = s.IdSubject,
                    SubjectName = s.Name,
                    FactorOne = _mapper.Map<List<TestVM>>(_context.Tests
                                    .Where(t => t.SubjectId == s.IdSubject 
                                        && t.StudentClassId == sc.IdStudentClass 
                                        && t.SemesterId == dataSemester[1].Id 
                                        && t.MarkWeight == 1
                                    ).ToList()),
                    FactorTwo = _mapper.Map<TestVM>(_context.Tests.
                                    FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                        && t.StudentClassId == sc.IdStudentClass 
                                        && t.SemesterId == dataSemester[1].Id 
                                        && t.MarkWeight == 2
                                    )),
                    FactorThree = _mapper.Map<TestVM>(_context.Tests.
                                    FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                        && t.StudentClassId == sc.IdStudentClass 
                                        && t.SemesterId == dataSemester[1].Id 
                                        && t.MarkWeight == 3
                                    ))
                }),
                dataSemesterTwo = dataSubjects.Select(s => new TestResponse
                {
                    SubjectId = s.IdSubject,
                    SubjectName = s.Name,
                    FactorOne = _mapper.Map<List<TestVM>>(_context.Tests
                                    .Where(t => t.SubjectId == s.IdSubject
                                        && t.StudentClassId == sc.IdStudentClass
                                        && t.SemesterId == dataSemester[0].Id
                                        && t.MarkWeight == 1
                                    ).ToList()),
                    FactorTwo = _mapper.Map<TestVM>(_context.Tests.
                                    FirstOrDefault(t => t.SubjectId == s.IdSubject
                                        && t.StudentClassId == sc.IdStudentClass
                                        && t.SemesterId == dataSemester[0].Id
                                        && t.MarkWeight == 2
                                    )),
                    FactorThree = _mapper.Map<TestVM>(_context.Tests.
                                    FirstOrDefault(t => t.SubjectId == s.IdSubject
                                        && t.StudentClassId == sc.IdStudentClass
                                        && t.SemesterId == dataSemester[0].Id
                                        && t.MarkWeight == 3
                                    ))
                })
            });

            var res = data.Select(sc => new
            {
                DivisionId = sc.DivisionId,
                StudentId = sc.StudentId,
                MarkSemesterOne = sc.dataSemesterOne.Select(o => new StatisticResultResponse 
                                                    { 
                                                        SubjectId = o.SubjectId,
                                                        SubjectName = o.SubjectName,
                                                        AverageMark = Common.AverageMark(o.FactorOne, o.FactorTwo, o.FactorThree),
                                                    }).ToList(),
                MarkSemesterTwo = sc.dataSemesterTwo.Select(t => new StatisticResultResponse
                {
                    SubjectId = t.SubjectId,
                    SubjectName = t.SubjectName,
                    AverageMark = Common.AverageMark(t.FactorOne, t.FactorTwo, t.FactorThree),
                }).ToList(),
            });

            var result = res.Select(re => new StatisticResponse
            {
                DivisionId = re.DivisionId,
                StudentId = re.StudentId,
                AverageMarkSemesterOne = Common.CalculateAverageSemeseterMark(re.MarkSemesterOne),
                AverageMarkSemesterTwo = Common.CalculateAverageSemeseterMark(re.MarkSemesterTwo)
            });

            return result.ToList();
        }

        public async Task<List<TestStudentResponse>?> GetListTestStudentInClass(string classId, int subjectId, int semesterId)
        {
            var sc = await _context.StudentClasses.ToListAsync();
            var stu = await _context.Students.ToListAsync();
            var test = await _context.Tests.ToListAsync();

            var dataSc = sc.AsQueryable();
            var dataStu = stu.AsQueryable();
            var dataTest = test.AsQueryable();

            var data = dataSc.Where(sc => sc.ClassId == classId)
                .Join(dataStu,
                        sc => sc.StudentId,
                        s => s.IdStudent,
                        (sc, s) => new
                        {
                            StudentId = s.IdStudent,
                            StudentName = s.FullName,
                            DivisionId = sc.IdStudentClass,
                        }).Select(sc => new TestStudentResponse
                        {
                            DivisionId = sc.DivisionId,
                            StudentId = sc.StudentId,
                            StudentName = sc.StudentName,
                            SubjectId = subjectId,
                            FactorOne = _mapper.Map<List<TestVM>>(dataTest
                                                        .Where(t => t.SubjectId == subjectId 
                                                            && t.StudentClassId == sc.DivisionId 
                                                            && t.SemesterId == semesterId 
                                                            && t.MarkWeight == 1
                                                        ).ToList()),
                            FactorTwo = _mapper.Map<TestVM>(dataTest
                                                        .FirstOrDefault(t => t.SubjectId == subjectId 
                                                            && t.StudentClassId == sc.DivisionId 
                                                            && t.SemesterId == semesterId 
                                                            && t.MarkWeight == 2
                                                        )),
                            FactorThree = _mapper.Map<TestVM>(dataTest
                                                        .FirstOrDefault(t => t.SubjectId == subjectId 
                                                            && t.StudentClassId == sc.DivisionId 
                                                            && t.SemesterId == semesterId 
                                                            && t.MarkWeight == 3
                                                        ))
                        });

            return data.OrderBy(sc => sc.StudentId).ToList();
        }

        public async Task<List<TestResponse>?> GetStudentResultAsync(int divisionId, int grade, int semesterId)
        {
            var dataSubjects = _context.Subjects.Where(s => s.Grade == grade);

            var res = dataSubjects.Select(s => new TestResponse
            {
                SubjectId = s.IdSubject,
                SubjectName = s.Name,
                FactorOne = _mapper.Map<List<TestVM>>(_context.Tests
                                                .Where(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == semesterId 
                                                    && t.MarkWeight == 1
                                                    ).ToList()),
                FactorTwo = _mapper.Map<TestVM>(_context.Tests.
                                                FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == semesterId 
                                                    && t.MarkWeight == 2
                                                )),
                FactorThree = _mapper.Map<TestVM>(_context.Tests.
                                                FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == semesterId 
                                                    && t.MarkWeight == 3
                                                ))
            });

            return await res.OrderBy(s => s.SubjectName).ToListAsync();
        }

        public async Task<List<SummaryResponse>> GetSummaryResultAsync(int divisionId, int grade, string academicYear)
        {
            var dataSubjects = _context.Subjects.Where(s => s.Grade == grade);
            var dataSemester = await _context.Semesters
                .Where(s => s.SchoolYear == academicYear)
                .Select(se => new SemesterVM
                {
                    Id = se.IdSemester,
                    Name = se.Name,
                    SchoolYear = se.SchoolYear,
                    TimeStart = se.TimeStart.ToString("dd/MM/yyyy"),
                    TimeEnd = se.TimeEnd.ToString("dd/MM/yyyy"),
                })
                .OrderByDescending(s => s.Name)
                .ToListAsync();


            var dataSemesterOne = dataSubjects.Select(s => new TestResponse
            {
                SubjectId = s.IdSubject,
                SubjectName = s.Name,
                FactorOne = _mapper.Map<List<TestVM>>(_context.Tests
                                                .Where(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[1].Id 
                                                    && t.MarkWeight == 1
                                                ).ToList()),
                FactorTwo = _mapper.Map<TestVM>(_context.Tests
                                                .FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[1].Id 
                                                    && t.MarkWeight == 2
                                                )),
                FactorThree = _mapper.Map<TestVM>(_context.Tests
                                                .FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[1].Id 
                                                    && t.MarkWeight == 3
                                                ))
            });

            var dataSemesterTwo = dataSubjects.Select(s => new TestResponse
            {
                SubjectId = s.IdSubject,
                SubjectName = s.Name,
                FactorOne = _mapper.Map<List<TestVM>>(_context.Tests
                                                .Where(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[0].Id 
                                                    && t.MarkWeight == 1
                                                ).ToList()),
                FactorTwo = _mapper.Map<TestVM>(_context.Tests
                                                .FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[0].Id 
                                                    && t.MarkWeight == 2
                                                )),
                FactorThree = _mapper.Map<TestVM>(_context.Tests
                                                .FirstOrDefault(t => t.SubjectId == s.IdSubject 
                                                    && t.StudentClassId == divisionId 
                                                    && t.SemesterId == dataSemester[0].Id 
                                                    && t.MarkWeight == 3
                                                ))
            });

            var res = await dataSemesterOne.Join(dataSemesterTwo,
                o => o.SubjectId,
                t => t.SubjectId,
                (o, t) => new SummaryResponse
                {
                    SubjectId = o.SubjectId,
                    SubjectName = o.SubjectName,
                    AverageOne = Common.AverageMark(o.FactorOne, o.FactorTwo, o.FactorThree),
                    AverageTwo = Common.AverageMark(t.FactorOne, t.FactorTwo, t.FactorThree)
                }).ToListAsync();

            return res;
        }

        public async Task UpdateAsync(TestVM testVM)
        {
            var data = await _context.Tests.FindAsync(testVM.Id);
            if (data != null)
            {
                data.Comment = testVM.Comment;
                data.Mark = testVM.Mark;
                data.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }
    }
}
