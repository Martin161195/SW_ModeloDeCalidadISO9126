using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAdmin.Models;

namespace WebAdmin.Controllers
{
    public class PonderacionController : Controller
    {
        private readonly AppDbContext context;
        public PonderacionController(AppDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult FnGetCaracteristicas()
        {
            var result = context.Caracteristica;
            return Ok();
        }

        public IActionResult FnGetTablePonderacionCaracteristicas()
        {

            var caracteristicas = from x in context.Caracteristica
                                  select new PonderacionItem 
                                  { 
                                      Id = x.IdCaracteristica, 
                                      Text = x.Nombre,
                                      Values = from y in context.Caracteristica
                                               where y.IdCaracteristica != x.IdCaracteristica
                                               select new PonderacionItemValue
                                               {
                                                   Id = y.IdCaracteristica,
                                                   Value = 0
                                               }
                                  };
            return Ok(caracteristicas);
        }

        public IActionResult FnGetCuadroPonderacion(int IdProyecto, string Tipo, int IdEntidad)
        {
            //{
            //    "idEntidad": 0,
            //  "idProyecto": 0,
            //  "listMatriz": [
            //    {
            //                    "idx": 0,
            //      "idy": 0,
            //      "valor": 0
            //    }
            //  ],
            //  "tipo": "string"

            var query = context.Subcaracteristica.Where(x => x.IdCaracteristica == IdEntidad);

            foreach (var item in query)
            {

            }
            var caracteristicas = from a in context.PonderacionValues
                                  where IdEntidad == a.IdEntidad && a.Tipo == Tipo
                                  select new 
                                  {
                                     a.IdX,
                                     a.IdY,
                                     a.Valor,
                                  };


            return Ok(caracteristicas);
        }

        public class PonderacionItem
        {
            public int Id { get; set; }
            public string Text { get; set; }
            public IEnumerable<PonderacionItemValue> Values { get; set; }
        }

        public class PonderacionItemValue
        {
            public int Id { get; set; }
            public decimal Value { get; set; }
        }
    }
}
