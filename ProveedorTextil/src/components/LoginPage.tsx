import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Lock, Mail, Phone, User, ArrowLeft } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.email && registerData.password) {
      onLogin(registerData.email);
    }
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-teal-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-teal-900">
              {resetSent ? "Correo Enviado" : "Recuperar Contraseña"}
            </CardTitle>
            <CardDescription className="text-teal-700">
              {resetSent
                ? "Hemos enviado las instrucciones a tu correo electrónico."
                : "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resetSent ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <p className="text-emerald-800 text-sm">
                    Revisa tu bandeja de entrada y sigue las instrucciones.
                  </p>
                </div>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={() => {
                    setForgotMode(false);
                    setResetSent(false);
                  }}
                >
                  Volver al Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-teal-900">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="tu@empresa.com"
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Enviar Instrucciones
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-teal-700 hover:text-teal-900"
                  onClick={() => setForgotMode(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (registerMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-teal-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-teal-900">
              Registro de Proveedor
            </CardTitle>
            <CardDescription className="text-teal-700">
              Crea tu cuenta para comenzar a vender tus insumos textiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="text-teal-900">
                  Nombre Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                  <Input
                    id="reg-name"
                    placeholder="Juan Pérez"
                    className="pl-10 border-teal-200 focus:border-teal-500"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-company" className="text-teal-900">
                  Empresa
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                  <Input
                    id="reg-company"
                    placeholder="Textiles del Norte S.A."
                    className="pl-10 border-teal-200 focus:border-teal-500"
                    value={registerData.company}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, company: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-teal-900">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="tu@empresa.com"
                    className="pl-10 border-teal-200 focus:border-teal-500"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-phone" className="text-teal-900">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                  <Input
                    id="reg-phone"
                    placeholder="+51 999 999 999"
                    className="pl-10 border-teal-200 focus:border-teal-500"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-teal-900">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-teal-500 hover:text-teal-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                Crear Cuenta
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-teal-700 hover:text-teal-900"
                onClick={() => setRegisterMode(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="bg-teal-900 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-400 p-3 rounded-xl">
                <Scissors className="h-8 w-8 text-teal-900" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold">TextilPro</h1>
                <p className="text-teal-200 text-sm">Sistema de Gestión para Proveedores</p>
              </div>
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              Conecta tu empresa con la industria textil
            </h2>
            <p className="text-teal-200 mb-6">
              Gestiona tus productos, órdenes de compra, facturación y cobranza en un solo lugar.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-teal-800/50 rounded-lg p-3">
                <Package className="h-5 w-5 text-amber-400" />
                <span className="text-sm">Gestión de inventario y productos</span>
              </div>
              <div className="flex items-center gap-3 bg-teal-800/50 rounded-lg p-3">
                <FileText className="h-5 w-5 text-amber-400" />
                <span className="text-sm">Facturación electrónica</span>
              </div>
              <div className="flex items-center gap-3 bg-teal-800/50 rounded-lg p-3">
                <DollarSign className="h-5 w-5 text-amber-400" />
                <span className="text-sm">Control de cobranza y pagos</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full shadow-xl border-teal-100">
          <CardHeader className="text-center">
            <div className="mx-auto bg-teal-600 p-3 rounded-xl mb-4 md:hidden">
              <Scissors className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-serif text-teal-900">
              Bienvenido
            </CardTitle>
            <CardDescription className="text-teal-700">
              Inicia sesión para acceder a tu panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-teal-900">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@empresa.com"
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-teal-900">
                        Contraseña
                      </Label>
                      <button
                        type="button"
                        onClick={() => setForgotMode(true)}
                        className="text-sm text-teal-600 hover:text-teal-800"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 border-teal-200 focus:border-teal-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-teal-500 hover:text-teal-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-teal-600 border-teal-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="remember" className="text-sm text-teal-700">
                      Recordarme
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                    Iniciar Sesión
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <div className="space-y-4">
                  <p className="text-sm text-teal-700 text-center">
                    ¿Nuevo proveedor? Crea tu cuenta para comenzar.
                  </p>
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => setRegisterMode(true)}
                  >
                    Crear Cuenta de Proveedor
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Building, Scissors, Package, FileText, DollarSign } from "lucide-react";