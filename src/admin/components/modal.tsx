import { motion, AnimatePresence } from "framer-motion";
import { Table, Container, Heading } from "@medusajs/ui";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Container>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-1 right-2 text-gray-500 hover:text-gray-800 text-xl"
              >
                &times;
              </button>
              {children}
            </div>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Modal;
