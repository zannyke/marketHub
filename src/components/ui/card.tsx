import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
}

export const Card = ({ children, className, hoverable = false, ...props }: CardProps) => {
    return (
        <div className={clsx(styles.card, hoverable && styles.hoverable, className)} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx(styles.header, className)} {...props}>{children}</div>
);

export const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx(styles.content, className)} {...props}>{children}</div>
);

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx(styles.footer, className)} {...props}>{children}</div>
);
