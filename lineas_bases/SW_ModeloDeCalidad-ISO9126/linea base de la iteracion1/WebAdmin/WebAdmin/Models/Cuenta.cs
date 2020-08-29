using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class Cuenta
    {
        public Cuenta()
        {
            Proyecto = new HashSet<Proyecto>();
        }

        public int IdCuenta { get; set; }
        public string Usuario { get; set; }
        public string Contraseña { get; set; }

        public ICollection<Proyecto> Proyecto { get; set; }
    }
}
