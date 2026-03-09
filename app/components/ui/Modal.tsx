import type { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-2">
          {footer ? (
            footer
          ) : (
            <Button variant="secondary" onClick={onClose}>
              ปิด
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
