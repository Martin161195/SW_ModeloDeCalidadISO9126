using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class Reporte
    {
        public int IdReporte { get; set; }
        public int IdProyecto { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string Link { get; set; }

        public Proyecto IdProyectoNavigation { get; set; }
    }
}
