
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicCrud = function ({  }) {
  const entityId = 0;
  const [entity, setEntity] = useState(null);
  const [fields, setFields] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchEntityData();
    fetchRecords();
  }, [entityId]);

  const fetchEntityData = async () => {
    const response = await axios.get('/api/entities/${entityId}');
    setEntity(response.data.entity);
    setFields(response.data.fields);
  };

  const fetchRecords = async () => {
    const response = await axios.get('/api/dynamic/${entityId}');
    setRecords(response.data.records.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreating) {
      await axios.post(`/api/dynamic/${entityId}`, formData);
    } else if (formData.id) {
      await axios.put(`/api/dynamic/${entityId}/${formData.id}`, formData);
    }
    fetchRecords();
    resetForm();
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este registro?')) {
      await axios.delete(`/api/dynamic/${entityId}/${id}`);
      fetchRecords();
    }
  };

  const renderField = (field, value = '') => {
    const commonProps = {
      id: field.field_name,
      value: formData[field.field_name] ?? value,
      onChange: (e) => setFormData({
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
            onChange={(e) => setFormData({
              ...formData,
              [field.field_name]: e.target.checked
            })}
            className="w-5 h-5"
          />
        );
      case 'date':
        return <input type="date" {...commonProps} />;
      case 'text':
        return <textarea rows="4" {...commonProps} />;
      default:
        return <input type={field.column_type === 'integer' ? 'number' : 'text'} {...commonProps} />;
    }
  };

  if (!entity) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{entity.label}</h1>
        <button
          onClick={() => { resetForm(); setIsCreating(true); }}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Nuevo {entity.label.slice(0, -1)}
        </button>
      </div>

      {/* Formulario Dinámico */}
      {(isCreating || formData.id) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? 'Crear' : 'Editar'} {entity.label.slice(0, -1)}
          </h2>
          <form onSubmit={handleSubmit}>
            {fields.filter(f => f.in_form).map(field => (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field.field_name}
                </label>
                {renderField(field)}
              </div>
            ))}
            <div className="flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Guardar
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
                <th key={field.id} className="px-6 py-3 text-left">
                  {field.field_name}
                </th>
              ))}
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="border-t">
                {fields.filter(f => f.in_list).map(field => (
                  <td key={field.id} className="px-6 py-4">
                    {field.column_type === 'boolean' 
                      ? (record[field.field_name] ? '✓' : '✗')
                      : record[field.field_name]
                    }
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setFormData(record);
                      setIsCreating(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicCrud;