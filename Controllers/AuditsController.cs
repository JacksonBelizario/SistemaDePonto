using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaDePonto.Models;

namespace SistemaDePonto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditsController : ControllerBase
    {
        private readonly SistemaDbContext _context;

        public AuditsController(SistemaDbContext context)
        {
            _context = context;
        }

        // GET: api/Audits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Audit>>> GetAudits()
        {
            return await _context.Audits.ToListAsync();
        }

        // GET: api/Audits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Audit>> GetAudit(int id)
        {
            var audit = await _context.Audits.FindAsync(id);

            if (audit == null)
            {
                return NotFound();
            }

            return audit;
        }
    }
}
