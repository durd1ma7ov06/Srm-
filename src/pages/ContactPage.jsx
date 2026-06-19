import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const infoCards = [
  { icon: MapPin, title: 'Manzil', lines: ['Toshkent shahar, Yunusobod tumani', 'Amir Temur shox ko\'chasi, 1A'] },
  { icon: Phone, title: 'Telefon', lines: ['+998 71 123 45 67', '+998 90 123 45 67'] },
  { icon: Mail, title: 'Email', lines: ['info@nihol.uz', 'support@nihol.uz'] },
  { icon: Clock, title: 'Ish vaqti', lines: ['Dush–Yak: 08:00 – 22:00', 'Bayramsiz, har kuni'] },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="Aloqa"
        subtitle="Savollaringiz bormi? Biz bilan bog'laning — jamoamiz sizga yordam berishdan mamnun bo'ladi."
        breadcrumb={['Aloqa']}
      />

      {/* Info cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{c.title}</h3>
                {c.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-500 leading-relaxed">{line}</p>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white rounded-[28px] p-8 shadow-soft">
            <h2 className="text-2xl font-extrabold text-brand-900 mb-1">Xabar yuboring</h2>
            <p className="text-sm text-gray-500 mb-6">Formani to'ldiring, tez orada bog'lanamiz.</p>

            {sent && (
              <div className="flex items-center gap-2 bg-brand-50 text-brand-700 rounded-2xl px-4 py-3 mb-5 text-sm font-medium animate-stepper-in">
                <CheckCircle2 size={18} />
                Xabaringiz yuborildi! Tez orada bog'lanamiz.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ismingiz</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ism Familiya"
                  className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon raqamingiz</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+998 90 123 45 67"
                  className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Xabar</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Xabaringizni yozing..."
                  className="w-full bg-cream border border-black/5 rounded-2xl px-4 py-3 outline-none text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-brand-700 transition shadow-soft active:scale-95"
              >
                <Send size={16} /> Yuborish
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="rounded-[28px] overflow-hidden shadow-soft min-h-[400px] bg-white">
            <iframe
              title="Nihol Market manzili"
              src="https://maps.google.com/maps?q=41.5667818,60.62856&z=17&hl=uz&output=embed"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
