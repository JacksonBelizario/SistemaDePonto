using SistemaDePonto.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace SistemaDePonto.Maps
{
    public class PontoMap
    {
        public PontoMap(EntityTypeBuilder<Ponto> entityBuilder)
        {
            entityBuilder.HasKey(x => x.Id);
            entityBuilder.ToTable("ponto");

            entityBuilder.Property(x => x.Id).HasColumnName("id");
            entityBuilder.Property(x => x.UserId).HasColumnName("user_id");
            entityBuilder.Property(x => x.Dia).HasColumnName("dia");
            entityBuilder.Property(x => x.Entrada).HasColumnName("entrada");
            entityBuilder.Property(x => x.SaidaAlmoco).HasColumnName("saida_almoco");
            entityBuilder.Property(x => x.EntradaAlmoco).HasColumnName("entrada_almoco");
            entityBuilder.Property(x => x.Saida).HasColumnName("saida");
        }
    }
}