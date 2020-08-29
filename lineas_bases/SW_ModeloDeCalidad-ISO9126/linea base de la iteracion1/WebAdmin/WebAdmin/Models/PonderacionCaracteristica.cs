using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class PonderacionCaracteristica
    {
        public int IdPonderacionCaracteristica { get; set; }
        public int? Idcaracteristica { get; set; }
        public int? IdProyecto { get; set; }
        public int? Ponderado { get; set; }

        public Caracteristica IdcaracteristicaNavigation { get; set; }
    }
}
