'use client';

import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button Component Variants
 * 
 * Modern button component with multiple variants, sizes, and states.
 * Inspired by Amie's clean and elegant button design.
 */
const buttonVariants = cva(
  // Base styles - common to all buttons
  `
    inline-flex items-center justify-center gap-2
    font-medium text-sm
    rounded-xl
    transition-all duration-200 ease-out
    focus-ring
    disabled:opacity-50 disabled:pointer-events-none
    relative overflow-hidden
    group
  `,
  {
    variants: {
      variant: {
        // Primary button - main call-to-action
        primary: `
          bg-gradient-to-r from-primary to-primary-hover
          text-white shadow-sm
          hover:shadow-md hover:scale-[1.02]
          active:scale-[0.98]
        `,
        
        // Secondary button - less prominent actions
        secondary: `
          bg-surface border border-border
          text-foreground
          hover:bg-surface-hover hover:border-primary/30
          active:scale-[0.98]
        `,
        
        // Ghost button - subtle actions
        ghost: `
          text-foreground-secondary
          hover:bg-surface-hover hover:text-foreground
          active:scale-[0.98]
        `,
        
        // Destructive button - dangerous actions
        destructive: `
          bg-accent-red text-white
          hover:bg-red-600 hover:scale-[1.02]
          active:scale-[0.98]
        `,
        
        // Success button - positive actions
        success: `
          bg-accent-green text-white
          hover:bg-emerald-600 hover:scale-[1.02]
          active:scale-[0.98]
        `,
        
        // Outline button - emphasized but not primary
        outline: `
          border-2 border-primary bg-transparent
          text-primary
          hover:bg-primary hover:text-white
          active:scale-[0.98]
        `,
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Modern Button Component
 * 
 * A highly customizable button component with multiple variants, sizes,
 * and built-in loading states. Features smooth animations and modern styling.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" loading={isLoading}>
 *   Save Changes
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant,
    size,
    fullWidth,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`${buttonVariants({ variant, size, fullWidth })} ${className}`}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        
        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        {/* Button content */}
        {children && (
          <span className={loading ? 'opacity-70' : ''}>
            {children}
          </span>
        )}
        
        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { buttonVariants };
