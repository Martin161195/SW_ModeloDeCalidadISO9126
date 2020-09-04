using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAdmin.Models
{
    public class PonderacionValues
    {
        public int IdProyecto { get; set; }
        public int IdX { get; set; }
        public int IdY { get; set; }
        public double Valor { get; set; }
        public string Tipo { get; set; }
        public int IdEntidad { get; set; }

    }
}
