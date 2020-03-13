using SistemaDePonto.Maps;
using Microsoft.EntityFrameworkCore;

namespace SistemaDePonto.Models
{
    public class SistemaDbContext : DbContext
    {
        public SistemaDbContext(DbContextOptions<SistemaDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Ponto> Pontos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            new UserMap(modelBuilder.Entity<User>());

            new PontoMap(modelBuilder.Entity<Ponto>());
        }
    }
}
