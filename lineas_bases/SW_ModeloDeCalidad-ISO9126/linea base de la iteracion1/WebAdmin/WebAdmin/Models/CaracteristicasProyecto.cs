using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class CaracteristicasProyecto
    {
        public int IdCaracteristicasProyecto { get; set; }
        public int? IdProyecto { get; set; }
        public string NombreCaracteristica { get; set; }
        public string ValorCaracteristica { get; set; }

        public Proyecto IdProyectoNavigation { get; set; }
    }
}
