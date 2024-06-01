using Stripe;
using Stripe.Forwarding;

namespace BurnOut.Data
{
    public class PaymentService : IPayment
    {
        private readonly IConfiguration _configuration;

        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> CreatePaymentIntentAsync(long amount, string currency)
        {
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = currency,
                PaymentMethodTypes = new List<string> { "card" },
            };
            var service = new PaymentIntentService();
            PaymentIntent intent = await service.CreateAsync(options);


            return intent.ClientSecret;
        }
    }
    
}
