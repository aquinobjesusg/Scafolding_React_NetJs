import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";

interface UserType {
  id: number;
  nombre: string;
}

export function UserRegistrationForm() {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    // Simulate fetching user types from API
    const fetchUserTypes = async () => {
      try {
        // Simulated API response
        const simulatedResponse: UserType[] = [
          { id: 1, nombre: "Administrador" },
          { id: 2, nombre: "Cliente" },
          { id: 3, nombre: "Propietario" },
        ];
        
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setUserTypes(simulatedResponse);
      } catch (error) {
        console.error("Error fetching user types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate registration process
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccessDialog(true);
    }, 1000);
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    setUsername("");
    setUserType("");
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="bg-indigo-600 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Registro de Usuario</CardTitle>
              <CardDescription className="text-indigo-100">
                Complete los campos para registrar un nuevo usuario
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                Nombre de Usuario
              </Label>
              <Input
                id="username"
                placeholder="Ingrese su nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium text-slate-700">
                Tipo de Usuario
              </Label>
              {loading ? (
                <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-md bg-slate-50">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-sm text-slate-500">Cargando tipos de usuario...</span>
                </div>
              ) : (
                <Select value={userType} onValueChange={setUserType} required>
                  <SelectTrigger className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500">
                    <SelectValue placeholder="Seleccione un tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type.id} value={type.nombre}>
                        {type.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>

          <CardFooter className="pb-6">
            <Button
              type="submit"
              disabled={submitting || loading || !username || !userType}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Registrar Datos"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl font-bold text-slate-800">
              ¡Registro Exitoso!
            </DialogTitle>
            <DialogDescription className="text-center text-slate-600">
              Datos registrados correctamente
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleCloseDialog}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}