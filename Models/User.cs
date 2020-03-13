using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaDePonto.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}