using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebAdmin.Models;

namespace WebAdmin.Controllers
{
    public class MetricasController : Controller
    {
        private readonly AppDbContext _context;

        public MetricasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Metricas
        public async Task<IActionResult> Index()
        {
            var appDbContext = _context.Metrica.Include(m => m.IdCaracteristicaNavigation).Include(m => m.IdSubcaracteristicaNavigation);
            return View(await appDbContext.ToListAsync());
        }

        // GET: Metricas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metrica = await _context.Metrica
                .Include(m => m.IdCaracteristicaNavigation)
                .Include(m => m.IdSubcaracteristicaNavigation)
                .FirstOrDefaultAsync(m => m.IdMetrica == id);
            if (metrica == null)
            {
                return NotFound();
            }

            return View(metrica);
        }

        // GET: Metricas/Create
        public IActionResult Create()
        {
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre");
            ViewData["IdSubcaracteristica"] = new SelectList(_context.Subcaracteristica, "IdSubcaracteristica", "Nombre");
            return View();
        }

        // POST: Metricas/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdMetrica,IdSubcaracteristica,IdCaracteristica,Nombre")] Metrica metrica)
        {
            if (ModelState.IsValid)
            {
                _context.Add(metrica);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", metrica.IdCaracteristica);
            ViewData["IdSubcaracteristica"] = new SelectList(_context.Subcaracteristica, "IdSubcaracteristica", "Nombre", metrica.IdSubcaracteristica);
            return View(metrica);
        }

        // GET: Metricas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metrica = await _context.Metrica.FindAsync(id);
            if (metrica == null)
            {
                return NotFound();
            }
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", metrica.IdCaracteristica);
            ViewData["IdSubcaracteristica"] = new SelectList(_context.Subcaracteristica, "IdSubcaracteristica", "Nombre", metrica.IdSubcaracteristica);
            return View(metrica);
        }

        // POST: Metricas/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdMetrica,IdSubcaracteristica,IdCaracteristica,Nombre")] Metrica metrica)
        {
            if (id != metrica.IdMetrica)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(metrica);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MetricaExists(metrica.IdMetrica))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", metrica.IdCaracteristica);
            ViewData["IdSubcaracteristica"] = new SelectList(_context.Subcaracteristica, "IdSubcaracteristica", "Nombre", metrica.IdSubcaracteristica);
            return View(metrica);
        }

        // GET: Metricas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metrica = await _context.Metrica
                .Include(m => m.IdCaracteristicaNavigation)
                .Include(m => m.IdSubcaracteristicaNavigation)
                .FirstOrDefaultAsync(m => m.IdMetrica == id);
            if (metrica == null)
            {
                return NotFound();
            }

            return View(metrica);
        }

        // POST: Metricas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var metrica = await _context.Metrica.FindAsync(id);
            _context.Metrica.Remove(metrica);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MetricaExists(int id)
        {
            return _context.Metrica.Any(e => e.IdMetrica == id);
        }
    }
}
