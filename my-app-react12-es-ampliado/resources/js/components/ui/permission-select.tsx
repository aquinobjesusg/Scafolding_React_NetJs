import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PermissionSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export default function PermissionSelect({ value, onChange, options }: PermissionSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setOpen(false);
            setSearch('');
        }
        };

        if (open) {
        document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setOpen(false);
        setSearch('');
    };

    return (
        <div ref={containerRef} className="relative">
            <div className="relative flex items-center">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between pr-4"
                    onClick={() => setOpen(!open)}
                    type="button"
                >
                    <span className="truncate">{value || 'Seleccionar permiso'}</span>
                    {!value && (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                </Button>
                {value && ( 
                    <button 
                        type="button" 
                        className="absolute right-3 z-10 p-1 hover:bg-accent rounded-sm" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            onChange(''); 
                        }} 
                    > 
                        <X className="h-4 w-4 opacity-50 hover:opacity-100" /> 
                    </button> 
                )}
            </div>

            {open && (
                <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                    <div className="p-2 border-b">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar permiso..."
                            className="h-9"
                            autoFocus
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-1">
                        {filteredOptions.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Permiso no encontrado
                            </div>
                        ) : (
                            filteredOptions.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => handleSelect(item)}
                                    className={cn(
                                        "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                        value === item && "bg-accent"
                                    )}
                                >
                                    <Check
                                        className={cn(
                                        'mr-2 h-4 w-4',
                                        value === item ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {item}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
