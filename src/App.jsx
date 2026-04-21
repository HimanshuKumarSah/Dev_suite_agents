import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, ChevronRight, Send, ExternalLink } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'History', href: '#history' },
    { name: 'Models', href: '#models' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const models = [
    {
      name: 'Toyota Supra MKIV',
      engine: '3.0L 2JZ-GTE I6',
      hp: '320 HP',
      torque: '315 lb-ft',
      desc: 'The A80 Supra became an icon of Japanese performance, famous for its over-engineered engine and starring role in pop culture.',
      img: 'https://images.unsplash.com/photo-1616788494672-ec7ca755c6de?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Mazda RX-7 FD',
      engine: '1.3L 13B-REW Rotary',
      hp: '255 HP',
      torque: '217 lb-ft',
      desc: 'Known for its timeless design and unique sequential twin-turbocharged rotary engine, the FD is a masterpiece of balance.',
      img: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Honda NSX',
      engine: '3.0L C30A V6 VTEC',
      hp: '270 HP',
      torque: '210 lb-ft',
      desc: 'Developed with input from Ayrton Senna, the NSX proved that a supercar could be reliable, ergonomic, and devastatingly fast.',
      img: 'https://images.unsplash.com/photo-1603553329474-99f95f35394f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=600',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message sent successfully!');
    e.target.reset();
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tighter text-accent">
            JDM<span className="text-white">LEGENDS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark border-t border-white/10 py-6 px-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-semibold hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1920" 
            alt="Nissan Skyline GT-R R34" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/40 to-dark"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Experience the Legend: <span className="text-accent">JDM Classics</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Explore the history, performance, and soul of Japanese Domestic Market icons.
          </p>
          <a href="#models" className="btn-primary inline-flex items-center gap-2">
            Explore Models <ChevronRight size={20} />
          </a>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">The Golden Era of JDM</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              The 1990s marked a revolutionary period for the Japanese automotive industry. Driven by a booming economy and intense competition between manufacturers, this era birthed some of the most technologically advanced and performance-oriented vehicles ever made.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              JDM culture isn't just about the cars; it's about the philosophy of 'Kaizen'—continuous improvement. From the mountain passes of Hakone to the Wangan bayshore route, these machines were forged in the fires of passion and engineering excellence, creating a legacy that continues to inspire enthusiasts worldwide.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1532906619279-a4b7267faa66?auto=format&fit=crop&q=80&w=1000" 
              alt="90s Japanese Street Scene" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section id="models" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Iconic Models</h2>
            <div className="h-1 w-20 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((car, index) => (
              <div key={index} className="glass-effect rounded-2xl overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={car.img} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{car.name}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="text-gray-400">
                      <p className="font-bold text-white">Engine</p>
                      <p>{car.engine}</p>
                    </div>
                    <div className="text-gray-400">
                      <p className="font-bold text-white">HP</p>
                      <p>{car.hp}</p>
                    </div>
                    <div className="text-gray-400">
                      <p className="font-bold text-white">Torque</p>
                      <p>{car.torque}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {car.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Visual Gallery</h2>
            <div className="h-1 w-20 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`JDM Gallery ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white">
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      {/* Contact Form Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-400">Join the community and stay updated on the latest JDM news.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 rounded-3xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Message</label>
              <textarea 
                required 
                rows="5" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
            {formStatus && (
              <p className="text-green-500 text-center font-semibold animate-pulse">{formStatus}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-extrabold tracking-tighter text-accent">
            JDM<span className="text-white">LEGENDS</span>
          </div>

          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter size={24} /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} JDM Legends. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;