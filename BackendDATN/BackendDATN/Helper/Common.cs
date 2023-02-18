using BackendDATN.Data.Response;
using BackendDATN.Entity.VM.Test;

namespace BackendDATN.Helper
{
    public static class Common
    {
        public static double CalculateAverageSemeseterMark(List<StatisticResultResponse> data)
        {
            double sum = 0;
            for(int i = 0; i < data.Count; i++)
            {
                sum += data[i].AverageMark;
            }

            return sum / data.Count;
        }
        public static double AverageMark(List<TestVM> FactorOne, TestVM FactorTwo, TestVM FactorThree)
        {
            double sum = 0;
            int count = 0;
            if(FactorTwo != null)
            {
                sum += FactorTwo.Mark * FactorTwo.MarkWeight;
                count += FactorTwo.MarkWeight;
            }

            if(FactorThree != null)
            {
                sum += FactorThree.Mark * FactorThree.MarkWeight;
                count += FactorThree.MarkWeight;
            }

            if(FactorOne.Count > 0)
            {
                for (int i = 0; i < FactorOne.Count; i++)
                {
                    sum += FactorOne[i].Mark * FactorOne[i].MarkWeight;
                    count += FactorOne[i].MarkWeight;
                }
            }
           
            if(count != 0)
            {
                double res = sum / count;
                return res;
            }
            
            return sum;
        }
    }
}
