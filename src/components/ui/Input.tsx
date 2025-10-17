import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'w-full h-10 px-3 py-2 bg-white/10 border rounded-lg text-white',
                    'placeholder:text-white/50 focus:outline-none focus:border-white/40',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error ? 'border-red-500' : 'border-white/20',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
