
type HeaderProps = {
  page?: string;
};

export const Header = ({ page }: HeaderProps) => {

  return (
    <header className="flex items-center justify-between h-16 px-6 shadow">
      <h1 className="text-xl font-semibold text-[var(--color-text)]">{page}</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-[var(--color-primary-dark)] transition">
          <span className="text-lg">🔔</span>
        </button>

        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition">
          <span className="text-lg">👤</span>
          <div className="text-sm text-[var(--color-text)]">
            <div>Nome do Usuário</div>
            <div className="text-xs">Descrição</div>
          </div>
        </div>
      </div>
    </header>
  );
};
