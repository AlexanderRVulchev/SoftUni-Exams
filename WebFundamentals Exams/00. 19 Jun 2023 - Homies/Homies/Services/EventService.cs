
using Microsoft.EntityFrameworkCore;

namespace Homies.Services
{
    using Contracts;
    using Data;
    using Data.Entities;
    using Models;

    public class EventService : IEventService
    {
        private readonly HomiesDbContext context;

        public EventService(HomiesDbContext _context)
        {
            this.context = _context;
        }

        public async Task AddNewEventAsync(string userId, DateTime validStartDate, DateTime validEndDate, EventFormModel model)
        {
            var entry = new Event
            {
                Description = model.Description,
                CreatedOn = DateTime.Now,
                End = validEndDate,
                Start = validStartDate,
                Name = model.Name,
                OrganiserId = userId,
                TypeId = model.TypeId
            };

            await context.Events.AddAsync(entry);
            await context.SaveChangesAsync();
        }

        public async Task EditEventAsync(string userId, int id, DateTime startDate, DateTime endDate, EventFormModel model)
        {
            var entity = await context.Events
                .FindAsync(id);

            if (entity == null ||
                entity.OrganiserId != userId)
            {
                throw new ArgumentNullException(nameof(entity), "Unable to retrieve event");
            }

            entity.Start = startDate;
            entity.End = endDate;
            entity.Description = model.Description;
            entity.Name = model.Name;
            entity.TypeId = model.TypeId;

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AllEventViewModel>> GetAllEventsAsync()
            => await context.Events
                .Include(e => e.Type)
                .Select(e => new AllEventViewModel
                {
                    Id = e.Id,
                    Name = e.Name,
                    Start = e.Start.ToString("yyyy-MM-dd H:mm"),
                    Type = e.Type.Name,
                    Organiser = e.Organiser.Email
                })
                .ToArrayAsync();

        public async Task<List<TypeDataModel>> GetAllTypesAsync()
            => await context.Types
                .Select(t => new TypeDataModel
                {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToListAsync();

        public async Task<DetailsViewModel> GetDetailsAsync(int id)
        {
            var entry = await context.Events
                .Where(e => e.Id == id)
                .Include(e => e.Organiser)
                .Include(e => e.Type)
                .FirstOrDefaultAsync();

            if (entry == null)
            {
                throw new ArgumentNullException(nameof(entry), "Invalid event.");
            }

            return new DetailsViewModel
            {
                Id = entry.Id,
                CreatedOn = entry.CreatedOn.ToString("dd-MM-yyyy H:mm"),
                Description = entry.Description,
                End = entry.End.ToString("dd-MM-yyyy H:mm"),
                Name = entry.Name,
                Organiser = entry.Organiser.UserName,
                Start = entry.Start.ToString("dd-MM-yyyy H:mm"),
                Type = entry.Type.Name
            };
        }          

        public async Task<EventFormModel> GetEventForEditAsync(string userId, int id)
        {
            var entity = await context.Events
                .FindAsync(id);

            if (entity == null ||
                entity.OrganiserId != userId)
            {
                throw new ArgumentNullException(nameof(entity), "Unable to retrieve event");
            }

            return new EventFormModel
            {
                Name = entity.Name,
                Description = entity.Description,
                End = entity.End.ToString("yyyy-MM-dd H:mm"),
                Start = entity.Start.ToString("yyyy-MM-dd H:mm"),
                Types = await GetAllTypesAsync(),
                TypeId = entity.TypeId
            };
        }

        public async Task<IEnumerable<AllEventViewModel>> GetUserJoinedEventsAsync(string userId)
            => await context.Events
                .Where(e => e.EventsParticipants.Any(ep => ep.HelperId == userId))
                .Include(e => e.Type)
                .Select(e => new AllEventViewModel
                {
                    Id = e.Id,
                    Name = e.Name,
                    Start = e.Start.ToString("yyyy-MM-dd H:mm"),
                    Type = e.Type.Name,
                    Organiser = e.Organiser.Email
                })
                .ToArrayAsync();

        public async Task JoinEventAsync(string userId, int id)
        {
            if (!await context.Events.AnyAsync(e => e.Id == id))
            {
                throw new ArgumentException("Invalid event id");
            }

            if (await context.EventsParticipants.AnyAsync(ep => ep.HelperId == userId && ep.EventId == id))
            {
                throw new InvalidOperationException("Event already joined.");
            }

            EventParticipant entry = new EventParticipant
            {
                EventId = id,
                HelperId = userId
            };

            await context.EventsParticipants.AddAsync(entry);
            await context.SaveChangesAsync();
        }

        public async Task LeaveEventAsync(string userId, int id)
        {
            var entry = await context.EventsParticipants
                .Where(ep => ep.HelperId == userId && ep.EventId == id)
                .FirstOrDefaultAsync();

            if (entry != null)
            {
                context.EventsParticipants.Remove(entry);
                await context.SaveChangesAsync();
            }
        }
    }
}
