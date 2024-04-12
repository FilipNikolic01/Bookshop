using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookshopServer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Biogrpahy",
                table: "Authors",
                newName: "Biography");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Biography",
                table: "Authors",
                newName: "Biogrpahy");
        }
    }
}
