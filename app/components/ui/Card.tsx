interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ title, children, footer }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </div>
  );
}
