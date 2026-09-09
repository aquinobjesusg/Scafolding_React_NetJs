import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { icons } from '@/lib/icon-list';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function IconSelect({ value, onChange }: IconSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = icons.find((i) => i.name === value);
    const SelectedIcon = selected?.icon;

    const filteredIcons = icons.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase())
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

    const handleSelect = (iconName: string) => {
        onChange(iconName);
        setOpen(false);
        setSearch('');
    };

    return (
        <div ref={containerRef} className="relative">
        <Input
            value={value}
            onClick={() => setOpen(!open)}
            readOnly
            placeholder="Seleccionar icono (Lucide)"
            className="cursor-pointer"
        />

        {open && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
            <div className="p-2 border-b">
                <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar icono..."
                className="h-9"
                autoFocus
                />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1">
                {filteredIcons.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                    Icono no encontrado
                </div>
                ) : (
                filteredIcons.map(({ name, icon: Icon }) => (
                    <div
                    key={name}
                    onClick={() => handleSelect(name)}
                    className={cn(
                        "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        value === name && "bg-accent"
                    )}
                    >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{name}</span>
                    {value === name && (
                        <Check className="h-4 w-4" />
                    )}
                    </div>
                ))
                )}
            </div>
            </div>
        )}

        {SelectedIcon && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <SelectedIcon className="size-4" />
            {value}
            </div>
        )}
        </div>
    );
}
