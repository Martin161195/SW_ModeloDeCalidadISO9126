using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAdmin.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Caracteristica> Caracteristica { get; set; }
        public virtual DbSet<CaracteristicasProyecto> CaracteristicasProyecto { get; set; }
        public virtual DbSet<Cuenta> Cuenta { get; set; }
        public virtual DbSet<Metrica> Metrica { get; set; }
        public virtual DbSet<PonderacionCaracteristica> PonderacionCaracteristica { get; set; }
        public virtual DbSet<PonderacionMetrica> PonderacionMetrica { get; set; }
        public virtual DbSet<PonderacionSubcaracteristica> PonderacionSubcaracteristica { get; set; }
        public virtual DbSet<Proyecto> Proyecto { get; set; }
        public virtual DbSet<Reporte> Reporte { get; set; }
        public virtual DbSet<Subcaracteristica> Subcaracteristica { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=217.61.98.133;User=swmciso9126;Password=SWMCISO9126gcm_DB123.;Database=swmciso9126");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Caracteristica>(entity =>
            {
                entity.HasKey(e => e.IdCaracteristica);

                entity.Property(e => e.IdCaracteristica)
                    .HasColumnName("idCaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<CaracteristicasProyecto>(entity =>
            {
                entity.HasKey(e => e.IdCaracteristicasProyecto);

                entity.HasIndex(e => e.IdProyecto)
                    .HasName("fk_caractpro_proyec");

                entity.Property(e => e.IdCaracteristicasProyecto)
                    .HasColumnName("idCaracteristicasProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NombreCaracteristica)
                    .HasColumnName("nombreCaracteristica")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.ValorCaracteristica)
                    .HasColumnName("valorCaracteristica")
                    .HasColumnType("varchar(45)");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.CaracteristicasProyecto)
                    .HasForeignKey(d => d.IdProyecto)
                    .HasConstraintName("fk_caractpro_proyec");
            });

            modelBuilder.Entity<Cuenta>(entity =>
            {
                entity.HasKey(e => e.IdCuenta);

                entity.Property(e => e.IdCuenta)
                    .HasColumnName("idCuenta")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Contraseña)
                    .HasColumnName("contraseña")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Usuario)
                    .HasColumnName("usuario")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<Metrica>(entity =>
            {
                entity.HasKey(e => e.IdMetrica);

                entity.HasIndex(e => e.IdCaracteristica)
                    .HasName("fk_met_carac");

                entity.HasIndex(e => e.IdSubcaracteristica)
                    .HasName("fk_met_subcarac");

                entity.Property(e => e.IdMetrica)
                    .HasColumnName("idMetrica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdCaracteristica)
                    .HasColumnName("idCaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdSubcaracteristica)
                    .HasColumnName("idSubcaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.IdCaracteristicaNavigation)
                    .WithMany(p => p.Metrica)
                    .HasForeignKey(d => d.IdCaracteristica)
                    .HasConstraintName("fk_met_carac");

                entity.HasOne(d => d.IdSubcaracteristicaNavigation)
                    .WithMany(p => p.Metrica)
                    .HasForeignKey(d => d.IdSubcaracteristica)
                    .HasConstraintName("fk_met_subcarac");
            });

            modelBuilder.Entity<PonderacionCaracteristica>(entity =>
            {
                entity.HasKey(e => e.IdPonderacionCaracteristica);

                entity.HasIndex(e => e.Idcaracteristica)
                    .HasName("fk_pond_caract");

                entity.Property(e => e.IdPonderacionCaracteristica)
                    .HasColumnName("idPonderacionCaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Idcaracteristica)
                    .HasColumnName("idcaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ponderado)
                    .HasColumnName("ponderado")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdcaracteristicaNavigation)
                    .WithMany(p => p.PonderacionCaracteristica)
                    .HasForeignKey(d => d.Idcaracteristica)
                    .HasConstraintName("fk_pond_caract");
            });

            modelBuilder.Entity<PonderacionMetrica>(entity =>
            {
                entity.HasKey(e => e.IdPonderacionMetrica);

                entity.HasIndex(e => e.IdMetrica)
                    .HasName("fk_pond_metr");

                entity.Property(e => e.IdPonderacionMetrica)
                    .HasColumnName("idPonderacionMetrica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdMetrica)
                    .HasColumnName("idMetrica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ponderado)
                    .HasColumnName("ponderado")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdMetricaNavigation)
                    .WithMany(p => p.PonderacionMetrica)
                    .HasForeignKey(d => d.IdMetrica)
                    .HasConstraintName("fk_pond_metr");
            });

            modelBuilder.Entity<PonderacionSubcaracteristica>(entity =>
            {
                entity.HasKey(e => e.IdPonderacionSubcaracteristica);

                entity.HasIndex(e => e.IdSubcaracteristica)
                    .HasName("fk_pond_sub");

                entity.Property(e => e.IdPonderacionSubcaracteristica)
                    .HasColumnName("idPonderacionSubcaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdSubcaracteristica)
                    .HasColumnName("idSubcaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ponderacion)
                    .HasColumnName("ponderacion")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdSubcaracteristicaNavigation)
                    .WithMany(p => p.PonderacionSubcaracteristica)
                    .HasForeignKey(d => d.IdSubcaracteristica)
                    .HasConstraintName("fk_pond_sub");
            });

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.HasKey(e => e.IdProyecto);

                entity.HasIndex(e => e.IdCuenta)
                    .HasName("fk_proy_cuenta");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdCuenta)
                    .HasColumnName("idCuenta")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NombreProyecto)
                    .HasColumnName("nombreProyecto")
                    .HasColumnType("varchar(300)");

                entity.HasOne(d => d.IdCuentaNavigation)
                    .WithMany(p => p.Proyecto)
                    .HasForeignKey(d => d.IdCuenta)
                    .HasConstraintName("fk_proy_cuenta");
            });

            modelBuilder.Entity<Reporte>(entity =>
            {
                entity.HasKey(e => e.IdReporte);

                entity.HasIndex(e => e.IdProyecto)
                    .HasName("fk_repo_proy");

                entity.Property(e => e.IdReporte)
                    .HasColumnName("idReporte")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("date");

                entity.Property(e => e.IdProyecto)
                    .HasColumnName("idProyecto")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Link)
                    .HasColumnName("link")
                    .HasColumnType("varchar(200)");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Reporte)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_repo_proy");
            });

            modelBuilder.Entity<Subcaracteristica>(entity =>
            {
                entity.HasKey(e => e.IdSubcaracteristica);

                entity.HasIndex(e => e.IdCaracteristica)
                    .HasName("fk_subcarac_caract");

                entity.Property(e => e.IdSubcaracteristica)
                    .HasColumnName("idSubcaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdCaracteristica)
                    .HasColumnName("idCaracteristica")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.IdCaracteristicaNavigation)
                    .WithMany(p => p.Subcaracteristica)
                    .HasForeignKey(d => d.IdCaracteristica)
                    .HasConstraintName("fk_subcarac_caract");
            });
        }
    }
}
