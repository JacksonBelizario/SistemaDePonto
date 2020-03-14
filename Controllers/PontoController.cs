using SistemaDePonto.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using System.Threading.Tasks;

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
                Dia = c.Dia,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

        [HttpGet("{dia}")]
        public object GetByDate(DateTime dia)
        {
            return _context.Pontos.Where(b => b.Dia == dia).Select((c) => new
            {
                Id = c.Id,
                Dia = c.Dia,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

        [HttpPost]
        public async Task<ActionResult> Post(Ponto pontos)
        {
            _context.Pontos.Add(pontos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = pontos.Id }, pontos);
        }

    }
}