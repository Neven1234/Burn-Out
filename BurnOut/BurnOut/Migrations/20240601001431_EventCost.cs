using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BurnOut.Migrations
{
    /// <inheritdoc />
    public partial class EventCost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "AudiencePrice",
                table: "Events",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "RacerPrice",
                table: "Events",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AudiencePrice",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "RacerPrice",
                table: "Events");
        }
    }
}
