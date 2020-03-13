using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaDePonto.Models
{
    public class Ponto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Data { get; set; }
        public DateTime Entrada { get; set; }
        public DateTime SaidaAlmoco { get; set; }
        public DateTime EntradaAlmoco { get; set; }
        public DateTime Saida { get; set; }
    }
}
