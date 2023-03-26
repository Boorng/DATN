using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BE.Data
{
    public partial class BackendContext : DbContext
    {
        public BackendContext()
        {
        }

        public BackendContext(DbContextOptions<BackendContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Assign> Assigns { get; set; } = null!;
        public virtual DbSet<Class> Classes { get; set; } = null!;
        public virtual DbSet<Conduct> Conducts { get; set; } = null!;
        public virtual DbSet<Semester> Semesters { get; set; } = null!;
        public virtual DbSet<Student> Students { get; set; } = null!;
        public virtual DbSet<StudentClass> StudentClasses { get; set; } = null!;
        public virtual DbSet<Subject> Subjects { get; set; } = null!;
        public virtual DbSet<Teacher> Teachers { get; set; } = null!;
        public virtual DbSet<Team> Teams { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-BVUK4TK\\SQLEXPRESS;Initial Catalog=Backend;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.IdAccount)
                    .HasName("PK__Account__DA18132C5FBD2741");

                entity.ToTable("Account");

                entity.Property(e => e.IdAccount)
                    .ValueGeneratedNever()
                    .HasColumnName("idAccount");

                entity.Property(e => e.CreatedAt).HasColumnName("created_at");

                entity.Property(e => e.Email)
                    .HasMaxLength(250)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(250)
                    .HasColumnName("password");

                entity.Property(e => e.Role).HasColumnName("role");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            });

            modelBuilder.Entity<Assign>(entity =>
            {
                entity.HasKey(e => e.IdAssign)
                    .HasName("PK__Assign__64CD3ADF52E0F1B8");

                entity.ToTable("Assign");

                entity.Property(e => e.IdAssign)
                    .ValueGeneratedNever()
                    .HasColumnName("idAssign");

                entity.Property(e => e.ClassId)
                    .HasMaxLength(15)
                    .HasColumnName("classId");

                entity.Property(e => e.SemesterId).HasColumnName("semesterId");

                entity.Property(e => e.SubjectId).HasColumnName("subjectId");

                entity.Property(e => e.TeacherId)
                    .HasMaxLength(15)
                    .HasColumnName("teacherId");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Assigns)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Assign_Class");

                entity.HasOne(d => d.Semester)
                    .WithMany(p => p.Assigns)
                    .HasForeignKey(d => d.SemesterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Assign_Semester");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Assigns)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Assign_Subject");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.Assigns)
                    .HasForeignKey(d => d.TeacherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Assign_Teacher");
            });

            modelBuilder.Entity<Class>(entity =>
            {
                entity.HasKey(e => e.IdClass)
                    .HasName("PK__Class__17317A5A0AAD7857");

                entity.ToTable("Class");

                entity.Property(e => e.IdClass)
                    .HasMaxLength(15)
                    .HasColumnName("idClass");

                entity.Property(e => e.AcademicYear).HasColumnName("academicYear");

                entity.Property(e => e.Grade).HasColumnName("grade");

                entity.Property(e => e.HeaderTeacherId)
                    .HasMaxLength(15)
                    .HasColumnName("headerTeacherId");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .HasColumnName("name");

                entity.HasOne(d => d.HeaderTeacher)
                    .WithMany(p => p.Classes)
                    .HasForeignKey(d => d.HeaderTeacherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Class_HeaderTeacher");
            });

            modelBuilder.Entity<Conduct>(entity =>
            {
                entity.HasKey(e => e.IdConduct)
                    .HasName("PK__Conduct__26C0C15EDFF5A1E7");

                entity.ToTable("Conduct");

                entity.Property(e => e.IdConduct)
                    .ValueGeneratedNever()
                    .HasColumnName("idConduct");

                entity.Property(e => e.Comment).HasColumnName("comment");

                entity.Property(e => e.Evaluate)
                    .HasMaxLength(15)
                    .HasColumnName("evaluate");

                entity.Property(e => e.SemesterId).HasColumnName("semesterId");

                entity.Property(e => e.StudentId)
                    .HasMaxLength(15)
                    .HasColumnName("studentId");

                entity.HasOne(d => d.Semester)
                    .WithMany(p => p.Conducts)
                    .HasForeignKey(d => d.SemesterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Conduct_Semester");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Conducts)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Conduct_Student");
            });

            modelBuilder.Entity<Semester>(entity =>
            {
                entity.HasKey(e => e.IdSemester)
                    .HasName("PK__Semester__C6BE14972CDC6214");

                entity.ToTable("Semester");

                entity.Property(e => e.IdSemester).HasColumnName("idSemester");

                entity.Property(e => e.Name)
                    .HasMaxLength(5)
                    .HasColumnName("name");

                entity.Property(e => e.SchoolYear)
                    .HasMaxLength(20)
                    .HasColumnName("schoolYear");

                entity.Property(e => e.TimeEnd)
                    .HasColumnType("date")
                    .HasColumnName("timeEnd");

                entity.Property(e => e.TimeStart)
                    .HasColumnType("date")
                    .HasColumnName("timeStart");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasKey(e => e.IdStudent)
                    .HasName("PK__Student__35B1F88A2EAF102A");

                entity.ToTable("Student");

                entity.HasIndex(e => e.AccountId, "UQ__Student__F267251F7D043C62")
                    .IsUnique();

                entity.Property(e => e.IdStudent)
                    .HasMaxLength(15)
                    .HasColumnName("idStudent");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Avatar).HasColumnName("avatar");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasColumnName("birthday");

                entity.Property(e => e.Ethnic)
                    .HasMaxLength(20)
                    .HasColumnName("ethnic");

                entity.Property(e => e.FatherCareer)
                    .HasMaxLength(50)
                    .HasColumnName("fatherCareer");

                entity.Property(e => e.FatherName)
                    .HasMaxLength(70)
                    .HasColumnName("fatherName");

                entity.Property(e => e.FatherPhone)
                    .HasMaxLength(20)
                    .HasColumnName("fatherPhone");

                entity.Property(e => e.FullName)
                    .HasMaxLength(70)
                    .HasColumnName("fullName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.MotherCareer)
                    .HasMaxLength(50)
                    .HasColumnName("motherCareer");

                entity.Property(e => e.MotherName)
                    .HasMaxLength(70)
                    .HasColumnName("motherName");

                entity.Property(e => e.MotherPhone)
                    .HasMaxLength(20)
                    .HasColumnName("motherPhone");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");

                entity.Property(e => e.SchoolYear)
                    .HasMaxLength(20)
                    .HasColumnName("schoolYear");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.Student)
                    .HasForeignKey<Student>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Account");
            });

            modelBuilder.Entity<StudentClass>(entity =>
            {
                entity.HasKey(e => e.IdStudentClass)
                    .HasName("PK__StudentC__492F9CD3D57CD709");

                entity.ToTable("StudentClass");

                entity.Property(e => e.IdStudentClass).HasColumnName("idStudentClass");

                entity.Property(e => e.ClassId)
                    .HasMaxLength(15)
                    .HasColumnName("classId");

                entity.Property(e => e.StudentId)
                    .HasMaxLength(15)
                    .HasColumnName("studentId");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.StudentClasses)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentClass_Class");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.StudentClasses)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentCLass_Student");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.HasKey(e => e.IdSubject)
                    .HasName("PK__Subject__A324CF9E243DE826");

                entity.ToTable("Subject");

                entity.Property(e => e.IdSubject).HasColumnName("idSubject");

                entity.Property(e => e.Grade).HasColumnName("grade");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.HasKey(e => e.IdTeacher)
                    .HasName("PK__Teacher__582173DE85DE4658");

                entity.ToTable("Teacher");

                entity.HasIndex(e => e.AccountId, "UQ__Teacher__F267251FD20FF4F2")
                    .IsUnique();

                entity.Property(e => e.IdTeacher)
                    .HasMaxLength(15)
                    .HasColumnName("idTeacher");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Avatar).HasColumnName("avatar");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasColumnName("birthday");

                entity.Property(e => e.Ethnic)
                    .HasMaxLength(20)
                    .HasColumnName("ethnic");

                entity.Property(e => e.FullName)
                    .HasMaxLength(70)
                    .HasColumnName("fullName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.IsSeenNotification).HasColumnName("isSeenNotification");

                entity.Property(e => e.Leader).HasColumnName("leader");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.TeamId).HasColumnName("teamId");

                entity.Property(e => e.ViceLeader).HasColumnName("viceLeader");

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.Teacher)
                    .HasForeignKey<Teacher>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Teacher_Account");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Teachers)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_Teacher_Team");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasKey(e => e.IdTeam)
                    .HasName("PK__Team__BCD885CFAB62AC74");

                entity.ToTable("Team");

                entity.Property(e => e.IdTeam).HasColumnName("idTeam");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Notification).HasColumnName("notification");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.HasKey(e => e.IdTest)
                    .HasName("PK__Test__BCD9141A1BFD1596");

                entity.ToTable("Test");

                entity.Property(e => e.IdTest)
                    .ValueGeneratedNever()
                    .HasColumnName("idTest");

                entity.Property(e => e.Comment).HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.Mark).HasColumnName("mark");

                entity.Property(e => e.MarkWeight).HasColumnName("markWeight");

                entity.Property(e => e.SemesterId).HasColumnName("semesterId");

                entity.Property(e => e.StudentClassId).HasColumnName("studentClassId");

                entity.Property(e => e.SubjectId).HasColumnName("subjectId");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Semester)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.SemesterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Test_Semester");

                entity.HasOne(d => d.StudentClass)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.StudentClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Test_StudentClass");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Test_Subject");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
