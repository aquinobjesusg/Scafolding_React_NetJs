import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
//import { Head } from '@inertiajs/react';

import { Head, Link, router, useForm } from '@inertiajs/react';

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


const breadcrumbs: BreadcrumbItem[] = [{ title: 'Información 3', href: '/dashboard3' }];

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
            <Head title="Información" />
             <div>

          {/* Radial Bar Chart */}
          <Card className="md:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Metricas</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="30%"
                  outerRadius="80%"
                  data={radialData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    label={{ fill: '#fff', position: 'insideStart' }}
                  />
                  <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

            </div> 
        </AppLayout>
    );
}
