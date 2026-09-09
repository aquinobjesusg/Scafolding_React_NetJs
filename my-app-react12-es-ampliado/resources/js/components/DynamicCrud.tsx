import { Button } from '@/components/ui/button';
import { ShieldCheck, Plus, Edit, Trash2 } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Field {
  id: number;
  field_name: string;
  column_type: string;
  in_form?: boolean;
  in_list?: boolean;
}

interface Entity {
  id: number;
  label: string;
}

interface Record {
  id: number;
  [key: string]: any;
}

const DynamicCrud: React.FC<{ entityId?: number }> = ({ entityId = 0 }) => {
  const [entity, setEntity] = useState<Entity | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [formData, setFormData] = useState<Record>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (entityId) {
      fetchEntityData();
      fetchRecords();
    }
  }, [entityId]);

  const fetchEntityData = async () => {
    try {
      const response = await axios.get(`/api/dynamic/${entityId}`);
      setEntity(response.data.entity);
      setFields(response.data.fields || []);
    } catch (error) {
      console.error('Error fetching entity:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`/api/dynamic/${entityId}`);
      setRecords(response.data.records?.data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const resetForm = () => {
    setFormData({});
    setIsCreating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (isCreating) {
        await axios.post(`/api/dynamic/${entityId}`, formData);
      } else if (formData.id) {
        await axios.put(`/api/dynamic/${entityId}/${formData.id}`, formData);
      }
      fetchRecords();
      resetForm();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este registro?')) {
      try {
        await axios.delete(`/api/dynamic/${entityId}/${id}`);
        fetchRecords();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const renderField = (field: Field, value: any = '') => {
    const currentValue = formData[field.field_name] ?? value;
    
    const commonProps = {
      id: field.field_name,
      value: currentValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        setFormData({
          ...formData,
          [field.field_name]: e.target.value
        }),
      className: 'w-full px-3 py-2 border rounded'
    };

    switch (field.column_type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={formData[field.field_name] ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setFormData({
                ...formData,
                [field.field_name]: e.target.checked
              })
            }
            className="w-5 h-5"
          />
        );
      case 'date':
        return <input type="date" {...commonProps} />;
      case 'text':
        return <textarea rows={4} {...commonProps} />;
      case 'integer':
        return <input type="number" {...commonProps} />;
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  if (!entity) 
    {
      console.log(entity);
      return <div>Cargando...</div>;
    }

  //const entityLabelSingular = entity.label.replace(/s$/, ''); // Elimina la 's' al final
  const entityLabelSingular = entity.label; // Elimina la 's' al final

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{entity.label}</h1>
        <br/>
        {/* <button
          onClick={() => { resetForm(); setIsCreating(true); }}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Nuevo {entityLabelSingular}
        </button> */}

                  {/* <Button size="sm" variant="outline" 
                  onClick={() => { resetForm(); setIsCreating(true); }}
>
                    <Plus className="h-4 w-4" />
                    <span className='hidden sm:inline'>Nuevo</span>
                  </Button> */}
                            <Button className="w-full md:w-auto" size="sm" 
                             onClick={() => { resetForm(); setIsCreating(true); }}
                            >
                              <Plus className="h-4 w-4" />
                              Nuevo
                            </Button>

      </div>

      {/* Formulario Dinámico */}
      {(isCreating || formData.id) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? 'Crear' : 'Editar'} {entityLabelSingular}
          </h2>
          <form onSubmit={handleSubmit}>
            {fields.filter(f => f.in_form).map(field => (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                {renderField(field)}
              </div>
            ))}
            <div className="flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Guardar
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla Dinámica */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {fields.filter(f => f.in_list).map(field => (
                <th key={field.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                .
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                .
              </th>              
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="border-t hover:bg-gray-50">
                {fields.filter(f => f.in_list).map(field => (
                  <td key={field.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {field.column_type === 'boolean' 
                      ? (record[field.field_name] ? '✓' : '✗')
                      : record[field.field_name]
                    }
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <button
                    onClick={() => {
                      setFormData(record);
                      setIsCreating(false);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button> */}
                  <Button size="sm" variant="outline" onClick={() => {
                      setFormData(record);
                      setIsCreating(false);
                    }}
>
                    <Edit className="h-4 w-4" />
                    <span className='hidden sm:inline'>Editar</span>
                  </Button>
                  {/* <button
                    onClick={() => handleDelete(record.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button> */}
                  {/* <Button size="sm" variant="outline" onClick={() => handleDelete(record.id)}
>
                    <Trash2 className="h-4 w-4" />
                    <span className='hidden sm:inline'>Eliminar</span>
                  </Button> */}

                  {/* <Button size="sm" variant="destructive"
                  onClick={() => handleDelete(record.id)} >
                                          <Trash2 className="h-4 w-4" />
                                          <span className='hidden sm:inline'>Eliminar</span>
                                        </Button> */}
                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <button
                    onClick={() => {
                      setFormData(record);
                      setIsCreating(false);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button> */}
                  {/* <Button size="sm" variant="outline" onClick={() => {
                      setFormData(record);
                      setIsCreating(false);
                    }}
>
                    <Edit className="h-4 w-4" />
                    <span className='hidden sm:inline'>Editar</span>
                  </Button> */}
                  {/* <button
                    onClick={() => handleDelete(record.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button> */}
                  {/* <Button size="sm" variant="outline" onClick={() => handleDelete(record.id)}
>
                    <Trash2 className="h-4 w-4" />
                    <span className='hidden sm:inline'>Eliminar</span>
                  </Button> */}

                  <Button size="sm" variant="destructive"
                  onClick={() => handleDelete(record.id)} >
                                          <Trash2 className="h-4 w-4" />
                                          <span className='hidden sm:inline'>Eliminar</span>
                                        </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicCrud;