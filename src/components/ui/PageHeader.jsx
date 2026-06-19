import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <section className="container mx-auto px-4 pt-6">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-10 sm:px-12 sm:py-12">
        {/* decorative circles */}
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute right-20 -bottom-16 w-40 h-40 rounded-full bg-white/5" />

        <nav className="relative z-10 flex items-center gap-1.5 text-xs text-brand-50/80 mb-3">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition">
            <Home size={13} /> Bosh sahifa
          </Link>
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="opacity-60" />
              <span className="text-white font-medium">{crumb}</span>
            </span>
          ))}
        </nav>

        <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-white">{title}</h1>
        {subtitle && (
          <p className="relative z-10 text-brand-50/85 mt-2 max-w-xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
