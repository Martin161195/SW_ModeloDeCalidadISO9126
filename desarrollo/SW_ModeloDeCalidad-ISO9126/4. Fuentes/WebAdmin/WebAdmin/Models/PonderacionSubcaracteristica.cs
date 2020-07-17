using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class PonderacionSubcaracteristica
    {
        public int IdPonderacionSubcaracteristica { get; set; }
        public int? IdSubcaracteristica { get; set; }
        public int? IdProyecto { get; set; }
        public int? Ponderacion { get; set; }

        public Subcaracteristica IdSubcaracteristicaNavigation { get; set; }
    }
}
