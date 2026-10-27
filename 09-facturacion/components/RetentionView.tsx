import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Printer, X, Receipt } from "lucide-react";
import { useBillingStore, currency, type Invoice } from "@/lib/store";

const RETENTION_RATES = [
  { label: "IVA 30%", value: "30", type: "IVA" },
  { label: "IVA 70%", value: "70", type: "IVA" },
  { label: "IVA 100%", value: "100", type: "IVA" },
  { label: "Renta 1%", value: "1", type: "RENTA" },
  { label: "Renta 2%", value: "2", type: "RENTA" },
  { label: "Renta 5%", value: "5", type: "RENTA" },
];

export default function RetentionView() {
  const { invoices, clients } = useBillingStore();
  const [invoiceId, setInvoiceId] = useState("");
  const [rate, setRate] = useState("30");
  const [print, setPrint] = useState<{ invoice: Invoice; rate: number; type: string } | null>(null);

  const selected = invoices.find((i) => i.id === invoiceId);
  const rateNum = parseFloat(rate);
  const selectedRate = RETENTION_RATES.find((r) => r.value === rate);
  const base = selected ? (selectedRate?.type === "IVA" ? selected.tax : selected.subtotal) : 0;
  const retained = base * (rateNum / 100);

  const generate = () => {
    if (!selected || !selectedRate) return;
    setPrint({ invoice: selected, rate: rateNum, type: selectedRate.type });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2 border-sky-100 shadow-sm h-fit">
        <CardHeader className="bg-sky-50 rounded-t-xl border-b border-sky-100">
          <CardTitle className="flex items-center gap-2 text-sky-900">
            <Receipt className="h-5 w-5" /> Comprobante de retención
          </CardTitle>
          <CardDescription>Genera la retención sobre una factura emitida</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Factura</Label>
            
            <Select value={invoiceId} onValueChange={(value) => setInvoiceId(value ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una factura" />
              </SelectTrigger>
              <SelectContent>
                {invoices.map((i) => {
                  const c = clients.find((x) => x.id === i.clientId);
                  return (
                    <SelectItem key={i.id} value={i.id}>
                      {i.number} · {c?.name ?? "—"} · {currency(i.total)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Porcentaje de retención</Label>
            
            <Select value={rate} onValueChange={(value) => setRate(value ?? '')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RETENTION_RATES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selected && (
            <div className="rounded-lg bg-sky-50 border border-sky-100 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Base imponible</span>
                <span className="font-medium text-slate-800">{currency(base)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Valor retenido</span>
                <span className="font-bold text-sky-700">{currency(retained)}</span>
              </div>
            </div>
          )}

          <Button
            onClick={generate}
            disabled={!selected}
            className="w-full bg-sky-600 hover:bg-sky-700"
          >
            Generar comprobante
          </Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-3">
        <Card className="border-sky-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Facturas disponibles</CardTitle>
            <CardDescription>Selecciona una factura para retener</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">
                No hay facturas emitidas. Crea una en la pestaña Facturas.
              </div>
            )}
            {invoices.map((i) => {
              const c = clients.find((x) => x.id === i.clientId);
              return (
                <div
                  key={i.id}
                  className="flex items-center justify-between rounded-lg border border-sky-100 p-3 hover:border-sky-300 hover:bg-sky-50/60 transition-colors"
                >
                  <div>
                    <div className="font-mono text-xs text-slate-500">{i.number}</div>
                    <div className="text-sm font-medium text-slate-800">{c?.name ?? "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{currency(i.total)}</div>
                    <Badge variant="secondary" className="bg-sky-100 text-sky-700 text-xs">
                      IVA {currency(i.tax)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {print && (
        <PrintRetention
          invoice={print.invoice}
          rate={print.rate}
          type={print.type}
          clientName={clients.find((c) => c.id === print.invoice.clientId)?.name ?? ""}
          clientRuc={clients.find((c) => c.id === print.invoice.clientId)?.ruc ?? ""}
          onClose={() => setPrint(null)}
        />
      )}
    </div>
  );
}

function PrintRetention({
  invoice,
  rate,
  type,
  clientName,
  clientRuc,
  onClose,
}: {
  invoice: Invoice;
  rate: number;
  type: string;
  clientName: string;
  clientRuc: string;
  onClose: () => void;
}) {
  const base = type === "IVA" ? invoice.tax : invoice.subtotal;
  const retained = base * (rate / 100);
  const number = `RET-${invoice.number.slice(-6)}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-start justify-center overflow-auto p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 print:shadow-none print:my-0 print:rounded-none">
        <div className="flex items-center justify-between p-4 border-b print:hidden">
          <span className="font-semibold text-slate-700">Comprobante de retención</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => window.print()} className="bg-sky-600 hover:bg-sky-700 gap-1">
              <Printer className="h-4 w-4" /> Imprimir
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-8 print:p-6">
          <div className="flex justify-between items-start border-b-2 border-sky-600 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-lg">
                CR
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-slate-900">Núcleo Facturación S.A.</div>
                <div className="text-xs text-slate-500">RUC: 1792345678001</div>
                <div className="text-xs text-slate-500">Comprobante de Retención</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-sky-700 font-semibold">Retención</div>
              <div className="font-mono text-sm text-slate-800">{number}</div>
              <div className="text-xs text-slate-500 mt-1">
                Fecha: {new Date().toLocaleDateString("es-EC")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 py-5">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Sujeto retenido</div>
              <div className="font-semibold text-slate-900">{clientName}</div>
              <div className="text-sm text-slate-600">RUC: {clientRuc}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Documento de referencia</div>
              <div className="font-mono text-sm text-slate-800">{invoice.number}</div>
              <div className="text-xs text-slate-500">
                {new Date(invoice.date).toLocaleDateString("es-EC")}
              </div>
            </div>
          </div>

          <table className="w-full text-sm border-t border-slate-200">
            <thead>
              <tr className="bg-sky-50 text-slate-700">
                <th className="text-left py-2 px-3 font-semibold">Concepto</th>
                <th className="text-left py-2 px-3 font-semibold">Tipo</th>
                <th className="text-right py-2 px-3 font-semibold">Base</th>
                <th className="text-right py-2 px-3 font-semibold">%</th>
                <th className="text-right py-2 px-3 font-semibold">Retenido</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3 text-slate-800">
                  {type === "IVA" ? "Retención de IVA" : "Retención en la fuente"}
                </td>
                <td className="py-2 px-3">
                  <Badge variant="secondary" className="bg-sky-100 text-sky-800">{type}</Badge>
                </td>
                <td className="py-2 px-3 text-right">{currency(base)}</td>
                <td className="py-2 px-3 text-right">{rate}%</td>
                <td className="py-2 px-3 text-right font-medium">{currency(retained)}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mt-5">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Total factura</span>
                <span>{currency(invoice.total)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-sky-600 pt-2 mt-2 text-base font-bold text-slate-900">
                <span>TOTAL RETENIDO</span>
                <span>{currency(retained)}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-dashed border-slate-300 text-center text-xs text-slate-400">
            Comprobante generado electrónicamente · Núcleo Facturación S.A.
          </div>
        </div>
      </div>
    </div>
  );
}