import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Printer, Trash2, Calculator, X, FileCheck2 } from "lucide-react";
import {
  useBillingStore,
  nextQuoteNumber,
  currency,
  type InvoiceItem,
  type Quote,
} from "@/lib/store";

const STATUS_STYLES: Record<Quote["status"], string> = {
  borrador: "bg-slate-200 text-slate-700",
  enviado: "bg-sky-100 text-sky-800",
  aceptado: "bg-emerald-100 text-emerald-700",
  rechazado: "bg-red-100 text-red-700",
};

export default function QuotesView() {
  const { clients, products, quotes, addQuote, updateQuoteStatus, removeQuote, convertQuoteToInvoice } =
    useBillingStore();
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [notes, setNotes] = useState("");
  const [printQuote, setPrintQuote] = useState<Quote | null>(null);

  const addItem = () => {
    const p = products.find((x) => x.id === selectedProduct);
    if (!p) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) {
        return prev.map((i) => (i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { productId: p.id, name: p.name, quantity: 1, price: p.price, taxRate: p.taxRate }];
    });
    setSelectedProduct("");
  };

  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.productId === id ? { ...i, quantity: Math.max(1, qty) } : i)));

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.productId !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = items.reduce((s, i) => s + i.price * i.quantity * (i.taxRate / 100), 0);
  const total = subtotal + tax;

  const emit = () => {
    if (!clientId || items.length === 0) return;
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 15);
    addQuote({
      number: nextQuoteNumber(),
      clientId,
      date: new Date().toISOString(),
      validUntil: validUntil.toISOString(),
      items,
      subtotal,
      tax,
      total,
      notes,
      status: "borrador",
    });
    setItems([]);
    setClientId("");
    setNotes("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-6">
        <Card className="border-sky-100 shadow-sm">
          <CardHeader className="bg-sky-50 rounded-t-xl border-b border-sky-100">
            <CardTitle className="flex items-center gap-2 text-sky-900">
              <Calculator className="h-5 w-5" /> Nuevo presupuesto
            </CardTitle>
            <CardDescription>N° {nextQuoteNumber()} · válido por 15 días</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-2">
              <Label>Cliente</Label>
              
              <Select value={clientId} onValueChange={(value) => setClientId(value ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} — {c.ruc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Agregar producto</Label>
              <div className="flex gap-2">
                
                <Select value={selectedProduct} onValueChange={(value) => setSelectedProduct(value ?? '')}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.code} · {p.name} · {currency(p.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addItem} className="bg-sky-700 hover:bg-sky-800">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="rounded-lg border border-sky-100 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sky-50">
                      <TableHead>Producto</TableHead>
                      <TableHead className="w-24 text-center">Cant.</TableHead>
                      <TableHead className="text-right">P. Unit</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((i) => (
                      <TableRow key={i.productId}>
                        <TableCell className="font-medium text-slate-800">{i.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={1}
                            value={i.quantity}
                            onChange={(e) => updateQty(i.productId, parseInt(e.target.value) || 1)}
                            className="h-8 text-center"
                          />
                        </TableCell>
                        <TableCell className="text-right">{currency(i.price)}</TableCell>
                        <TableCell className="text-right font-semibold">{currency(i.price * i.quantity)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(i.productId)} className="text-slate-400 hover:text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="space-y-2">
              <Label>Notas / condiciones</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Condiciones comerciales, tiempo de entrega, forma de pago..."
                rows={3}
              />
            </div>

            <Separator />

            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2 text-sm">
                <Row label="Subtotal" value={currency(subtotal)} />
                <Row label="IVA" value={currency(tax)} />
                <Separator />
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={emit}
              disabled={!clientId || items.length === 0}
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              Guardar presupuesto
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-serif text-lg font-bold text-slate-900">Presupuestos</h3>
        {quotes.length === 0 && (
          <Card className="border-dashed border-sky-200 bg-white">
            <CardContent className="py-12 text-center text-slate-500 text-sm">
              Aún no se han creado presupuestos.
            </CardContent>
          </Card>
        )}
        {quotes.map((q) => {
          const client = clients.find((c) => c.id === q.clientId);
          return (
            <Card key={q.id} className="border-sky-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-xs text-slate-500">{q.number}</div>
                    <div className="font-semibold text-slate-900 text-sm">{client?.name ?? "Cliente eliminado"}</div>
                  </div>
                  <Badge className={STATUS_STYLES[q.status]}>{q.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Vence {new Date(q.validUntil).toLocaleDateString("es-EC")}
                  </span>
                  <span className="font-bold text-slate-900">{currency(q.total)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={q.status} onValueChange={(v) => updateQuoteStatus(q.id, v as Quote["status"])}>
                    <SelectTrigger className="h-8 text-xs flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="enviado">Enviado</SelectItem>
                      <SelectItem value="aceptado">Aceptado</SelectItem>
                      <SelectItem value="rechazado">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeQuote(q.id)} className="text-slate-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => setPrintQuote(q)}>
                    <Printer className="h-3.5 w-3.5" /> Imprimir
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-1 bg-sky-600 hover:bg-sky-700"
                    onClick={() => convertQuoteToInvoice(q.id)}
                  >
                    <FileCheck2 className="h-3.5 w-3.5" /> Facturar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {printQuote && (
        <PrintQuote
          quote={printQuote}
          clientName={clients.find((c) => c.id === printQuote.clientId)?.name ?? ""}
          clientRuc={clients.find((c) => c.id === printQuote.clientId)?.ruc ?? ""}
          clientAddress={clients.find((c) => c.id === printQuote.clientId)?.address ?? ""}
          onClose={() => setPrintQuote(null)}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

function PrintQuote({
  quote,
  clientName,
  clientRuc,
  clientAddress,
  onClose,
}: {
  quote: Quote;
  clientName: string;
  clientRuc: string;
  clientAddress: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-start justify-center overflow-auto p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 print:shadow-none print:my-0 print:rounded-none">
        <div className="flex items-center justify-between p-4 border-b print:hidden">
          <span className="font-semibold text-slate-700">Vista previa de impresión</span>
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
                NP
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-slate-900">Núcleo Facturación S.A.</div>
                <div className="text-xs text-slate-500">RUC: 1792345678001</div>
                <div className="text-xs text-slate-500">Av. Amazonas N34-120, Quito · Tel: 02-2345678</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-sky-700 font-semibold">Presupuesto</div>
              <div className="font-mono text-sm text-slate-800">{quote.number}</div>
              <div className="text-xs text-slate-500 mt-1">
                Emitido: {new Date(quote.date).toLocaleDateString("es-EC")}
              </div>
              <div className="text-xs text-slate-500">
                Válido hasta: {new Date(quote.validUntil).toLocaleDateString("es-EC")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 py-5">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Cliente</div>
              <div className="font-semibold text-slate-900">{clientName}</div>
              <div className="text-sm text-slate-600">RUC: {clientRuc}</div>
              <div className="text-sm text-slate-600">{clientAddress}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">Estado</div>
              <Badge className={STATUS_STYLES[quote.status]}>{quote.status.toUpperCase()}</Badge>
            </div>
          </div>

          <table className="w-full text-sm border-t border-slate-200">
            <thead>
              <tr className="bg-sky-50 text-slate-700">
                <th className="text-left py-2 px-3 font-semibold">Descripción</th>
                <th className="text-center py-2 px-3 font-semibold">Cant.</th>
                <th className="text-right py-2 px-3 font-semibold">P. Unit</th>
                <th className="text-right py-2 px-3 font-semibold">IVA</th>
                <th className="text-right py-2 px-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((i) => (
                <tr key={i.productId} className="border-b border-slate-100">
                  <td className="py-2 px-3 text-slate-800">{i.name}</td>
                  <td className="py-2 px-3 text-center">{i.quantity}</td>
                  <td className="py-2 px-3 text-right">{currency(i.price)}</td>
                  <td className="py-2 px-3 text-right text-slate-500">{i.taxRate}%</td>
                  <td className="py-2 px-3 text-right font-medium">{currency(i.price * i.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-5">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{currency(quote.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA</span>
                <span>{currency(quote.tax)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-sky-600 pt-2 mt-2 text-base font-bold text-slate-900">
                <span>TOTAL</span>
                <span>{currency(quote.total)}</span>
              </div>
            </div>
          </div>

          {quote.notes && (
            <div className="mt-6 rounded-lg bg-sky-50 border border-sky-100 p-4 text-sm text-slate-700">
              <div className="text-xs uppercase tracking-wide text-sky-700 font-semibold mb-1">
                Notas y condiciones
              </div>
              {quote.notes}
            </div>
          )}

          <div className="mt-10 pt-4 border-t border-dashed border-slate-300 text-center text-xs text-slate-400">
            Documento generado electrónicamente · Núcleo Facturación S.A. · Presupuesto no válido como factura
          </div>
        </div>
      </div>
    </div>
  );
}