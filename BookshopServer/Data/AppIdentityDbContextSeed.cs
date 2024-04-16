using BookshopServer.Data.Static;
using BookshopServer.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace BookshopServer.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAndRolesAsync(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));

                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

                var adminUser = await userManager.FindByEmailAsync("admin@bookshop.com");

                if (adminUser == null)
                {
                    var newAdminUser = new AppUser()
                    {
                        DisplayName = "Admin",
                        UserName = "admin-user",
                        Email = "admin@bookshop.com",
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(newAdminUser, "eonis.it42@FTN");
                    await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
                }

                var appUser = await userManager.FindByEmailAsync("user@bookshop.com");

                if (appUser == null)
                {
                    var newAppUser = new AppUser()
                    {
                        DisplayName = "App User",
                        UserName = "app-user",
                        Email = "user@bookshop.com",
                        EmailConfirmed = true,
                        Address = new Address
                        {
                            FirstName = "App",
                            LastName = "User",
                            Street = "Wall Street",
                            City = "New York",
                            State = "NY",
                            PostalCode = "10005"
                        }
                    };
                    await userManager.CreateAsync(newAppUser, "eonis.it42@FTN");
                    await userManager.AddToRoleAsync(newAppUser, UserRoles.User);
                }
            }
        }
    }
}
