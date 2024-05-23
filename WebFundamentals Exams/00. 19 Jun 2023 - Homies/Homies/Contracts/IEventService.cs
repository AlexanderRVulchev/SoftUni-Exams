
namespace Homies.Contracts
{
    using Models;

    public interface IEventService
    {
        Task<IEnumerable<AllEventViewModel>> GetAllEventsAsync();

        Task<IEnumerable<AllEventViewModel>> GetUserJoinedEventsAsync(string userId);

        Task<List<TypeDataModel>> GetAllTypesAsync();

        Task AddNewEventAsync(string userId, DateTime validStartDate, DateTime validEndDate, EventFormModel model);

        Task JoinEventAsync(string userId, int id);

        Task LeaveEventAsync(string userId, int id);

        Task<EventFormModel> GetEventForEditAsync(string userId, int id);

        Task EditEventAsync(string userId, int id, DateTime startDate, DateTime endDate, EventFormModel model);

        Task<DetailsViewModel> GetDetailsAsync(int id);
    }
}
