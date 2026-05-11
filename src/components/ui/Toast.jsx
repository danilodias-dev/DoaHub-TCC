/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { motionTokens } from '../../utils/motion';

/**
 * ============================================
 * DoaHub — Toast Notification
 * ============================================
 * Notificação flutuante de sucesso / alerta.
 */
export function Toast({ notification, onDismiss }) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -30, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -30, x: '-50%', scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-6 left-1/2 z-[200] w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl shadow-graphite/15 border border-emerald/20 p-5 flex items-start gap-4 mx-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-graphite-dark text-sm">{notification.title}</p>
              <p className="text-xs text-graphite-light font-medium mt-0.5">{notification.message}</p>

              {/* Progress bar */}
              <motion.div
                className="h-0.5 bg-emerald/30 rounded-full mt-3"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ ...motionTokens.slow, ease: 'linear' }}
              />
            </div>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              className="w-8 h-8 rounded-lg hover:bg-ice flex items-center justify-center text-graphite-light hover:text-graphite-dark transition-colors flex-shrink-0"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
