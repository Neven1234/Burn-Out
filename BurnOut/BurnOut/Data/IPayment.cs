namespace BurnOut.Data
{
    public interface IPayment
    {
        Task<string> CreatePaymentIntentAsync(long amount, string currency);
    }
}
