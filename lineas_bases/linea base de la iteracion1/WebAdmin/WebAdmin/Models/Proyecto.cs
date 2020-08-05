using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class Proyecto
    {
        public Proyecto()
        {
            CaracteristicasProyecto = new HashSet<CaracteristicasProyecto>();
            Reporte = new HashSet<Reporte>();
        }

        public int IdProyecto { get; set; }
        public int? IdCuenta { get; set; }
        public string NombreProyecto { get; set; }

        public Cuenta IdCuentaNavigation { get; set; }
        public ICollection<CaracteristicasProyecto> CaracteristicasProyecto { get; set; }
        public ICollection<Reporte> Reporte { get; set; }
    }
}
