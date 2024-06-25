namespace Contacts.Models
{
    public class AllContactsQueryModel
    {
        public IEnumerable<ContactViewModel> Contacts { get; set; }
            = new List<ContactViewModel>();
    }
}
