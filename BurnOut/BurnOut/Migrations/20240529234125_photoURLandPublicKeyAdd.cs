using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BurnOut.Migrations
{
    /// <inheritdoc />
    public partial class photoURLandPublicKeyAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Events",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Events",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Events");
        }
    }
}
