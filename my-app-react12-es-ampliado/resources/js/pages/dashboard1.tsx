import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
//import { Head } from '@inertiajs/react';
import { Separator } from '@/components/ui/separator';

import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";

import { Button } from '@/components/ui/button';


const breadcrumbs: BreadcrumbItem[] = [{ title: 'Información 1', href: '/dashboard1' }];

const summaryData = [
    { label: 'Users', value: 420, color: '#4ade80' },
    { label: 'Backups', value: 80, color: '#f472b6' },
    { label: 'Activity Logs', value: 1570, color: '#38bdf8' },
];

const monthlyData = [
    { name: 'Jan', Users: 50, Backups: 10 },
    { name: 'Feb', Users: 120, Backups: 25 },
    { name: 'Mar', Users: 80, Backups: 15 },
    { name: 'Apr', Users: 150, Backups: 30 },
    { name: 'May', Users: 90, Backups: 20 },
    { name: 'Jun', Users: 170, Backups: 35 },
];

const pieData = [
    { name: 'Admin', value: 20, color: '#fbbf24' },
    { name: 'User', value: 80, color: '#a78bfa' },
];

const areaData = [
    { month: 'Jan', users: 400, backups: 100 },
    { month: 'Feb', users: 300, backups: 150 },
    { month: 'Mar', users: 500, backups: 200 },
    { month: 'Apr', users: 700, backups: 250 },
];

const radialData = [
    { name: 'A', value: 100, fill: '#8884d8' },
    { name: 'B', value: 80, fill: '#83a6ed' },
    { name: 'C', value: 50, fill: '#8dd1e1' },
];

const COLORS = ['#0ea5e9', '#14b8a6', '#f97316', '#9333ea'];

const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
];

/*
export function TableFooterExample() {
  return (
  )
}
*/

export default function Dashboard1() {

 const { delete: destroy, processing } = useForm();

  const handleDelete = (id: string) => {
    destroy(`/users/${id}`);
  };

  const handleResetPassword = (id: string) => {
    router.put(`/users/${id}/reset-password`, {}, { preserveScroll: true });
  };


    /* const { delete: destroy, processing } = useForm();

    const handleDelete = (id: string) => {
        destroy(`/users/${id}`);
    };

    const handleResetPassword = (id: string) => {
        router.put(`/users/${id}/reset-password`, {}, { preserveScroll: true });
    }; */

    // function handleResetPassword(invoice: string): void {
    //   throw new Error('Function not implemented.');
    // }

    // function handleDelete(id: any): void {
    //   throw new Error('Function not implemented.');
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Información 1" />
             <div>

        <Card>
          <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Información 1</CardTitle>
              <p className="text-muted-foreground text-sm">Mostrar Información del Sistema 1</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Información
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6 space-y-6">
 


                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-center">Activate</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                <TableCell>
                                    {' '}
                                    <Switch />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        <Link href={`/users/${invoice.invoice}/edit`}>
                                            <Button size="sm" variant="default">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Link href={`/users/${invoice.invoice}/edit`}>
                                            <Button size="sm" variant="secondary">
                                                View
                                            </Button>
                                        </Link>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="secondary">
                                                    Ejecutar Proceso
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Reset Password?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Password for <strong>{invoice.invoice}</strong> will be reset to:
                                                        <br />
                                                        <code className="bg-muted rounded px-2 py-1 text-sm">ResetPasswordNya</code>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleResetPassword(invoice.invoice)} disabled={processing}>
                                                        Yes, Reset
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="destructive">
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Invoice <strong>{invoice.invoice}</strong> will be permanently deleted.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(invoice.invoice)} disabled={processing}>
                                                        Yes, Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>




            
          </CardContent>
        </Card>



            </div> 
        </AppLayout>
    );
}
