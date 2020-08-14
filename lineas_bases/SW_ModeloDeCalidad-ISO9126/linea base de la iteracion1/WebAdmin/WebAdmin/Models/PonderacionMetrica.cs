using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class PonderacionMetrica
    {
        public int IdPonderacionMetrica { get; set; }
        public int? IdMetrica { get; set; }
        public int? IdProyecto { get; set; }
        public int? Ponderado { get; set; }

        public Metrica IdMetricaNavigation { get; set; }
    }
}
