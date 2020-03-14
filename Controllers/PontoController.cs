using SistemaDePonto.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SistemaDePonto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontoController : ControllerBase
    {
        private readonly SistemaDbContext _context;

        public PontoController(SistemaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public object Get()
        {
            return _context.Pontos.Select((c) => new
            {
                Id = c.Id,
                UserId = c.UserId,
                Dia = c.Dia,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

        [Route("user/{userId}")]
        [HttpGet]
        public object GetByUser(int userId)
        {
            return _context.Pontos.Where(b => b.UserId == userId).Select((c) => new
            {
                Id = c.Id,
                Dia = c.Dia,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var ponto = await _context.Pontos.FindAsync(id);

            if (ponto == null)
            {
                return NotFound();
            }

            return Ok(ponto);
        }

        [HttpPost]
        public async Task<ActionResult> Post(Ponto ponto)
        {
            var pontoExists = _context.Pontos.Any(e => e.UserId == ponto.UserId && e.Dia == ponto.Dia);

            if (pontoExists)
            {
                return Forbid();
            }

            _context.Pontos.Add(ponto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = ponto.Id }, ponto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Ponto data)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {

                var ponto = await _context.Pontos.FindAsync(id);

                if (ponto == null)
                {
                    return NotFound();
                }

                ponto.Entrada = data.Entrada;
                ponto.SaidaAlmoco = data.SaidaAlmoco;
                ponto.EntradaAlmoco = data.EntradaAlmoco;
                ponto.Saida = data.Saida;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PontoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();

        }

        [Route("[controller]")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePonto(int id)
        {
            var ponto = await _context.Pontos.FindAsync(id);
            if (ponto == null)
            {
                return NotFound();
            }

            _context.Pontos.Remove(ponto);
            await _context.SaveChangesAsync();

            return Ok(ponto);
        }

        private bool PontoExists(int id)
        {
            return _context.Pontos.Any(e => e.Id == id);
        }
    }

}