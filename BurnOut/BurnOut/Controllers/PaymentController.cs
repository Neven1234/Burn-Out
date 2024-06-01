using BurnOut.Data;
using BurnOut.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BurnOut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPayment _payment;

        public PaymentController(IPayment payment)
        {
           _payment = payment;
        }
        [HttpPost]
        public async Task<IActionResult> ProcessPayment(Payment payment)
        {
            try
            {
                var paymentIntentId = await _payment.CreatePaymentIntentAsync(payment.amount, payment.currency);
                return Ok(paymentIntentId);
            }
            catch (Exception ex)
            {
                // Handle error
                return StatusCode(500, $"Failed to create payment intent: {ex.Message}");
            }
        }
    }
}
