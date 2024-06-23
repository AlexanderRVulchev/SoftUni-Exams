using Microsoft.AspNetCore.Identity;

namespace Contacts.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<ApplicationUserContact> ApplicationUsersContacts { get; set; }
    }
}
