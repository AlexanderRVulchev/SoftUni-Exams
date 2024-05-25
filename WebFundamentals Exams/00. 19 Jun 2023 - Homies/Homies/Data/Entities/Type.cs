using System.ComponentModel.DataAnnotations;

namespace Homies.Data.Entities
{
    using static Data.DataConstants.Type;

    public class Type
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(TypeNameMaxLength)]
        public string Name { get; set; } = null!;
        
        public HashSet<Event> Events { get; set; } = new();
    }
}
