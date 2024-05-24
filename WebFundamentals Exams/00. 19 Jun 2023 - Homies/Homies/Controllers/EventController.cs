using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Claims;

namespace Homies.Controllers
{
    using Contracts;
    using Models;

    [Authorize]
    public class EventController : Controller
    {
        private readonly IEventService eventService;

        public EventController(IEventService _eventService)
        {
            eventService = _eventService;
        }

        public async Task<IActionResult> All()
        {
            var model = await eventService.GetAllEventsAsync();

            return View(model);
        }

        public async Task<IActionResult> Joined()
        {
            string userId = UserId();

            var model = await eventService.GetUserJoinedEventsAsync(userId);

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Add()
        {
            var eventTypes = await eventService.GetAllTypesAsync();

            var model = new EventFormModel
            {
                Types = eventTypes
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add(EventFormModel model)
        {
            bool isStartDateValid = DateTime.TryParseExact(model.Start, "yyyy-MM-dd H:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime validStartDate);
            bool isEndDateValid = DateTime.TryParseExact(model.End, "yyyy-MM-dd H:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime validEndDate);

            if (!isStartDateValid)
            {
                ModelState.AddModelError("", "Invalid start date. Please enter valid date in format \"yyyy-MM-dd H:mm\"");
            }

            if (!isEndDateValid)
            {
                ModelState.AddModelError("", "Invalid end date. Please enter valid date in format \"yyyy-MM-dd H:mm\"");
            }

            if (!ModelState.IsValid)
            {
                model.Types = await eventService.GetAllTypesAsync();
                return View(model);
            }

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            await eventService.AddNewEventAsync(userId, validStartDate, validEndDate, model);

            return RedirectToAction(nameof(All));
        }

        public async Task<IActionResult> Join(int id)
        {
            string userId = UserId();

            try
            {
                await eventService.JoinEventAsync(userId, id);
            }
            catch (InvalidOperationException)
            {
                return RedirectToAction(nameof(All));
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }

            return RedirectToAction(nameof(Joined));
        }

        public async Task<IActionResult> Leave(int id)
        {
            string userId = UserId();

            await eventService.LeaveEventAsync(userId, id);

            return RedirectToAction(nameof(All));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            string userId = UserId();
            var model = new EventFormModel();

            try
            {
                model = await eventService.GetEventForEditAsync(userId, id);
            }
            catch
            {
                return BadRequest();
            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, EventFormModel model)
        {
            bool isStartDateValid = DateTime.TryParseExact(model.Start, "yyyy-MM-dd H:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime validStartDate);
            bool isEndDateValid = DateTime.TryParseExact(model.End, "yyyy-MM-dd H:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime validEndDate);

            if (!isStartDateValid)
            {
                ModelState.AddModelError("", "Invalid start date. Please enter valid date in format \"yyyy-MM-dd H:mm\"");
            }

            if (!isEndDateValid)
            {
                ModelState.AddModelError("", "Invalid end date. Please enter valid date in format \"yyyy-MM-dd H:mm\"");
            }

            if (!ModelState.IsValid)
            {

                try
                {
                    model = await eventService.GetEventForEditAsync(UserId(), id);
                }
                catch
                {
                    return BadRequest();
                }
                
                return View(model);
            }

            string userId = UserId();

            try
            {
                await eventService.EditEventAsync(userId, id, validStartDate, validEndDate, model);
            }
            catch
            {
                return BadRequest();
            }

            return RedirectToAction(nameof(All));
        }

        public async Task<IActionResult> Details(int id)
        {
            var model = await eventService.GetDetailsAsync(id);

            return View(model);
        }

        private string UserId()
            => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
