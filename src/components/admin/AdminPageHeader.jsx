import { Link } from "react-router-dom";
import { ChevronRightIcon } from "./icons";

function AdminPageHeader({ breadcrumbs, title, subtitle, actions }) {
  return (
    <div className="admin-page-header">
      {breadcrumbs?.length > 0 && (
        <nav className="admin-breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="admin-breadcrumb__item">
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className="admin-breadcrumb__sep" />
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="admin-page-header__row">
        <div>
          <h1>{title}</h1>
          {subtitle && <p className="admin-page-header__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="admin-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
}

export default AdminPageHeader;
