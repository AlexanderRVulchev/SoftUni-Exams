using Microsoft.EntityFrameworkCore.Query;

namespace Contacts.Data
{
    public class DataConstants
    {
        public static class AppUser
        {
            public const int AppUserNameMinLength = 5;
            public const int AppUserNameMaxLength = 20;

            public const int AppUserEmailMinLength = 10;
            public const int AppUserEmailMaxLength = 60;

            public const int AppUserPasswordMinLength = 5;
            public const int AppUserPasswordMaxLength = 20;
        }

        public static class Contact
        {
            public const int ContactFirstNameMinLength = 2;
            public const int ContactFirstNameMaxLength = 50;

            public const int ContactLastNameMinLength = 5;
            public const int ContactLastNameMaxLength = 50;

            public const int ContactEmailMinLength = 10;
            public const int ContactEmailMaxLength = 60;

            public const int ContactPhoneNumberMinLength = 10;
            public const int ContactPhoneNumberMaxLength = 13;

            public const string ContactWebsiteRegex = @"^((www\.[A-Za-z0-9-]+.bg)|)$";
        }
    }
}
