interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex grow flex-col items-center justify-center h-full border border-dashed border-gray-300 rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500">{description}</div>
    </div>
  );
}
