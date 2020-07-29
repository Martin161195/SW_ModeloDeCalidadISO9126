using System;
using System.Collections.Generic;

namespace WebAdmin.Models
{
    public partial class Caracteristica
    {
        public Caracteristica()
        {
            Metrica = new HashSet<Metrica>();
            PonderacionCaracteristica = new HashSet<PonderacionCaracteristica>();
            Subcaracteristica = new HashSet<Subcaracteristica>();
        }

        public int IdCaracteristica { get; set; }
        public string Nombre { get; set; }

        public ICollection<Metrica> Metrica { get; set; }
        public ICollection<PonderacionCaracteristica> PonderacionCaracteristica { get; set; }
        public ICollection<Subcaracteristica> Subcaracteristica { get; set; }
    }
}
