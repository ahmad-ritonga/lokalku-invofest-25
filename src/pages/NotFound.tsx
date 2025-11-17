import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Mail, Star } from "lucide-react";
import DefaultLayout from "@/layouts/default";
import FuzzyText from "../components/FuzzyText";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4 pt-20 md:pt-24 relative overflow-hidden">
        {/* Floating Stars Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Star 
                size={Math.random() * 8 + 4} 
                className="text-white/20 animate-spin" 
                style={{
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-violet-400/10 animate-bounce"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 max-w-2xl mx-auto relative z-10">
          {/* Fuzzy Text 404 with Glow Effect - Enlarged for better mobile visibility */}
          <div className="flex justify-center animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-white/20 rounded-full animate-ping"></div>
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                color="#ffffff"
                fontSize="clamp(6rem, 25vw, 16rem)"
                fontWeight={900}
              >
                404
              </FuzzyText>
            </div>
          </div>

          {/* Error Message with Slide Animation */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white animate-slide-in-left">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto animate-slide-in-right">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
            </p>
          </div>

          {/* Action Buttons with Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button
              color="primary"
              size="lg"
              startContent={<Home size={20} />}
              onPress={() => navigate("/")}
              className="min-w-[160px] transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Kembali ke Beranda
            </Button>
            
            <Button
              variant="bordered"
              size="lg"
              startContent={<ArrowLeft size={20} />}
              onPress={() => navigate(-1)}
              className="min-w-[160px] border-white/20 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Halaman Sebelumnya
            </Button>
          </div>

          {/* Contact Support with Email */}
          <div className="pt-8 border-t border-white/10 animate-fade-in-up space-y-4">
            <p className="text-gray-400 text-sm">
              Jika Anda yakin ini adalah kesalahan, silakan hubungi tim dukungan kami:
            </p>
            <Button
              variant="light"
              size="sm"
              startContent={<Mail size={16} />}
              onPress={() => window.open('mailto:alriansr@gmail.com', '_blank')}
              className="text-blue-300 hover:text-blue-200 transform hover:scale-105 transition-all duration-300"
            >
              alriansr@gmail.com
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}