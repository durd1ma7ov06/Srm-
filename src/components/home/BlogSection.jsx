import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/dummyData';

export default function BlogSection() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-900">Foydali maqolalar</h2>
          <p className="text-sm text-gray-500 mt-1">Retseptlar, maslahatlar va yangiliklar</p>
        </div>
        <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all">
          Barchasi <ArrowRight size={16} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            <div className="overflow-hidden h-56">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-brand-900 mb-2 leading-tight line-clamp-2">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-600 transition flex items-center gap-1.5 group-hover:gap-2.5">
                Batafsil <ArrowRight size={15} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
