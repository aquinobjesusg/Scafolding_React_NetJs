import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  FileSpreadsheet, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Filter 
} from 'lucide-react';
import { ExcelColumn, exportToExcel, exportToCSV } from '../../utils/excelExport';

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T | ((row: T) => any);
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface CrudTableProps<T extends Record<string, any>> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  onAdd?: () => void;
  addLabel?: string;
  excelColumns?: ExcelColumn<T>[];
  excelFileName?: string;
  actions?: (row: T) => React.ReactNode;
  rowIdKey?: keyof T;
}

export function CrudTable<T extends Record<string, any>>({
  title,
  subtitle,
  data,
  columns,
  searchPlaceholder = 'Buscar en la tabla...',
  searchFields = [],
  onAdd,
  addLabel = 'Nuevo Registro',
  excelColumns,
  excelFileName = 'tabla_datos',
  actions,
  rowIdKey = 'id',
}: CrudTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((row) => {
      if (searchFields.length > 0) {
        return searchFields.some((field) => {
          const val = row[field];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(term);
        });
      }
      // Search all keys if no specific fields
      return Object.values(row).some(
        (val) => val !== undefined && val !== null && String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchFields]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredData, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportExcel = () => {
    const colsToUse: ExcelColumn<T>[] =
      excelColumns ||
      columns.map((col) => ({
        header: col.header,
        key: typeof col.accessor === 'string' ? (col.accessor as string) : col.header,
        formatter: (val, item) => {
          if (typeof col.accessor === 'function') {
            const res = col.accessor(item);
            return typeof res === 'string' || typeof res === 'number' ? res : String(val);
          }
          return val;
        },
      }));

    exportToExcel(filteredData, colsToUse, excelFileName, title);
  };

  const handleExportCsv = () => {
    const colsToUse: ExcelColumn<T>[] =
      excelColumns ||
      columns.map((col) => ({
        header: col.header,
        key: typeof col.accessor === 'string' ? (col.accessor as string) : col.header,
      }));

    exportToCSV(filteredData, colsToUse, excelFileName);
  };

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Excel Export Button */}
          <button
            id={`btn-export-excel-${excelFileName}`}
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/70 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Exportar a Microsoft Excel"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Excel (.xls)</span>
          </button>

          {/* CSV Export Button */}
          <button
            id={`btn-export-csv-${excelFileName}`}
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
            title="Exportar archivo CSV plano"
          >
            <Download className="h-4 w-4 text-gray-500" />
            <span>CSV</span>
          </button>

          {/* Add Record button */}
          {onAdd && (
            <button
              id={`btn-add-${excelFileName}`}
              onClick={onAdd}
              className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-600 active:scale-[0.98] transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>{addLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-orange-50/20 px-5 py-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-hidden"
          />
        </div>
        <span className="text-xs font-medium text-gray-500 hidden sm:inline">
          Mostrando {paginatedData.length} de {filteredData.length} registros
        </span>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-5 py-3.5 ${
                    col.sortable && typeof col.accessor === 'string'
                      ? 'cursor-pointer select-none hover:text-orange-600'
                      : ''
                  }`}
                  onClick={() => {
                    if (col.sortable && typeof col.accessor === 'string') {
                      handleSort(col.accessor as keyof T);
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && typeof col.accessor === 'string' && (
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-5 py-3.5 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-5 py-10 text-center text-xs text-gray-400"
                >
                  No se encontraron registros que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const rowKey = row[rowIdKey] || rowIdx;
                return (
                  <tr
                    key={String(rowKey)}
                    className="hover:bg-orange-50/40 transition-colors"
                  >
                    {columns.map((col, colIdx) => {
                      let cellVal: any;
                      if (typeof col.accessor === 'function') {
                        cellVal = col.accessor(row);
                      } else {
                        cellVal = row[col.accessor];
                      }

                      return (
                        <td key={colIdx} className="px-5 py-3.5 whitespace-nowrap">
                          {col.render ? col.render(cellVal, row) : cellVal}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {actions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-xs text-gray-600 bg-gray-50/50">
        <div>
          Página <span className="font-bold text-gray-900">{currentPage}</span> de{' '}
          <span className="font-bold text-gray-900">{totalPages}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
