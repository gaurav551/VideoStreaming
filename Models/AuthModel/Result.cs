using System;
using Microsoft.AspNetCore.Http;

namespace _NET_REACT
{
    public class Result{
        public Result(string msg, bool sts)
        {
            this.Message = msg;
            this.IsSuccess = sts;
        }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
    }
}