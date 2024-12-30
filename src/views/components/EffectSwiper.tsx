import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './EffectSwiper.css';
// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {

  // 图片路径集合
  const [images, setImages] = useState([]);
  // 图片名称及颜色
  const imageParams = [
    { name: '戴帽子像素人', color: 'red' },
    { name: '方块人', color: 'green' },
    { name: '方块人杂技', color: 'blue' },
    { name: '可爱像素人', color: 'yellow' },
    { name: '像素巫师', color: 'purple' },
    { name: '像素宝箱', color: '' },
    { name: '方块魔法师', color: '' },
    { name: '像素人', color: '' },
    { name: '魔法师像素人', color: '' },
    { name: '方块人那套索', color: '' },
    { name: '像素魔法巫师', color: '' },
    { name: '像素人拿绳子', color: '' },
    { name: '像素人拿宝箱', color: '' },
    { name: '像素人拿剑', color: '' },
  ];

  // Load images and JSON data
  const loadImages = async () => {
    const imageModules = import.meta.glob('@/assets/images/*.svg');
    const loadedImages = await Promise.all(
      Object.values(imageModules).map(async (module) => {
        const moduleResult = await module();
        return moduleResult.default;
      })
    );
    setImages(loadedImages);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[240px] h-[320px] bg-gray-100"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index} className='flex flex-col'>
              <img className='w-1/2 aspect-square' src={image} alt={`Image ${index}`} />
              <div>
                <h3>
                  {
                    imageParams[index].name
                  }
                </h3>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}
