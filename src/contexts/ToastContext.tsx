import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { CheckCircle, X } from '@phosphor-icons/react'
import styles from './Toast.module.css'

interface ToastMessage {
  id: string
  text: string
  actionLabel?: string
  onAction?: () => void
}

interface ToastContextType {
  showToast: (text: string, actionLabel?: string, onAction?: () => void) => void
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((text: string, actionLabel?: string, onAction?: () => void) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, text, actionLabel, onAction }])

    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <div key={toast.id} className={styles.toast}>
            <CheckCircle size={20} weight="fill" className={styles.icon} />
            <span className={styles.text}>{toast.text}</span>
            {toast.actionLabel && toast.onAction && (
              <button
                className={styles.actionBtn}
                onClick={() => {
                  toast.onAction?.()
                  removeToast(toast.id)
                }}
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              className={styles.closeBtn}
              onClick={() => removeToast(toast.id)}
              aria-label="Fechar notificação"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  return useContext(ToastContext)
}

