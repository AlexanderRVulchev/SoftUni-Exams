using Contacts.Data;
using Contacts.Data.Entities;
using Contacts.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Contacts.Controllers
{
    [Authorize]
    public class ContactsController : Controller
    {
        private readonly ContactsDbContext _context;

        public ContactsController(ContactsDbContext context)
            => _context = context;
        public IActionResult Add()
        {
            ContactFormModel contactModel = new()
            {
            };

            return View(contactModel);
        }

        [HttpPost]
        public IActionResult Add(ContactFormModel contactModel)
        {
            if (!ModelState.IsValid)
            {
                return View(contactModel);
            }

            var contact = new Contact()
            {
                FirstName = contactModel.FirstName,
                LastName = contactModel.LastName,
                Email = contactModel.Email,
                PhoneNumber = contactModel.PhoneNumber,
                Address = contactModel.Address,
                Website = contactModel.Website
            };

            _context.Contacts.Add(contact);
            _context.SaveChanges();

            return RedirectToAction("All", "Contacts");
        }

        public IActionResult All()
        {
            var allContacts = new AllContactsQueryModel()
            {
                Contacts = _context.Contacts
                    .Select(c => new ContactViewModel()
                    {
                        Id = c.Id,
                        FirstName = c.FirstName,
                        LastName = c.LastName,
                        PhoneNumber = c.PhoneNumber,
                        Email = c.Email,
                        Address = c.Address,
                        Website = c.Website
                    })
            };
            return View(allContacts);
        }

        public IActionResult Edit(int id)
        {
            var contact = _context.Contacts.Find(id);

            if (contact == null)
            {
                return BadRequest();
            }

            ContactFormModel contactModel = new ContactFormModel()
            {
                
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Address = contact.Address,
                PhoneNumber = contact.PhoneNumber,
                Website = contact.Website,
                Email = contact.Email
            };

            return View(contactModel);
        }

        [HttpPost]
        public IActionResult Edit(int id, ContactFormModel contactModel)
        {
            var contact = _context.Contacts.Find(id);
            if (contact == null)
            {
                return BadRequest();
            }

            contact.FirstName = contactModel.FirstName;
            contact.LastName = contactModel.LastName;
            contact.Address = contactModel.Address;
            contact.PhoneNumber = contactModel.PhoneNumber;
            contact.Website = contactModel.Website;
            contact.Email = contactModel.Email;

            _context.SaveChanges();
            return RedirectToAction("All", "Contacts");
        }


        [Authorize]
        [HttpPost]
        public IActionResult AddToTeam(int id)
        {
            var contact = _context.Contacts.Find(id);

            if (contact == null)
            {
                return BadRequest();
            }

            string currentUserId = GetUserId();

            var entry = new ApplicationUserContact()
            {
                ContactId = contact.Id,
                ApplicationUserId = currentUserId
            };

            if (_context.ApplicationUsersContacts.Contains(entry))
            {
                return RedirectToAction("All", "Contacts");
            }

            _context.ApplicationUsersContacts.Add(entry);
            _context.SaveChanges();
            return RedirectToAction("All", "Contacts");
        }

        [Authorize]
        [HttpPost]
        public IActionResult RemoveFromTeam(int id)
        {

            var currentUser = GetUserId();
            var contact = _context.Contacts.Find(id);

            if (contact == null)
            {
                return BadRequest();
            }

            var entry = _context.ApplicationUsersContacts.FirstOrDefault(um => um.ApplicationUserId == currentUser && um.ContactId == id);
            _context.ApplicationUsersContacts.Remove(entry);
            _context.SaveChanges();

            return RedirectToAction("Team", "Contacts");
        }

        [Authorize]
        public IActionResult Team()
        {
            string currentUserId = GetUserId();
            var currentUser = _context.Users.Find(currentUserId);

            var allContacts = new AllContactsQueryModel()
            {
                Contacts = _context.ApplicationUsersContacts
                    .Where(um => um.ApplicationUserId == currentUserId)
                    .Select(um => new ContactViewModel()
                    {
                        Id = um.Contact.Id,
                        FirstName = um.Contact.FirstName,
                        LastName = um.Contact.LastName,
                        Email = um.Contact.Email,
                        Website = um.Contact.Website,
                        Address = um.Contact.Address,
                        PhoneNumber = um.Contact.PhoneNumber
                    })
            };

            return View(allContacts);
        }




        private string GetUserId()
           => this.User.FindFirstValue(ClaimTypes.NameIdentifier);

    }
}
