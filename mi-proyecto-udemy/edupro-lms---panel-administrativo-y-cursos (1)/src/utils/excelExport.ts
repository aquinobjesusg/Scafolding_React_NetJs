/**
 * Excel & CSV Export Utility
 * Generates formatted spreadsheet files compatible with Microsoft Excel, Google Sheets, and LibreOffice.
 */

export interface ExcelColumn<T> {
  header: string;
  key: keyof T | string;
  formatter?: (value: any, item: T) => string | number;
}

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  columns: ExcelColumn<T>[],
  fileName: string = 'export_datos',
  sheetName: string = 'Datos'
) {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }

  // Create an XML Spreadsheet 2003 (.xls) which Excel opens natively with styles
  const headersXml = columns
    .map(
      (col) =>
        `<Cell ss:StyleID="header"><Data ss:Type="String">${escapeXml(col.header)}</Data></Cell>`
    )
    .join('');

  const rowsXml = data
    .map((row) => {
      const cellsXml = columns
        .map((col) => {
          let val: any;
          if (typeof col.key === 'string' && col.key.includes('.')) {
            const parts = col.key.split('.');
            val = parts.reduce((acc, part) => acc?.[part], row);
          } else {
            val = row[col.key as keyof T];
          }

          if (col.formatter) {
            val = col.formatter(val, row);
          }

          if (val === undefined || val === null) {
            val = '';
          }

          const isNum = typeof val === 'number';
          const type = isNum ? 'Number' : 'String';
          const safeVal = isNum ? val : escapeXml(String(val));

          return `<Cell><Data ss:Type="${type}">${safeVal}</Data></Cell>`;
        })
        .join('');

      return `<Row>${cellsXml}</Row>`;
    })
    .join('');

  const excelTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Segoe UI" x:Family="Swiss" ss:Size="10" ss:Color="#111827"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="header">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#9CA3AF"/>
   </Borders>
   <Font ss:FontName="Segoe UI" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#4F46E5" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table>
   <Row ss:Height="25">
    ${headersXml}
   </Row>
   ${rowsXml}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([excelTemplate], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const timestamp = new Date().toISOString().split('T')[0];
  link.download = `${fileName}_${timestamp}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns: ExcelColumn<T>[],
  fileName: string = 'export_datos'
) {
  if (!data || data.length === 0) return;

  const headers = columns.map((col) => `"${col.header.replace(/"/g, '""')}"`).join(',');
  const rows = data.map((row) =>
    columns
      .map((col) => {
        let rawVal: any = row[col.key as keyof T];
        let displayVal: string = '';
        if (col.formatter) {
          displayVal = String(col.formatter(rawVal, row));
        } else {
          displayVal = rawVal === null || rawVal === undefined ? '' : String(rawVal);
        }
        return `"${displayVal.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csvContent = '\uFEFF' + [headers, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeXml(unsafe: string): string {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
