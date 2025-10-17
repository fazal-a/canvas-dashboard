import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, children, ...props }, ref) => {
        return (
            <select
                className={cn(
                    'w-full h-10 px-3 py-2 bg-white/10 border rounded-lg text-white',
                    'focus:outline-none focus:border-white/40',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error ? 'border-red-500' : 'border-white/20',
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    }
);

Select.displayName = 'Select';

export { Select };
