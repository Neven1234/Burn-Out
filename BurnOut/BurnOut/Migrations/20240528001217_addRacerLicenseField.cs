using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BurnOut.Migrations
{
    /// <inheritdoc />
    public partial class addRacerLicenseField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "License",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "License",
                table: "AspNetUsers");
        }
    }
}
