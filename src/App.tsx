import React, { useState, useEffect } from 'react';
import './App.css';

// Glob import all images inside src/assets/images recursively
const imageModules = import.meta.glob('./assets/images/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

// Helper function to resolve assets dynamically from src/assets/images
const getAssetUrl = (path: string) => {
  const key = `./assets/images/${path}`;
  return imageModules[key] || '';
};

// 1. Data Galeri
const galleryData = [
  {
    title: "Pohon Aren Alami",
    desc: "Pohon aren (Arenga pinnata) tumbuh subur di lereng gunung Kuningan, Jawa Barat. Menjadi sumber utama nira berkualitas tinggi yang ramah lingkungan.",
    imgSrc: getAssetUrl("gallery/proses-1.webp"),
    alt: "Pohon aren tinggi menjulang di kebun"
  },
  {
    title: "Kebun Aren Tropis",
    desc: "Perkebunan aren dirawat secara alami oleh komunitas petani lokal di Desa Cibulan demi menjaga keberlanjutan ekosistem hutan tropis Jawa Barat.",
    imgSrc: getAssetUrl("gallery/proses-2.webp"),
    alt: "Kebun tropis tempat tumbuh pohon aren"
  },
  {
    title: "Cahaya Pagi Perkebunan",
    desc: "Pagi hari adalah waktu terbaik ketika embun pagi berselimut kabut menyelimuti perkebunan, waktu yang sangat ideal untuk proses penyadapan air nira.",
    imgSrc: getAssetUrl("gallery/proses-3.webp"),
    alt: "Cahaya pagi menyinari perkebunan"
  },
  {
    title: "Matahari Terbit di Atas Ladang",
    desc: "Para petani bersiap sejak fajar menyingsing untuk menaiki lereng-lereng gunung, memulai aktivitas penyadapan air nira kelapa murni.",
    imgSrc: getAssetUrl("gallery/proses-4.webp"),
    alt: "Matahari terbit di atas ladang"
  },
  {
    title: "Penyadapan Nira Aren",
    desc: "Petani menyadap air nira dari tongkol bunga jantan pohon aren secara teliti. Setiap tetesnya adalah berkah berharga dari alam.",
    imgSrc: getAssetUrl("gallery/proses-5.webp"),
    alt: "Petani menyadap nira dari pohon aren"
  },
  {
    title: "Bumbung Penampung",
    desc: "Air nira segar mengalir dan ditampung dalam bumbung bambu tradisional (lodong) yang bersih, menjaga kesegaran nira alami tanpa terkontaminasi.",
    imgSrc: getAssetUrl("gallery/proses-6.webp"),
    alt: "Bumbung bambu penampung air nira"
  },
  {
    title: "Petani Aren Caping Tradisional",
    desc: "Mengenakan caping anyaman tradisional, petani kita menembus medan perkebunan aren yang berbukit demi merawat kebun warisan keluarga.",
    imgSrc: getAssetUrl("gallery/proses-7.webp"),
    alt: "Petani aren dengan caping tradisional"
  },
  {
    title: "Senyum Petani Gula",
    desc: "Senyuman dan kebanggaan petani aren lokal dalam menghasilkan produk lokal bernilai gizi tinggi bagi kesehatan keluarga Indonesia.",
    imgSrc: getAssetUrl("gallery/proses-8.webp"),
    alt: "Potret petani aren tersenyum"
  },
  {
    title: "Nira Emas Segar",
    desc: "Nira segar berwarna kuning keemasan yang baru disadap dari pohon aren. Memiliki rasa manis alami dan segar khas pegunungan.",
    imgSrc: getAssetUrl("gallery/proses-9.webp"),
    alt: "Nira segar berwarna kuning keemasan"
  },
  {
    title: "Memasak di Tungku Tradisional",
    desc: "Air nira disaring lalu dimasak perlahan di atas tungku kayu bakar tradisional selama berjam-jam hingga mengental dan terkaramelisasi dengan sempurna.",
    imgSrc: getAssetUrl("gallery/proses-10.webp"),
    alt: "Proses memasak nira di atas tungku kayu bakar"
  },
  {
    title: "Cetakan Bambu Alami",
    desc: "Setelah matang, gula aren cair kental dituangkan ke cetakan bambu tradisional yang dibasahi air agar mudah dilepas saat dingin.",
    imgSrc: getAssetUrl("gallery/proses-11.webp"),
    alt: "Cetakan gula aren dari bambu"
  },
  {
    title: "Gula Aren Siap Kemas",
    desc: "Gula aren cetak yang telah padat, dingin, dan dilepas dari cetakan, kini siap dikemas secara higienis untuk menjaga kesegarannya.",
    imgSrc: getAssetUrl("gallery/proses-12.webp"),
    alt: "Gula aren cetak siap dikemas"
  }
];

// 2. Data Produk
interface Product {
  name: string;
  price: string;
  imgSrc: string;
  desc: string;
  tag: string;
  tagBg: string;
  nutrition: Record<string, string>;
  recipe: string;
}

const productData: Product[] = [
  {
    name: "Gula Aren Cetak",
    price: "Rp 28.000 / 500g",
    imgSrc: getAssetUrl("produk/gula-cetak.webp"),
    desc: "Dicetak tradisional menggunakan batok kelapa pilihan, menghasilkan gula aren padat dengan rasa karamel alami yang pekat. Sangat pas untuk pemanis kolak, bubur sumsum, kuah cuko pempek, hingga racikan kopi hitam tradisional.",
    tag: "Terlaris",
    tagBg: "bg-[var(--brand)]",
    nutrition: {
      "Energi": "375 kkal",
      "Karbohidrat": "92g",
      "Kalsium": "75mg",
      "Zat Besi": "4.5mg",
      "Kalium": "350mg",
      "Indeks Glikemik": "35 (Rendah)"
    },
    recipe: "Sisir or parut halus gula aren cetak, lalu rebus bersama air dan seikat daun pandan hingga larut dan mengental. Saring sirup gula aren, kemudian campurkan ke dalam santan hangat atau seduhan kopi susu Anda untuk aroma karamel khas yang legit."
  },
  {
    name: "Gula Aren Serbuk",
    price: "Rp 32.000 / 500g",
    imgSrc: getAssetUrl("produk/gula-serbuk.webp"),
    desc: "Gula aren versi bubuk (crystal/semut) dengan tingkat kekeringan tinggi (kadar air < 2%). Mudah larut, beraroma harum aren terpanggang yang khas, dan sangat praktis untuk taburan kopi, pembuat kue, pancake, serta aneka dessert kekinian.",
    tag: "Praktis",
    tagBg: "bg-[var(--teal)]",
    nutrition: {
      "Energi": "368 kkal",
      "Karbohidrat": "95g",
      "Kalsium": "80mg",
      "Zat Besi": "3.8mg",
      "Kalium": "380mg",
      "Indeks Glikemik": "35 (Rendah)"
    },
    recipe: "Gunakan perbandingan 1:1 sebagai pengganti gula pasir atau gula cokelat (brown sugar) pada resep kue, cookies, atau kopi susu kekinian. Taburkan langsung di atas whipped cream atau adonan martabak manis selagi hangat."
  },
  {
    name: "Nira Aren Cair",
    price: "Rp 35.000 / 350ml",
    imgSrc: getAssetUrl("produk/nira-cair.webp"),
    desc: "Sirup nira murni hasil penyusutan air nira kelapa secara perlahan di atas tungku tanpa proses cetak atau kristalisasi. Memiliki kekentalan mirip madu dengan aroma karamel legit serta sedikit rasa asam segar khas buah tropis. Dikemas steril dalam botol kaca.",
    tag: "Premium",
    tagBg: "bg-amber-500",
    nutrition: {
      "Energi": "310 kkal",
      "Karbohidrat": "78g",
      "Kalsium": "68mg",
      "Zat Besi": "4.0mg",
      "Kalium": "310mg",
      "Indeks Glikemik": "40 (Rendah)"
    },
    recipe: "Tuangkan langsung 1-2 sendok makan Nira Aren Cair ke atas es krim vanilla, pancake hangat, pudding kelapa, atau campurkan langsung dengan es susu oat dingin untuk racikan minuman kopi kekinian yang segar secara instan."
  }
];

// 3. Data Testimoni
const testimonialData = [
  {
    name: "Rina Andriani",
    location: "Bandung",
    imgSrc: getAssetUrl("testimoni/user-rina.webp"),
    text: "Rasa gulanya beda banget sama yang di pasaran, lebih legit dan aromanya kuat. Sekarang langganan tiap bulan buat bikin kolak."
  },
  {
    name: "Dedi Kurniawan",
    location: "Yogyakarta",
    imgSrc: getAssetUrl("testimoni/user-dedi.webp"),
    text: "Sebagai pemilik kedai kopi, kualitas gula aren ini konsisten dan enggak terlalu manis berlebihan. Pelanggan saya suka."
  },
  {
    name: "Sari Wulandari",
    location: "Jakarta",
    imgSrc: getAssetUrl("testimoni/user-sari.webp"),
    text: "Senang bisa beli langsung dari petani, tahu ceritanya dari mana asal gula ini. Kemasannya juga rapi dan higienis."
  }
];

function App() {
  // --- STATES ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [scrollY, setScrollY] = useState(0);

  // Gallery lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Product detail modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeProductTab, setActiveProductTab] = useState<'nutrition' | 'recipe'>('nutrition');

  // Testimonial carousel
  const [activeTestiSlide, setActiveTestiSlide] = useState(0);
  const [isTestiHovered, setIsTestiHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDiff, setTouchDiff] = useState<number>(0);

  // Newsletter
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: '',
    show: false
  });

  // --- EFFECTS ---
  // Reveal scroll animations & window scroll variables
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setIsHeaderSticky(currentScroll > 20);
      setShowBackToTop(currentScroll > 500);

      // Scrollspy logic
      const sections = ['beranda', 'tentang', 'produk', 'testimoni', 'kontak'];
      let currentSec = 'beranda';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.clientHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            currentSec = section;
          }
        }
      }
      setActiveSection(currentSec);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial IntersectionObserver for scroll reveals
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % galleryData.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Autoplay for testimonial slider
  useEffect(() => {
    if (isTestiHovered) return;
    const interval = setInterval(() => {
      setActiveTestiSlide((prev) => (prev + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestiHovered]);

  // Manage body scroll-lock when modal is active
  useEffect(() => {
    if (lightboxIndex !== null || activeProduct !== null || isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Synchronize hamburger lines animation state class on body
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('overflow-hidden', 'menu-open');
    };
  }, [lightboxIndex, activeProduct, isMobileMenuOpen]);

  // Toast automatic disappear
  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.show]);

  // --- HANDLERS ---
  const showToastNotification = (msg: string) => {
    setToast({ message: msg, show: true });
  };

  const closeProductModal = () => {
    setActiveProduct(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError(true);
      return;
    }

    setIsNewsletterLoading(true);
    setTimeout(() => {
      setIsNewsletterLoading(false);
      setEmail('');
      showToastNotification('Terima kasih! Alamat email Anda telah terdaftar.');
    }, 1200);
  };

  // Testimonial Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsTestiHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.touches[0].clientX - touchStart;
    setTouchDiff(diff);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    if (touchDiff > 80) {
      setActiveTestiSlide((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    } else if (touchDiff < -80) {
      setActiveTestiSlide((prev) => (prev + 1) % testimonialData.length);
    }
    setTouchStart(null);
    setTouchDiff(0);
    setIsTestiHovered(false);
  };

  // Parallax translation math
  const getParallaxTranslateY = (speed: number, parentOffsetTop: number = 0) => {
    // Parallax logic relative to window scroll position
    const yPos = (scrollY - parentOffsetTop) * speed;
    return `translateY(${yPos}px) scale(1.05)`;
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ============ TOP INFO BAR ============ */}
      <div className="text-white text-xs" style={{ background: 'var(--teal)' }}>
        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Desa Cibulan, Kuningan — Jawa Barat</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[var(--brand)] transition">Facebook</a>
            <a href="#" className="hover:text-[var(--brand)] transition">Instagram</a>
            <a href="#" className="hover:text-[var(--brand)] transition">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* ============ NAVBAR ============ */}
      <header
        id="main-header"
        className={`border-b border-gray-100 sticky top-0 z-30 transition-all duration-300 ${
          isHeaderSticky ? 'shadow-md bg-white/95 backdrop-blur-md' : 'bg-white/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-extrabold text-xl">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ background: 'var(--brand)' }}>🌴</span>
            Gula Aren Nita
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a
              href="#beranda"
              className={`nav-link hover:text-[var(--brand)] transition py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand)] after:transition-all hover:after:w-full ${
                activeSection === 'beranda' ? 'active-link' : ''
              }`}
            >
              Beranda
            </a>
            <a
              href="#tentang"
              className={`nav-link hover:text-[var(--brand)] transition py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand)] after:transition-all hover:after:w-full ${
                activeSection === 'tentang' ? 'active-link' : ''
              }`}
            >
              Tentang Kami
            </a>
            <a
              href="#produk"
              className={`nav-link hover:text-[var(--brand)] transition py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand)] after:transition-all hover:after:w-full ${
                activeSection === 'produk' ? 'active-link' : ''
              }`}
            >
              Produk
            </a>
            <a
              href="#testimoni"
              className={`nav-link hover:text-[var(--brand)] transition py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand)] after:transition-all hover:after:w-full ${
                activeSection === 'testimoni' ? 'active-link' : ''
              }`}
            >
              Testimoni
            </a>
            <a
              href="#kontak"
              className={`nav-link hover:text-[var(--brand)] transition py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--brand)] after:transition-all hover:after:w-full ${
                activeSection === 'kontak' ? 'active-link' : ''
              }`}
            >
              Hubungi Kami
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#kontak" className="cta-pill text-white text-sm font-semibold px-6 py-2.5 rounded-full hidden sm:inline-block">Pesan Sekarang</a>
            {/* Hamburger Button */}
            <button
              id="mobile-menu-btn"
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none z-50"
              aria-label="Menu Mobile"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center" id="hamburger-line1"></span>
              <span className="w-6 h-0.5 bg-gray-700 transition-all duration-300" id="hamburger-line2"></span>
              <span className="w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center" id="hamburger-line3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 flex flex-col gap-6 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="font-extrabold text-lg flex items-center gap-2">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs" style={{ background: 'var(--brand)' }}>🌴</span>
              Gula Aren Nita
            </span>
            <button
              id="mobile-menu-close"
              className="text-gray-500 hover:text-red-500 focus:outline-none"
              aria-label="Tutup Menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4 font-semibold text-gray-700">
            <a href="#beranda" className="mobile-nav-link hover:text-[var(--brand)] transition py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Beranda</a>
            <a href="#tentang" className="mobile-nav-link hover:text-[var(--brand)] transition py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</a>
            <a href="#produk" className="mobile-nav-link hover:text-[var(--brand)] transition py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Produk</a>
            <a href="#testimoni" className="mobile-nav-link hover:text-[var(--brand)] transition py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Testimoni</a>
            <a href="#kontak" className="mobile-nav-link hover:text-[var(--brand)] transition py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Hubungi Kami</a>
          </nav>
          <a href="#kontak" className="cta-pill text-white text-center text-sm font-semibold px-6 py-2.5 rounded-full mt-auto mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pesan Sekarang</a>
        </div>
      </div>

      {/* ============ HERO GALLERY ============ */}
      <section id="beranda" className="relative overflow-hidden">
        {/* Full-height Hero Container */}
        <div className="relative h-screen overflow-hidden">
          <img
            src={getAssetUrl("hero-bg.webp")}
            alt="Kebun aren di pagi hari dengan kabut"
            className="w-full h-[120%] object-cover absolute top-0 left-0 transition-transform duration-75 ease-out scale-105"
            style={{ transform: getParallaxTranslateY(-0.15) }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 reveal">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Manisnya Berkah dari Pohon Aren</h1>
            <p className="max-w-xl text-sm md:text-base text-white/90 leading-relaxed">
              Gula aren asli hasil sadapan nira petani lokal — dimasak langsung dengan cara tradisional, tanpa campuran gula pasir maupun bahan pengawet.
            </p>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="text-center mb-10 reveal">
            <span className="text-[var(--brand-dark)] text-xs font-bold uppercase tracking-widest">Galeri Proses</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2 text-[var(--teal)]">Dari Kebun Sampai ke Cetakan</h2>
            <p className="text-gray-500 text-sm mt-2">Klik foto untuk melihat cerita detail di balik setiap langkah pembuatan tradisional kami.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
            {galleryData.map((item, index) => (
              <div
                key={index}
                className="gallery-item aspect-square cursor-pointer relative group"
                onClick={() => setLightboxIndex(index)}
              >
                <img className="w-full h-full object-cover" src={item.imgSrc} alt={item.alt} />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-[var(--brand)] px-3 py-1.5 rounded-full shadow-sm scale-90 group-hover:scale-100 transition-transform duration-300">
                    Detail Proses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BANNER CTA ============ */}
      <section id="tentang" className="relative overflow-hidden">
        {/* Banner with Parallax background but no torn papers */}
        <div className="relative min-h-[60vh] flex items-center overflow-hidden">
          <img
            src={getAssetUrl("banner-bg.webp")}
            alt="Ladang perkebunan tempat petani aren bekerja"
            className="absolute inset-0 w-full h-[120%] object-cover absolute top-0 left-0 transition-transform duration-75 ease-out scale-105"
            style={{ transform: getParallaxTranslateY(-0.12, 1000) }} // Estimated vertical offset
          />
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="relative z-10 max-w-xl px-6 md:px-16 py-24 text-white reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">Ditanam dengan Niat, Diolah dengan Cinta</h2>
            <p className="text-sm md:text-base text-white/90 mb-8 leading-relaxed">
              Setiap batang gula aren kami berasal dari kebun keluarga petani di lereng gunung — disadap setiap pagi dan sore,
              lalu dimasak perlahan selama berjam-jam hingga mengental sempurna. Rasanya manis alami, aromanya khas, tanpa
              tambahan gula pasir sedikit pun.
            </p>
            <a href="#produk" className="cta-pill inline-block text-white font-semibold text-sm px-7 py-3 rounded-full">Lihat Produk Kami</a>
          </div>
        </div>
      </section>

      {/* ============ PRODUK ============ */}
      <section id="produk" className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12 reveal">
          <span className="text-[var(--brand-dark)] text-xs font-bold uppercase tracking-widest">Produk Kami</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 text-[var(--teal)]">Pilihan Gula Aren Homemade</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">Diproduksi dalam jumlah terbatas setiap minggunya agar kualitas dan kesegaran tetap terjaga.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 reveal">
          {productData.map((prod, index) => (
            <div
              key={index}
              className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-300 hover:-translate-y-1.5 transition-all duration-300 bg-white flex flex-col"
            >
              <div className="h-52 overflow-hidden relative">
                <img src={prod.imgSrc} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm ${prod.tagBg}`}>
                  {prod.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-extrabold text-lg mb-2 text-[var(--teal)]">{prod.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{prod.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[var(--brand-dark)] font-bold text-base">{prod.price}</span>
                  <button
                    className="detail-product-btn text-xs font-bold border border-[var(--brand)] text-[var(--brand-dark)] hover:bg-[var(--brand)] hover:text-white px-4 py-2 rounded-full transition-all duration-200"
                    onClick={() => {
                      setActiveProduct(prod);
                      setActiveProductTab('nutrition');
                    }}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section id="testimoni" className="py-20" style={{ background: 'var(--light)' }}>
        <div className="text-center mb-10 reveal">
          <span className="text-[var(--brand-dark)] text-xs font-bold uppercase tracking-widest">Testimoni</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 text-[var(--teal)]">Kata Mereka yang Sudah Coba</h2>
        </div>

        <div className="max-w-4xl mx-auto px-5 relative overflow-hidden reveal">
          <div
            className="flex transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing"
            style={{
              transform: touchStart !== null
                ? `translateX(calc(-${activeTestiSlide * 100}% + ${touchDiff}px))`
                : `translateX(-${activeTestiSlide * 100}%)`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsTestiHovered(true)}
            onMouseLeave={() => setIsTestiHovered(false)}
          >
            {testimonialData.map((testi, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-50 max-w-xl mx-auto">
                  <img className="w-16 h-16 rounded-full mx-auto mb-4 object-cover ring-4 ring-green-50" src={testi.imgSrc} alt={`Foto ${testi.name}`} />
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 italic">"{testi.text}"</p>
                  <p className="font-bold text-sm text-[var(--teal)]">{testi.name}</p>
                  <p className="text-gray-400 text-xs">{testi.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigasi Kiri / Kanan */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 shadow-md hover:text-[var(--brand)] w-10 h-10 rounded-full flex items-center justify-center hover:shadow-lg transition focus:outline-none hidden sm:flex"
            onClick={() => setActiveTestiSlide((prev) => (prev - 1 + testimonialData.length) % testimonialData.length)}
            aria-label="Slide Sebelumnya"
          >
            &#10094;
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 shadow-md hover:text-[var(--brand)] w-10 h-10 rounded-full flex items-center justify-center hover:shadow-lg transition focus:outline-none hidden sm:flex"
            onClick={() => setActiveTestiSlide((prev) => (prev + 1) % testimonialData.length)}
            aria-label="Slide Selanjutnya"
          >
            &#10095;
          </button>
        </div>

        {/* Indikator Dot */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialData.map((_, idx) => (
            <button
              key={idx}
              className={`dot transition-all duration-300 rounded-full focus:outline-none ${
                activeTestiSlide === idx ? 'active' : ''
              }`}
              onClick={() => setActiveTestiSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="kontak" className="text-white" style={{ background: 'var(--teal)' }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          <p className="font-bold text-lg text-center md:text-left max-w-sm">Daftar untuk mendapat info promo, resep, dan cerita dari kebun petani kami.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row w-full md:w-auto gap-2 relative">
            <div className="flex flex-col w-full md:w-64">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Alamat email"
                className="rounded-full px-5 py-3 text-sm text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition"
                required
              />
              <span className={`text-red-400 text-xs mt-1 px-3 ${emailError ? 'block' : 'hidden'}`}>
                Format email tidak valid.
              </span>
            </div>
            <button
              type="submit"
              disabled={isNewsletterLoading}
              className="cta-pill text-white text-sm font-semibold px-6 py-3 rounded-full whitespace-nowrap flex items-center justify-center gap-2 h-[44px]"
            >
              <span>{isNewsletterLoading ? 'Memproses...' : 'Daftar'}</span>
              {isNewsletterLoading && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </button>
          </form>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2 font-extrabold text-lg mb-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'var(--brand)' }}>🌴</span>
              Gula Aren Nita
            </a>
            <p className="text-white/60 text-sm leading-relaxed">Gula aren asli homemade, disadap dan diolah langsung oleh petani lokal di lereng gunung Kuningan, Jawa Barat.</p>
          </div>
          <div>
            <h4 className="text-[var(--brand)] font-bold text-sm mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#tentang" className="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#produk" className="hover:text-white transition">Produk</a></li>
              <li><a href="#testimoni" className="hover:text-white transition">Testimoni</a></li>
              <li><a href="#" className="hover:text-white transition">Cara Pemesanan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[var(--brand)] font-bold text-sm mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white transition">TikTok</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[var(--brand)] font-bold text-sm mb-4">Kantor Kami</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Desa Cibulan, Kuningan, Jawa Barat</li>
              <li>halo@niraasli.id</li>
              <li>(0812) 3456-7890</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 text-xs text-white/50">
          <p>Hak Cipta © 2026 Gula Aren Nita. Semua hak dilindungi.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Syarat Penggunaan</a>
            <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

      {/* ============ LIGHTBOX MODAL ============ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center p-4 transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl focus:outline-none"
            aria-label="Tutup"
            onClick={() => setLightboxIndex(null)}
          >
            &times;
          </button>
          <div
            className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] md:max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[250px] md:min-h-0">
              <img
                className="w-full h-full object-contain max-h-[45vh] md:max-h-[70vh]"
                src={galleryData[lightboxIndex].imgSrc}
                alt={galleryData[lightboxIndex].alt}
              />

              {/* Navigasi Lightbox */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 transition focus:outline-none"
                onClick={() => setLightboxIndex((prev) => prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null)}
              >
                &#10094;
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 transition focus:outline-none"
                onClick={() => setLightboxIndex((prev) => prev !== null ? (prev + 1) % galleryData.length : null)}
              >
                &#10095;
              </button>
            </div>

            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-white text-[var(--ink)] overflow-y-auto">
              <div>
                <span className="text-[var(--brand-dark)] text-xs font-bold uppercase tracking-widest block mb-2">
                  Langkah {lightboxIndex + 1} dari {galleryData.length}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-[var(--teal)]">
                  {galleryData[lightboxIndex].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {galleryData[lightboxIndex].desc}
                </p>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-4 mt-auto">
                <span>Gula Aren Asli Gula Aren Nita</span>
                <span>Tradisional & Murni</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ PRODUCT DETAIL MODAL ============ */}
      {activeProduct !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeProductModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-extrabold text-xl md:text-2xl text-[var(--teal)]">{activeProduct.name}</h3>
              <button className="text-gray-400 hover:text-red-500 text-3xl focus:outline-none" onClick={closeProductModal}>&times;</button>
            </div>

            {/* Konten Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="flex flex-col md:flex-row gap-6">
                <img className="w-full md:w-48 h-48 object-cover rounded-xl shadow-sm" src={activeProduct.imgSrc} alt={activeProduct.name} />
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{activeProduct.desc}</p>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Harga</span>
                      <span className="text-[var(--brand-dark)] font-extrabold text-lg">{activeProduct.price}</span>
                    </div>
                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo Gula Aren Nita, saya ingin memesan produk [${activeProduct.name}] seharga ${activeProduct.price.split('/')[0].trim()}. Mohon informasi ketersediaan stock, cara pengiriman, dan biaya total ke alamat saya.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-pill text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 transition hover:scale-105"
                    >
                      💬 Pesan via WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Tab Konten: Nutrisi & Resep */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex gap-4 border-b border-gray-100 mb-4 text-sm font-semibold">
                  <button
                    className={`pb-2 focus:outline-none transition ${
                      activeProductTab === 'nutrition'
                        ? 'border-b-2 border-[var(--brand)] text-[var(--brand-dark)]'
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveProductTab('nutrition')}
                  >
                    Informasi Gizi
                  </button>
                  <button
                    className={`pb-2 focus:outline-none transition ${
                      activeProductTab === 'recipe'
                        ? 'border-b-2 border-[var(--brand)] text-[var(--brand-dark)]'
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveProductTab('recipe')}
                  >
                    Saran Penyajian
                  </button>
                </div>

                {/* Tab Content: Nutrition */}
                {activeProductTab === 'nutrition' && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-gray-400 italic mb-2">*Kandungan gizi per 100g porsi saji.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      {Object.entries(activeProduct.nutrition).map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-gray-100 pb-1.5">
                          <span className="text-gray-500">{key}</span>
                          <span className="font-bold text-[var(--teal)]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content: Recipe */}
                {activeProductTab === 'recipe' && (
                  <div className="bg-[var(--light)] p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-xs uppercase text-gray-500 mb-2 tracking-wider">Rekomendasi Cara Menyajikan</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{activeProduct.recipe}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ TOAST NOTIFICATION ============ */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 ${
          toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="text-lg">✓</span>
        <span>{toast.message}</span>
      </div>

      {/* ============ BACK TO TOP BUTTON ============ */}
      <button
        id="back-to-top"
        className={`fixed bottom-6 right-6 z-40 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </div>
  );
}

export default App;
