using SistemaDePonto.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SistemaDePonto.Maps
{
    public class AuditMap
    {
        public AuditMap(EntityTypeBuilder<Audit> entityBuilder)
        {
            entityBuilder.HasKey(x => x.Id);
            entityBuilder.ToTable("audit");

            entityBuilder.Property(x => x.Id).HasColumnName("id");
            entityBuilder.Property(x => x.IpAddress).HasColumnName("ip_address");
            entityBuilder.Property(x => x.TableName).HasColumnName("table_name");
            entityBuilder.Property(x => x.DateTime).HasColumnName("date_time");
            entityBuilder.Property(x => x.KeyValues).HasColumnName("key_values");
            entityBuilder.Property(x => x.OldValues).HasColumnName("old_values");
            entityBuilder.Property(x => x.NewValues).HasColumnName("new_values");
        }
    }
}