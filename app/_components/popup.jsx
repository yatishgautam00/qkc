    "use client";

    import { motion, AnimatePresence } from "framer-motion";


    export default function PopupMessage({ show, iconPath, message, onClose }) {
      return (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              onClick={onClose}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 w-full max-w-xs text-center"
              >
                <div className="flex justify-center mb-4">
                  <img src={iconPath} alt="Popup Icon" width={60} height={60} />
                </div>
                <p className="text-base text-neutral-700 dark:text-neutral-200">{message}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
