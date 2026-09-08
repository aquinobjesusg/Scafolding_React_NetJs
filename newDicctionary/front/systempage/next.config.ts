import type { NextConfig } from "next";

const path = require('path');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname), // O la ruta relativa correcta hacia tu raíz
  },
  // Para el traceo de archivos de salida
  outputFileTracingRoot: path.join(__dirname), 

  /* config options here */
  output: 'export',
  //trailingSlash: true,
  distDir: 'dist',
  /*images: {
    unoptimized: true,
  },*/
//  compress: true,
//  experimental: {
//    optimizePackageImports: ['lucide-react'],
 // },
   // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  // Otras opciones que necesites...
  experimental: {
    workerThreads: false, // Desactiva hilos worker (usa menos RAM)
    cpus: 1,              // Fuerza a usar solo 1 núcleo para compilar
  },

};
/*module.exports = {
  experimental: {
    workerThreads: false, // Desactiva hilos worker (usa menos RAM)
    cpus: 1,              // Fuerza a usar solo 1 núcleo para compilar
  },
};*/

export default nextConfig;




/** @type {import('next').NextConfig} */
module.exports = {
  // Si usas Turbopack
  turbopack: {
    root: path.join(__dirname), // O la ruta relativa correcta hacia tu raíz
  },
  // Para el traceo de archivos de salida
  outputFileTracingRoot: path.join(__dirname), 
  
  // ... resto de tu configuración
};