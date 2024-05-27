using System.ComponentModel.DataAnnotations;

namespace Homies.Models
{
    public class DetailsViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        [Display(Name = "Starting time")]
        public string Start { get; set; } = null!;

        [Display(Name = "Estimated ending time")]
        public string End { get; set; } = null!;

        public string Organiser { get; set; } = null!;

        [Display(Name = "Created on")]
        public string CreatedOn { get; set; } = null!;

        public string Type { get; set; } = null!;
    }
}
