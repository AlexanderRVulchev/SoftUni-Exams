using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homies.Data.Entities
{
    using static Data.DataConstants.Event;

    public class Event
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; } = null!;
        
        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;
        
        [ForeignKey(nameof(Organiser))]
        public string OrganiserId { get; set; } = null!;
        public IdentityUser Organiser { get; set; } = null!;
        
        public DateTime CreatedOn { get; set; }
        
        public DateTime Start { get; set; }
        
        public DateTime End { get; set; }
        
        [ForeignKey(nameof(Type))]
        public int TypeId { get; set; }
        public Type Type { get; set; } = null!;
        
        public HashSet<EventParticipant> EventsParticipants = new();
    }
}
