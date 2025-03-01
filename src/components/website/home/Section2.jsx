import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection"; // Assuming you have a hook to get the direction
import { Link } from "react-router-dom";

export default function Section2() {
  const images = ["/carousel1.webp", "/carousel2.webp", "/carousel3.webp"];
  const { t } = useTranslation();
  const dir = useDirection();

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-10 px-5 lg:px-10 font-body">
      {/* Text Content */}
      <div className="lg:w-1/2 flex justify-center items-center" dir={dir}>
        <div className="max-w-[770px] flex flex-col justify-center gap-6 text-center lg:text-left">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            {t("section2.title")}
          </p>
          <p className="text-base sm:text-lg text-gray-600">
            {t("section2.description")}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link to="/products">
              <button className="bg-black font-bold text-white px-6 sm:px-8 lg:px-10 py-2 sm:py-3 hover:bg-lime-900 transition duration-300">
                {t("section2.button")}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className=" flex justify-center items-center">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="m-0">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={
                  "flex items-center justify-center pl-0 m-0 lg:basis-1/2 w-[100px] lg:w-[300px]"
                }
              >
                <img
                  src={image}
                  alt="carousel"
                  className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
