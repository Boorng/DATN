using BackendDATN.Entity.VM.Test;

namespace BackendDATN.IServices
{
    public interface ITestServ
    {
        List<TestVM> GetAll();

        List<TestVM> GetByPage(int page = 1);

        TestVM GetById(Guid id);

        TestVM Add(TestModel testModel);

        void Update(TestVM testVM);

        void Delete(Guid id);
    }
}
    