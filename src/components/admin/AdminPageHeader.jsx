import { Link } from "react-router-dom";
import { ChevronRightIcon } from "./icons";

function AdminPageHeader({ breadcrumbs, title, subtitle, actions }) {
  return (
    <div className="mb-6">
      {breadcrumbs?.length > 0 && (
        <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-200/45">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              {crumb.to ? (
                <Link to={crumb.to} className="text-cognac-400 transition-colors hover:text-cognac-300">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className="text-cream-200/30" />
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream-50">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-cream-200/55">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export default AdminPageHeader;
