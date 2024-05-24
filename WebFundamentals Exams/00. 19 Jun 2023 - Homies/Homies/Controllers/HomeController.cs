using Microsoft.AspNetCore.Mvc;

namespace Homies.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if (User?.Identity?.IsAuthenticated ?? false)
            {
                return RedirectToAction("All", "Event");
            }

            return View();
        }
    }
}