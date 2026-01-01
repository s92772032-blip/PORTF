
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Instagram, 
  Send, 
  Phone, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  Film, 
  Heart, 
  MessageSquare,
  Loader2,
  CheckCircle2,
  Settings,
  Plus,
  Trash2,
  Lock,
  Download,
  Copy
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_ITEMS as INITIAL_PORTFOLIO, SERVICES as INITIAL_SERVICES, TESTIMONIALS as INITIAL_TESTIMONIALS } from './constants';
import { PortfolioItem, Service, Testimonial } from './types';

// Инициализация AI (Ключ должен быть в переменных окружения на хостинге)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('kirishov_portfolio');
    const savedServices = localStorage.getItem('kirishov_services');
    const savedTestimonials = localStorage.getItem('kirishov_testimonials');

    setPortfolio(savedPortfolio ? JSON.parse(savedPortfolio) : INITIAL_PORTFOLIO);
    setServices(savedServices ? JSON.parse(savedServices) : INITIAL_SERVICES);
    setTestimonials(savedTestimonials ? JSON.parse(savedTestimonials) : INITIAL_TESTIMONIALS);
  }, []);

  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <PortfolioSection items={portfolio} />
        <AICartoonsSection items={portfolio} />
        <ServicesSection items={services} />
        <AboutSection />
        <TestimonialsSection items={testimonials} />
        <ContactSection />
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {isAdminOpen && (
        <AdminPanel 
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          portfolio={portfolio}
          setPortfolio={(data) => { setPortfolio(data); saveToLocal('kirishov_portfolio', data); }}
          services={services}
          setServices={(data) => { setServices(data); saveToLocal('kirishov_services', data); }}
          testimonials={testimonials}
          setTestimonials={(data) => { setTestimonials(data); saveToLocal('kirishov_testimonials', data); }}
        />
      )}
    </div>
  );
};

// --- ОСНОВНЫЕ КОМПОНЕНТЫ (БЕЗ ИЗМЕНЕНИЙ) ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'AI Мультфильмы', href: '#ai' },
    { name: 'Услуги', href: '#services' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ];
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-serif tracking-widest font-bold">KIRISHOV <span className="text-gold italic">ERDNI</span></a>
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300">{link.name}</a>
          ))}
          <a href="#contact" className="px-6 py-2 border border-gold text-gold text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition-all">Связаться</a>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-[60]">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>
      <div className={`fixed inset-0 bg-black z-50 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-serif tracking-widest hover:text-gold">{link.name}</a>
        ))}
      </div>
    </nav>
  );
};

const Hero: React.FC = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="Hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    </div>
    <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
      <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <span className="block text-gold text-sm uppercase tracking-[0.3em] mb-4">Кинематография & AI</span>
        <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-6">Киришов Эрдни — <br /> видеограф и AI-автор</h1>
        <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start mt-10">
          <a href="#portfolio" className="group flex items-center justify-center gap-3 px-10 py-5 bg-gold text-black font-semibold uppercase tracking-widest hover:bg-white transition-all">Портфолио <ArrowRight size={18} /></a>
          <a href="#contact" className="px-10 py-5 border border-white/30 hover:border-gold hover:text-gold transition-all uppercase tracking-widest text-sm">Связаться</a>
        </div>
      </div>
    </div>
  </section>
);

const PortfolioSection: React.FC<{ items: PortfolioItem[] }> = ({ items }) => (
  <section id="portfolio" className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <div className="mb-16"><h2 className="text-4xl md:text-6xl font-serif mb-4">Портфолио</h2><div className="h-1 w-24 bg-gold"></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.filter(i => i.category === 'video').map((item) => (
          <div key={item.id} className="group relative overflow-hidden aspect-video bg-zinc-900">
            <img src={item.thumbnail} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <span className="text-gold text-xs uppercase tracking-widest mb-2">Cinematic Video</span>
              <h3 className="text-2xl font-serif">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AICartoonsSection: React.FC<{ items: PortfolioItem[] }> = ({ items }) => {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const generateScript = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Напиши краткий сценарий (3-4 предл.) для AI-мультфильма: "${prompt}". Стиль: сказка, магия.`,
      });
      setScript(response.text || '');
    } catch (e) { setScript('Ошибка генерации.'); }
    setLoading(false);
  };
  return (
    <section id="ai" className="py-24 bg-[#0d0d0d]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif mb-16 italic text-center">AI Мультфильмы</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.filter(i => i.category === 'ai').map((item) => (
              <div key={item.id} className="group bg-zinc-900/40 p-1 border border-white/5">
                <img src={item.thumbnail} className="w-full aspect-square object-cover grayscale-[50%] group-hover:grayscale-0 transition-all" alt={item.title} />
                <div className="p-6"><h3 className="text-xl font-serif mb-2">{item.title}</h3><p className="text-white/50 text-sm">{item.description}</p></div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900 p-8 border border-gold/20 h-fit sticky top-24">
            <h4 className="text-xl font-serif mb-4 text-gold flex items-center gap-2"><Sparkles size={20} /> AI Песочница</h4>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-black border border-white/10 p-4 text-sm focus:border-gold outline-none mb-4 resize-none" placeholder="Идея для видео..." rows={3} />
            <button onClick={generateScript} disabled={loading} className="w-full py-4 bg-gold text-black font-bold uppercase text-xs flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" /> : <Sparkles size={16} />} Генерировать</button>
            {script && <div className="mt-6 p-4 bg-black border-l-2 border-gold italic text-sm">{script}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC<{ items: Service[] }> = ({ items }) => (
  <section id="services" className="py-24 bg-black">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Услуги</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
        {items.map((s) => (
          <div key={s.id} className="bg-black p-10 hover:bg-zinc-900 transition-colors flex flex-col h-full">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4 h-16 flex items-center">{s.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-8">{s.description}</p>
            <a href="#contact" className="text-gold text-xs uppercase tracking-widest mt-auto">Подробнее →</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection: React.FC = () => (
  <section id="about" className="py-24 bg-[#0a0a0a]">
    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000" className="w-full aspect-[4/5] object-cover grayscale" alt="About" />
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif">Киришов Эрдни</h2>
        <p className="text-white/70 text-lg leading-loose">Создаю визуальные миры, где чувства оживают. Сочетаю классику кино и мощь современных технологий.</p>
        <div className="flex gap-10"><div className="text-gold"><span className="block text-3xl font-serif">100+</span><span className="text-[10px] uppercase opacity-40">Фильмов</span></div><div className="text-gold"><span className="block text-3xl font-serif">AI</span><span className="text-[10px] uppercase opacity-40">Эксперт</span></div></div>
      </div>
    </div>
  </section>
);

const TestimonialsSection: React.FC<{ items: Testimonial[] }> = ({ items }) => (
  <section className="py-24 bg-black border-y border-white/5">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {items.map((t) => (
        <div key={t.id} className="p-10 border border-white/5 bg-zinc-900/20">
          <p className="text-lg italic text-white/70 mb-8">"{t.text}"</p>
          <div className="flex justify-between items-center"><span className="font-bold uppercase text-sm">{t.name}</span><span className="text-xs opacity-30">{t.date}</span></div>
        </div>
      ))}
    </div>
  </section>
);

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const handleSubmit = (e: any) => { e.preventDefault(); setStatus('loading'); setTimeout(() => setStatus('success'), 1500); };
  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Свяжитесь со мной</h2>
          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-6"><Phone className="text-gold" /><a href="tel:+79000000000" className="text-xl">+7 (900) 000-00-00</a></div>
            <div className="flex items-center gap-6"><Instagram className="text-gold" /><span>@kirishov.prod</span></div>
          </div>
        </div>
        <div className="bg-zinc-900/50 p-10 border border-white/5">
          {status === 'success' ? <div className="text-center py-20 text-gold font-serif text-2xl">Заявка отправлена!</div> : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required className="w-full bg-black/40 border-b border-white/10 p-4 focus:border-gold outline-none" placeholder="Имя" />
              <input required className="w-full bg-black/40 border-b border-white/10 p-4 focus:border-gold outline-none" placeholder="Телефон" />
              <textarea rows={4} className="w-full bg-black/40 border-b border-white/10 p-4 focus:border-gold outline-none" placeholder="Ваш проект..." />
              <button className="w-full py-5 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all">Отправить</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ onAdminClick: () => void }> = ({ onAdminClick }) => (
  <footer className="py-12 bg-black border-t border-white/5 text-center">
    <div className="container mx-auto px-6 space-y-4">
      <div className="text-xl font-serif font-bold">KIRISHOV <span className="text-gold italic">ERDNI</span></div>
      <div className="text-[10px] opacity-30 uppercase tracking-widest">© 2024 Все права защищены.</div>
      <button onClick={onAdminClick} className="opacity-10 hover:opacity-100 transition-opacity"><Lock size={12} /></button>
    </div>
  </footer>
);

// --- АДМИН ПАНЕЛЬ С ФУНКЦИЕЙ ЭКСПОРТА ---

const AdminPanel: React.FC<{ 
  isOpen: boolean; onClose: () => void; 
  portfolio: PortfolioItem[]; setPortfolio: (data: PortfolioItem[]) => void;
  services: Service[]; setServices: (data: Service[]) => void;
  testimonials: Testimonial[]; setTestimonials: (data: Testimonial[]) => void;
}> = ({ portfolio, setPortfolio, services, setServices, testimonials, setTestimonials, onClose }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'testimonials'>('portfolio');

  const copyConfig = () => {
    const data = { portfolio, services, testimonials };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('JSON-конфигурация скопирована! Вставьте её в файл constants.tsx для постоянного обновления.');
  };

  const addItem = () => {
    if (activeTab === 'portfolio') setPortfolio([...portfolio, { id: Date.now().toString(), title: 'Новое видео', category: 'video', thumbnail: 'https://picsum.photos/800/450', description: '' }]);
    if (activeTab === 'services') setServices([...services, { id: Date.now().toString(), title: 'Услуга', description: '' }]);
    if (activeTab === 'testimonials') setTestimonials([...testimonials, { id: Date.now().toString(), name: 'Имя', text: '', date: '' }]);
  };

  const updateItem = (id: string, field: string, value: string) => {
    if (activeTab === 'portfolio') setPortfolio(portfolio.map(i => i.id === id ? { ...i, [field]: value } : i));
    if (activeTab === 'services') setServices(services.map(i => i.id === id ? { ...i, [field]: value } : i));
    if (activeTab === 'testimonials') setTestimonials(testimonials.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeItem = (id: string) => {
    if (activeTab === 'portfolio') setPortfolio(portfolio.filter(i => i.id !== id));
    if (activeTab === 'services') setServices(services.filter(i => i.id !== id));
    if (activeTab === 'testimonials') setTestimonials(testimonials.filter(i => i.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-5xl h-[90vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-gold"><Settings /> Управление сайтом</h2>
          <div className="flex gap-4">
            <button onClick={copyConfig} className="flex items-center gap-2 text-[10px] uppercase font-bold text-gold border border-gold/30 px-4 py-2 hover:bg-gold hover:text-black transition-all"><Copy size={14} /> Скопировать JSON</button>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
          </div>
        </div>

        <div className="flex border-b border-white/5 bg-black/20">
          {(['portfolio', 'services', 'testimonials'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all ${activeTab === tab ? 'text-gold border-gold' : 'opacity-40 border-transparent'}`}>{tab}</button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {activeTab === 'portfolio' && portfolio.map(item => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-black/40 border border-white/5 group">
              <div className="md:col-span-2 space-y-4">
                <input value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-xl font-serif text-gold focus:border-gold outline-none pb-1" placeholder="Название" />
                <textarea value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="w-full bg-transparent border border-white/10 p-3 text-xs opacity-60 h-24 focus:border-gold outline-none" placeholder="Описание" />
              </div>
              <div className="space-y-4">
                <select value={item.category} onChange={e => updateItem(item.id, 'category', e.target.value)} className="w-full bg-zinc-800 p-2 text-xs outline-none">
                  <option value="video">Видеосъемка</option>
                  <option value="ai">AI Анимация</option>
                </select>
                <input value={item.thumbnail} onChange={e => updateItem(item.id, 'thumbnail', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-[10px] opacity-40 py-2 outline-none" placeholder="Ссылка на обложку (URL)" />
                <button onClick={() => removeItem(item.id)} className="w-full py-2 flex items-center justify-center gap-2 text-red-500/50 hover:text-red-500 transition-colors text-[10px] uppercase font-bold border border-red-500/10 hover:border-red-500/30"><Trash2 size={14} /> Удалить работу</button>
              </div>
            </div>
          ))}

          {activeTab === 'services' && services.map(s => (
            <div key={s.id} className="p-6 bg-black/40 border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <input value={s.title} onChange={e => updateItem(s.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-gold outline-none text-lg font-bold" />
                <button onClick={() => removeItem(s.id)} className="ml-4 text-red-500 opacity-30 hover:opacity-100"><Trash2 size={18} /></button>
              </div>
              <textarea value={s.description} onChange={e => updateItem(s.id, 'description', e.target.value)} className="w-full bg-transparent border border-white/10 p-3 text-sm opacity-60 h-20 outline-none" placeholder="Описание услуги" />
            </div>
          ))}

          {activeTab === 'testimonials' && testimonials.map(t => (
            <div key={t.id} className="p-6 bg-black/40 border border-white/5 space-y-4">
               <div className="flex justify-between items-center">
                <input value={t.name} onChange={e => updateItem(t.id, 'name', e.target.value)} className="bg-transparent border-b border-white/10 text-gold outline-none font-bold" placeholder="Имя клиента" />
                <button onClick={() => removeItem(t.id)} className="text-red-500 opacity-30 hover:opacity-100"><Trash2 size={18} /></button>
              </div>
              <textarea value={t.text} onChange={e => updateItem(t.id, 'text', e.target.value)} className="w-full bg-transparent border border-white/10 p-3 text-sm opacity-60 h-24 outline-none italic" placeholder="Текст отзыва" />
              <input value={t.date} onChange={e => updateItem(t.id, 'date', e.target.value)} className="bg-transparent text-[10px] opacity-30 uppercase tracking-widest outline-none" placeholder="Дата (например: Май 2024)" />
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-white/5 flex justify-center bg-black/40">
          <button onClick={addItem} className="flex items-center gap-3 px-12 py-4 bg-gold text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl active:scale-95"><Plus size={18} /> Добавить новую запись</button>
        </div>
      </div>
    </div>
  );
};

export default App;
