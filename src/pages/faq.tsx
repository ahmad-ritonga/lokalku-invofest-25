import { useState } from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

// Lightweight Animated Dots Background
const AnimatedDotsBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 w-full h-full opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'dotsPulse 3s ease-in-out infinite'
        }} />
        
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-gray-900/80 dark:to-gray-900" 
          style={{
            background: `radial-gradient(ellipse at top, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,1) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/80 to-gray-900 hidden dark:block"
          style={{
            background: `radial-gradient(ellipse at top, transparent 0%, rgba(17,24,39,0.2) 40%, rgba(17,24,39,1) 100%)`,
          }}
        />
      </div>
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ item, index, isOpen, onToggle }: { 
  item: FAQItem; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 dark:border-gray-800"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {item.question}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "Apa itu LokalKU?",
      answer: "LokalKU adalah platform direktori UMKM digital yang menghubungkan UMKM lokal Banyumas dengan pasar global. Kami menyediakan ekosistem ekonomi yang berkelanjutan dan memberdayakan pengusaha lokal untuk berkembang hingga tingkat internasional melalui teknologi digital."
    },
    {
      question: "Bagaimana cara mendaftarkan UMKM saya di LokalKU?",
      answer: "Untuk mendaftarkan UMKM Anda, klik tombol 'Daftar UMKM' di halaman utama atau hubungi kami melalui halaman kontak. Tim kami akan membantu proses verifikasi dan pendaftaran bisnis Anda ke dalam direktori LokalKU dengan gratis."
    },
    {
      question: "Apakah ada biaya untuk mendaftarkan UMKM?",
      answer: "Saat ini, pendaftaran UMKM di platform LokalKU sepenuhnya gratis. Kami berkomitmen untuk mendukung pertumbuhan UMKM lokal tanpa beban biaya tambahan. Fitur premium mungkin tersedia di masa mendatang dengan manfaat tambahan."
    },
    {
      question: "Bagaimana cara mencari UMKM terdekat dari lokasi saya?",
      answer: "Anda dapat menggunakan fitur 'UMKM Terdekat' di halaman utama. Izinkan akses lokasi pada browser Anda, dan sistem akan secara otomatis menampilkan UMKM yang berada di sekitar Anda. Anda juga bisa menggunakan filter berdasarkan jarak dan kategori."
    },
    {
      question: "Kategori UMKM apa saja yang tersedia di LokalKU?",
      answer: "LokalKU menyediakan berbagai kategori UMKM termasuk Kuliner, Fashion & Pakaian, Kerajinan Tangan, Jasa, Elektronik, Kesehatan & Kecantikan, Pertanian, dan masih banyak lagi. Anda dapat memfilter berdasarkan kategori di halaman direktori."
    },
    {
      question: "Bagaimana cara menghubungi UMKM yang terdaftar?",
      answer: "Setiap profil UMKM dilengkapi dengan informasi kontak seperti nomor telepon, WhatsApp, dan lokasi. Klik tombol 'Hubungi' atau 'Chat WhatsApp' pada detail UMKM untuk langsung berkomunikasi dengan pemilik usaha."
    },
    {
      question: "Apakah saya bisa menyimpan UMKM favorit saya?",
      answer: "Ya! Anda dapat menyimpan UMKM favorit dengan mengklik ikon hati pada kartu UMKM. Semua favorit Anda akan tersimpan dan dapat diakses melalui halaman 'Favorit Saya' untuk memudahkan Anda mengunjungi kembali."
    },
    {
      question: "Bagaimana cara memberikan ulasan untuk UMKM?",
      answer: "Pada halaman detail UMKM, scroll ke bawah ke bagian 'Ulasan'. Klik tombol 'Tulis Ulasan', berikan rating bintang, dan tulis pengalaman Anda. Ulasan Anda akan membantu UMKM berkembang dan membantu pengguna lain dalam membuat keputusan."
    },
    {
      question: "Apakah data UMKM yang ditampilkan selalu terupdate?",
      answer: "Ya, kami bekerja sama dengan pemilik UMKM untuk memastikan informasi seperti jam operasional, lokasi, dan kontak selalu terupdate. Jika Anda menemukan informasi yang tidak akurat, silakan laporkan melalui tombol 'Laporkan' atau hubungi kami."
    },
    {
      question: "Bagaimana LokalKU membantu UMKM berkembang?",
      answer: "LokalKU menyediakan platform digital untuk meningkatkan visibilitas UMKM, menghubungkan dengan pelanggan lebih luas, dan memberikan analitik bisnis. Kami juga menyediakan edukasi digital marketing dan networking dengan UMKM lainnya."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Dots Background */}
        <AnimatedDotsBackground />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">{/* Changed pt-24 to pt-32 for more top padding */}
          {/* Header */}
          <div className="text-center mb-12 blur-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                FAQ section
              </span>
            </div>
            
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              We've compiled the most important information to help you get the most out of your experience.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400">
              Can't find what you're looking for?{" "}
              <a 
                href="https://www.ahmadrian.site/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                Contact us.
              </a>
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden blur-fade-in" style={{ animationDelay: "0.3s" }}>
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center blur-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Masih Ada Pertanyaan?
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Tim kami siap membantu Anda. Hubungi kami melalui email atau WhatsApp untuk mendapatkan bantuan lebih lanjut.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.ahmadrian.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Kami
                </a>
                
                <a
                  href="https://wa.me/6282123479638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          @keyframes blurFadeIn {
            0% {
              opacity: 0;
              filter: blur(10px);
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              filter: blur(0);
              transform: translateY(0);
            }
          }

          .blur-fade-in {
            animation: blurFadeIn 0.8s ease-out both;
          }

          @keyframes dotsPulse {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
}