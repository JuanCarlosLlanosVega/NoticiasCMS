
export default function Footer() {
    return (
      <footer className="mt-6 border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6 py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Portal Jurídico Cochabamba
            </p>
            <p className="text-sm text-slate-600">
              Zona pública • React + Tailwind • Flat CMS (File System)
            </p>
          </div>
        </div>
      </footer>
    );
  }