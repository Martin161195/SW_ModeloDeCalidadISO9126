using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAdmin.Models
{
    public partial class Subcaracteristica
    {
        public Subcaracteristica()
        {
            Metrica = new HashSet<Metrica>();
            PonderacionSubcaracteristica = new HashSet<PonderacionSubcaracteristica>();
        }

        public int IdSubcaracteristica { get; set; }
        public string Nombre { get; set; }
        [Display(Name = "Característica")]
        public int? IdCaracteristica { get; set; }
        [Display(Name = "Característica")]
        public Caracteristica IdCaracteristicaNavigation { get; set; }
        public ICollection<Metrica> Metrica { get; set; }
        public ICollection<PonderacionSubcaracteristica> PonderacionSubcaracteristica { get; set; }
    }
}
