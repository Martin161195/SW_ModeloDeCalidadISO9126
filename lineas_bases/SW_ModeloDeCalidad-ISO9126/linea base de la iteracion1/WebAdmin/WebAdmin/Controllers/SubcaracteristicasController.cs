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
    public class SubcaracteristicasController : Controller
    {
        private readonly AppDbContext _context;

        public SubcaracteristicasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Subcaracteristicas
        public async Task<IActionResult> Index()
        {
            var appDbContext = _context.Subcaracteristica.Include(s => s.IdCaracteristicaNavigation);
            return View(await appDbContext.ToListAsync());
        }

        // GET: Subcaracteristicas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subcaracteristica = await _context.Subcaracteristica
                .Include(s => s.IdCaracteristicaNavigation)
                .FirstOrDefaultAsync(m => m.IdSubcaracteristica == id);
            if (subcaracteristica == null)
            {
                return NotFound();
            }

            return View(subcaracteristica);
        }

        // GET: Subcaracteristicas/Create
        public IActionResult Create()
        {
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre");
            return View();
        }

        // POST: Subcaracteristicas/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdSubcaracteristica,Nombre,IdCaracteristica")] Subcaracteristica subcaracteristica)
        {
            if (ModelState.IsValid)
            {
                _context.Add(subcaracteristica);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", subcaracteristica.IdCaracteristica);
            return View(subcaracteristica);
        }

        // GET: Subcaracteristicas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subcaracteristica = await _context.Subcaracteristica.FindAsync(id);
            if (subcaracteristica == null)
            {
                return NotFound();
            }
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", subcaracteristica.IdCaracteristica);
            return View(subcaracteristica);
        }

        // POST: Subcaracteristicas/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdSubcaracteristica,Nombre,IdCaracteristica")] Subcaracteristica subcaracteristica)
        {
            if (id != subcaracteristica.IdSubcaracteristica)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(subcaracteristica);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SubcaracteristicaExists(subcaracteristica.IdSubcaracteristica))
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
            ViewData["IdCaracteristica"] = new SelectList(_context.Caracteristica, "IdCaracteristica", "Nombre", subcaracteristica.IdCaracteristica);
            return View(subcaracteristica);
        }

        // GET: Subcaracteristicas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var subcaracteristica = await _context.Subcaracteristica
                .Include(s => s.IdCaracteristicaNavigation)
                .FirstOrDefaultAsync(m => m.IdSubcaracteristica == id);
            if (subcaracteristica == null)
            {
                return NotFound();
            }

            return View(subcaracteristica);
        }

        // POST: Subcaracteristicas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var subcaracteristica = await _context.Subcaracteristica.FindAsync(id);
            _context.Subcaracteristica.Remove(subcaracteristica);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SubcaracteristicaExists(int id)
        {
            return _context.Subcaracteristica.Any(e => e.IdSubcaracteristica == id);
        }
    }
}
