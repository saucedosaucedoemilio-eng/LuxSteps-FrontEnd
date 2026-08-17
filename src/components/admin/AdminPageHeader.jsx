import { Link } from "react-router-dom";
import { ChevronRightIcon } from "./icons";

function AdminPageHeader({ breadcrumbs, title, subtitle, actions }) {
  return (
    <div className="mb-6">
      {breadcrumbs?.length > 0 && (
        <nav className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              {crumb.to ? (
                <Link to={crumb.to} className="text-brand-600 hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className="text-gray-400" />
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export default AdminPageHeader;
