import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Transaction } from '../../types';
import { CrudTable, ColumnDef } from './CrudTable';
import { 
  DollarSign, 
  RotateCcw, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertOctagon,
  FileSpreadsheet,
  TrendingUp,
  Receipt
} from 'lucide-react';

export const TransactionsCrud: React.FC = () => {
  const { transactions, refundTransaction } = useCourse();
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');

  const filteredTransactions = transactions.filter((tx) => {
    if (filterStatus === 'TODOS') return true;
    return tx.status === filterStatus;
  });

  const totalRevenue = transactions
    .filter((tx) => tx.status === 'Completado')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalRefunded = transactions
    .filter((tx) => tx.status === 'Reembolsado')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const columns: ColumnDef<Transaction>[] = [
    {
      header: 'Código Transacción',
      accessor: 'transactionCode',
      sortable: true,
      render: (code) => (
        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
          {code}
        </span>
      ),
    },
    {
      header: 'Estudiante',
      accessor: 'userName',
      sortable: true,
      render: (_, tx) => (
        <div>
          <div className="font-bold text-gray-900">{tx.userName}</div>
          <div className="text-[11px] text-gray-400">{tx.userEmail}</div>
        </div>
      ),
    },
    {
      header: 'Curso Adquirido',
      accessor: 'courseTitle',
      sortable: true,
      render: (title) => (
        <div className="max-w-xs truncate text-gray-800 font-medium" title={title}>
          {title}
        </div>
      ),
    },
    {
      header: 'Monto',
      accessor: 'amount',
      sortable: true,
      render: (amount, tx) => (
        <span className="font-bold text-gray-900">
          ${amount.toFixed(2)} {tx.currency}
        </span>
      ),
    },
    {
      header: 'Método de Pago',
      accessor: 'paymentMethod',
      sortable: true,
      render: (method) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
          <CreditCard className="h-3.5 w-3.5 text-gray-400" />
          {method}
        </span>
      ),
    },
    {
      header: 'Estado',
      accessor: 'status',
      sortable: true,
      render: (status) => {
        const styles: Record<string, string> = {
          Completado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Reembolsado: 'bg-rose-50 text-rose-700 border-rose-200',
          Pendiente: 'bg-amber-50 text-amber-700 border-amber-200',
          Fallido: 'bg-gray-100 text-gray-600 border-gray-200',
        };
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
              styles[status] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {status === 'Completado' && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
            {status === 'Reembolsado' && <RotateCcw className="h-3 w-3 text-rose-600" />}
            {status}
          </span>
        );
      },
    },
    {
      header: 'Fecha',
      accessor: 'date',
      sortable: true,
      render: (date) => (
        <span className="text-[11px] text-gray-500 font-mono">{date}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Ingresos Netos Totales</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-gray-900">
            ${totalRevenue.toFixed(2)} <span className="text-xs font-semibold text-gray-400">USD</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            Transacciones completadas con éxito
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Reembolsos Procesados</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <RotateCcw className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-gray-900">
            ${totalRefunded.toFixed(2)} <span className="text-xs font-semibold text-gray-400">USD</span>
          </div>
          <p className="text-[11px] text-rose-500 font-medium mt-1">
            Garantía de devolución de 30 días
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Volumen de Operaciones</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Receipt className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-gray-900">
            {transactions.length}{' '}
            <span className="text-xs font-semibold text-gray-400">órdenes</span>
          </div>
          <p className="text-[11px] text-indigo-600 font-medium mt-1">
            Pasarelas Stripe, PayPal y Mercado Pago
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {['TODOS', 'Completado', 'Reembolsado', 'Pendiente'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              filterStatus === st
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {st === 'TODOS' ? 'Todas las operaciones' : st}
          </button>
        ))}
      </div>

      <CrudTable<Transaction>
        title="Historial de Transacciones e Inscripciones"
        subtitle="Registro auditable de cobros, métodos de pago y devoluciones con exportación contable a Excel."
        data={filteredTransactions}
        columns={columns}
        searchPlaceholder="Buscar por código, nombre de alumno o curso..."
        searchFields={['transactionCode', 'userName', 'userEmail', 'courseTitle', 'paymentMethod']}
        excelFileName="reporte_transacciones_pagos"
        excelColumns={[
          { header: 'Código Transacción', key: 'transactionCode' },
          { header: 'Nombre del Alumno', key: 'userName' },
          { header: 'Correo Electrónico', key: 'userEmail' },
          { header: 'Curso Adquirido', key: 'courseTitle' },
          { header: 'Monto', key: 'amount' },
          { header: 'Moneda', key: 'currency' },
          { header: 'Método de Pago', key: 'paymentMethod' },
          { header: 'Estado', key: 'status' },
          { header: 'Fecha y Hora', key: 'date' },
        ]}
        actions={(tx) => (
          <div>
            {tx.status === 'Completado' && (
              <button
                onClick={() => {
                  if (confirm(`¿Procesar reembolso por $${tx.amount} para ${tx.userName}?`)) {
                    refundTransaction(tx.id);
                  }
                }}
                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                title="Procesar reembolso"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reembolsar</span>
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};
