interface Product { id: string; name: string; language: string; level: string; price: number; typeId: string; }
interface ProductType { id: string; name: string; }

export function exportToExcel(products: Product[], types: ProductType[]) {
  const headers = ["Producto", "Idioma", "Nivel", "Tipo", "Precio"];
  const rows = products.map(p => [
    p.name,
    p.language,
    p.level,
    types.find(t => t.id === p.typeId)?.name || "",
    p.price,
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "productos_lingua.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(products: Product[], types: ProductType[]) {
  const rows = products.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.language}</td>
      <td>${p.level}</td>
      <td>${types.find(t => t.id === p.typeId)?.name || ""}</td>
      <td style="text-align:right">$${p.price}</td>
    </tr>
  `).join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reporte de Productos - Lingua</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; }
        .header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .logo { width: 36px; height: 36px; border-radius: 10px; background: #0d9488; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; }
        h1 { font-size: 22px; margin: 0; }
        .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { background: #f1f5f9; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
        td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
        tr:nth-child(even) td { background: #f8fafc; }
        .footer { margin-top: 32px; color: #94a3b8; font-size: 11px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">L</div>
        <h1>Reporte de Productos</h1>
      </div>
      <div class="meta">Generado el ${new Date().toLocaleString("es-ES")} · ${products.length} productos</div>
      <table>
        <thead>
          <tr>
            <th>Producto</th><th>Idioma</th><th>Nivel</th><th>Tipo</th><th>Precio</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">© 2025 Lingua · Documento generado automáticamente</div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "reporte_lingua.pdf";
  link.click();
  URL.revokeObjectURL(url);
}