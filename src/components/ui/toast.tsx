// Placeholder for the toast module

export type ToastActionElement = React.ReactNode;

export interface ToastProps {
    message: string;
    action?: ToastActionElement;
}

export function Toast({ message, action }: ToastProps) {
    return (
        <div>
        <p>{ message } </p>
      { action && <div>{ action } </div> }
    </div>
  );
}