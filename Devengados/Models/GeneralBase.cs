using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
  

    public class GeneralBase : IDisposable
    {
        bool disposed = false;

        public void Dispose()
        {
            // Using the dispose pattern
            Dispose(true);

            // … release unmanaged resources here
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {

                }
            }

            disposed = true;
        }
    }
}