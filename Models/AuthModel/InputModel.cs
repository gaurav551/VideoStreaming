using System;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT
{
    public class InputModel{
        public string TextAreaInput { get; set; }
        public IFormFile FileInput { get; set; }
    }
}