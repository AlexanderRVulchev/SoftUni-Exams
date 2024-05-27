using System.ComponentModel.DataAnnotations;

namespace Homies.Models
{
    using static Data.DataConstants.Event;

    public class EventFormModel
    {
        [Required]
        [StringLength(NameMaxLength, MinimumLength = NameMinLength)]
        public string Name { get; set; } = null!;
 
        [Required]
        [StringLength(DescriptionMaxLength, MinimumLength = DescriptionMinLength)]
        public string Description { get; set; } = null!;
 
        [Required(AllowEmptyStrings = false)]
        public string Start { get; set; } = null!;

        [Required(AllowEmptyStrings = false)]
        public string End { get; set; } = null!;
 
        public List<TypeDataModel> Types { get; set; } = new();
 
        public int TypeId { get; set; }
    }
}