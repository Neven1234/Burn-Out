using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BurnOut.Migrations
{
    /// <inheritdoc />
    public partial class RolesSeedsHandeled : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44fab3f2-5e85-4c63-846f-a57ef7a30208");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a95e347-d918-4891-a43a-6341d063db40");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a408a82-0dc0-4762-9f5a-d3a645da69b1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b983ccf-ed5c-4a3a-9fcc-219f43480cf0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", "1", "Admin", "ADMIN" },
                    { "2", "2", "Organizer", "ORGANIZER" },
                    { "3", "3", "Racer", "RACER" },
                    { "4", "4", "Audience", "AUDIENCE" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "44fab3f2-5e85-4c63-846f-a57ef7a30208", "1", "Audience", "Audience" },
                    { "5a95e347-d918-4891-a43a-6341d063db40", "1", "Organizer", "Organizer" },
                    { "7a408a82-0dc0-4762-9f5a-d3a645da69b1", "1", "Admin", "Admin" },
                    { "8b983ccf-ed5c-4a3a-9fcc-219f43480cf0", "1", "Racer", "Racer" }
                });
        }
    }
}
