import { Card, CardBody, Button, Chip, Avatar } from "@heroui/react";
import { 
  MapPin, 
  Store, 
  Heart,
  Coffee,
  Lightbulb
} from "lucide-react";

interface WelcomeMessageProps {
  onQuickReply: (reply: string) => void;
}

export const WelcomeMessage = ({ onQuickReply }: WelcomeMessageProps) => {
  const quickStartOptions = [
    {
      icon: MapPin,
      text: "Warung makan terdekat",
      query: "Cari warung makan terdekat",
      color: "danger" as const
    },
    {
      icon: Store,
      text: "Toko batik Banyumas",
      query: "Cari toko batik Banyumas",
      color: "primary" as const
    },
    {
      icon: Coffee,
      text: "Rekomendasi kafe",
      query: "Rekomendasikan kafe yang bagus",
      color: "secondary" as const
    },
    {
      icon: Heart,
      text: "UMKM rating tertinggi",
      query: "Tampilkan UMKM dengan rating tertinggi",
      color: "success" as const
    },
  ];

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-br from-primary-50 to-orange-50 dark:from-primary-900/20 dark:to-orange-900/20 border-primary-200 dark:border-primary-800">
        <CardBody className="p-6">
          <div className="flex items-start gap-4">
            <Avatar
              src="/assets/images/maskot.webp"
              alt="SABI"
              size="lg"
              className="flex-shrink-0"
              imgProps={{
                onError: (e) => {
                  e.currentTarget.src = "/assets/images/maskot.webp";
                }
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Selamat datang di LokalKU
                </h3>
                <Chip size="sm" color="primary" variant="flat">
                  SABI AI
                </Chip>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Temukan UMKM terbaik di Banyumas dengan mudah. Saya siap membantu Anda mencari 
                makanan, tempat belanja, jasa, dan berbagai kebutuhan lainnya.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions Section */}
      <div className="space-y-3">
        <h4 className="font-playfair text-lg font-medium text-gray-800 dark:text-gray-200 px-1">
          Mulai Pencarian
        </h4>
        
        <div className="grid grid-cols-1 gap-2">
          {quickStartOptions.map((option, idx) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={idx}
                variant="flat"
                color={option.color}
                className="justify-start h-auto p-4"
                startContent={<IconComponent size={20} />}
                onPress={() => onQuickReply(option.query)}
              >
                <span className="text-left">{option.text}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardBody className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Lightbulb size={16} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h5 className="font-playfair text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                Tips Pencarian
              </h5>
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                Anda bisa bertanya apa saja! Contoh: "Cari bengkel motor terdekat", 
                "Rekomendasi tempat nongkrong", atau "UMKM dengan rating 4.5+"
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};