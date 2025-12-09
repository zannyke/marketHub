import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label,
    icon,
    className,
    id,
    ...props
}, ref) => {
    const inputId = id || React.useId();

    return (
        <div className={styles.container}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <div className={clsx(styles.inputWrapper, icon && styles.hasIcon)}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input
                    id={inputId}
                    ref={ref}
                    className={clsx(styles.input, className)}
                    {...props}
                />
            </div>
        </div>
    );
});

Input.displayName = "Input";
