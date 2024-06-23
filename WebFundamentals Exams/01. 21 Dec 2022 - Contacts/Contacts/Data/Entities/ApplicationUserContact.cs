using System.ComponentModel.DataAnnotations.Schema;

namespace Contacts.Data.Entities
{
    public class ApplicationUserContact
    {
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        [ForeignKey("Contact")]
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }
}
