
import * as React from "react"

import {
  Toast,
  ToastAction,
  useToast as useSonner,
} from "@/components/ui/toast"

type ToastActionElement = React.ReactElement<typeof ToastAction>

export const TOAST_VARIANTS = ["default", "destructive", "success", "warning", "info"] as const;

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: (typeof TOAST_VARIANTS)[number];
};

type ContextType = {
  toast: ({ ...props }: ToastProps) => {
    id: string
    dismiss: () => void
    update: (props: ToastProps) => void
  }
  dismiss: (toastId?: string | undefined) => void
  toasts: Map<string, ToastProps>
  update: (id: string, toast: ToastProps) => void
}

const ToastContext = React.createContext<ContextType>({
  toast: () => {
    return {
      id: "",
      dismiss: () => {},
      update: () => {},
    }
  },
  dismiss: () => {},
  toasts: new Map(),
  update: () => {},
})

type ToastProviderProps = {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts, dismiss, toast, update } = useSonner()

  const contextValue: ContextType = {
    toast,
    dismiss,
    toasts,
    update,
  }

  return (
    <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
  )
}

function useToast() {
  return React.useContext(ToastContext)
}

export { ToastProvider, useToast }
