﻿using System.Data.Entity;
using EventsConfigurator.API.Entities;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EventsConfigurator.API
{
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        public AuthContext()
            : base("AuthContext")
        {
     
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }

}