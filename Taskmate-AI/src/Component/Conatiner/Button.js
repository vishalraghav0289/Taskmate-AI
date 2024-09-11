/**
 * Import necessary dependencies
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Define button variants using Class Variance Authority (CVA)
 *
 * @param {Object} options - Options object with variant and size properties
 * @returns {string} - CSS class string for the button
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      /**
       * Variant options for the button
       */
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /**
       * Size options for the button
       */
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Button component with forwardRef
 *
 * @param {Object} props - Props object with className, variant, size, asChild, and other props
 * @param {React.Ref} ref - Forwarded ref
 * @returns {React.ReactElement} - Button element
 */
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

/**
 * Example usage:
 *
 * ```jsx
 * import { Button } from "./Button";
 *
 * const MyButton = () => {
 *   return (
 *     <Button variant="primary" size="lg">
 *       Click me!
 *     </Button>
 *   );
 * };
 * ```
 */

export { Button, buttonVariants };