import { useAdEdit } from './hooks';
import { AdForm } from './ui';

type AdEditProps = {
  id: string | undefined;
};

export const AdEdit = ({ id }: AdEditProps) => {
  const {
    fields,
    loading,
    error,
    saving,
    saveError,
    saveSuccess,
    handleSubmit,
    handleCancel,
  } = useAdEdit(id);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-body-regular text-[var(--text-muted)]">
          Загрузка…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-body-regular text-[var(--warning-text)]">
          {error}
        </span>
      </div>
    );
  }

  if (!fields) return null;

  return (
    <AdForm
      defaultValues={fields}
      saving={saving}
      saveSuccess={saveSuccess}
      saveError={saveError}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
