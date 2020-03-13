using SistemaDePonto.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
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
                Data = c.Data,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

        [HttpGet("{data}")]
        public object GetByDate(DateTime data)
        {
            return _context.Pontos.Where(b => b.Data == data).Select((c) => new
            {
                Id = c.Id,
                Data = c.Data,
                Entrada = c.Entrada,
                SaidaAlmoco = c.SaidaAlmoco,
                EntradaAlmoco = c.EntradaAlmoco,
                Saida = c.Saida
            }).ToList();
        }

    }
}