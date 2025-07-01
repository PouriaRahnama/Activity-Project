using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reactivities.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class addimageName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Activities");
        }
    }
}
