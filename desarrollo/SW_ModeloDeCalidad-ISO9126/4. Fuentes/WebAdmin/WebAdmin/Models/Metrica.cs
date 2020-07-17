using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAdmin.Models
{
    public partial class Metrica
    {
        public Metrica()
        {
            PonderacionMetrica = new HashSet<PonderacionMetrica>();
        }

        public int IdMetrica { get; set; }
        [Display(Name = "Característica")]
        public int? IdSubcaracteristica { get; set; }
        [Display(Name = "SubCaracterística")]
        public int? IdCaracteristica { get; set; }
        public string Nombre { get; set; }
        [Display(Name = "Característica")]
        public Caracteristica IdCaracteristicaNavigation { get; set; }
        [Display(Name = "SubCaracterística")]
        public Subcaracteristica IdSubcaracteristicaNavigation { get; set; }
        public ICollection<PonderacionMetrica> PonderacionMetrica { get; set; }
    }
}
