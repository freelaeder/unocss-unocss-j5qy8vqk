import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {

  // 图片路径集合
  const [images, setImages] = useState([]);
  // 图片名称及颜色参数
  const imageParams = [
    { name: '戴帽子像素人', color: 'rgb(206, 17, 17)' },
    { name: '方块人', color: 'rgb(0, 140, 255)' },
    { name: '方块人杂技', color: 'rgb(10, 184, 111)' },
    { name: '可爱像素人', color: 'rgb(211, 122, 7)' },
    { name: '像素巫师', color: 'rgb(118, 163, 12)' },
    { name: '像素宝箱', color: 'rgb(180, 10, 47)' },
    { name: '方块魔法师', color: 'rgb(35, 99, 19)' },
    { name: '像素人', color: 'rgb(0, 68, 255)' },
    { name: '魔法师像素人', color: 'rgb(218, 12, 218)' },
    { name: '大力士小恶魔', color: 'rgb(255, 0, 0)' },
    { name: '大笑小恶魔', color: 'rgb(255, 165, 0)' },
    { name: '呆萌小恶魔', color: 'rgb(255, 255, 0)' },
    { name: '可爱小恶麾', color: 'rgb(0, 128, 0)' },
    { name: '恐怖小恶魔', color: 'rgb(0, 0, 255)' },
    { name: '吸血小恶麾', color: 'rgb(75, 0, 130)' },
    { name: '小恶魔艾玛', color: 'rgb(238, 130, 238)' },
    { name: '小恶磨蝙蝠', color: 'rgb(128, 0, 0)' },
    { name: '小恶魔查理', color: 'rgb(255, 192, 203)' },
    { name: '小恶麾哈利', color: 'rgb(255, 69, 0)' },
    { name: '小恶魔坏笑', color: 'rgb(34, 139, 34)' },
    { name: '小恶魔杰克', color: 'rgb(0, 191, 255)' },
    { name: '小恶魔卡尔', color: 'rgb(123, 104, 238)' },
    { name: '小恶魔莱恩', color: 'rgb(255, 20, 147)' },
    { name: '小恶麾丽莎', color: 'rgb(255, 105, 180)' },
    { name: '小恶麾吓人', color: 'rgb(139, 0, 0)' },
    { name: '小恶魔象鼻', color: 'rgb(0, 100, 0)' },
    { name: '小恶魔小牛', color: 'rgb(54, 94, 77)' },
  ];

  // 按顺序加载图片和 JSON 数据
  const loadImages = async () => {
    const imageModules = import.meta.glob('@/assets/images/*.svg');
    const imagePaths = Object.keys(imageModules).sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)\.svg$/)[1]);
      const numB = parseInt(b.match(/(\d+)\.svg$/)[1]);
      return numA - numB;
    });

    const loadedImages = [];
    for (const path of imagePaths) {
      const module = await imageModules[path]();
      loadedImages.push(module.default);
    }

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
            <SwiperSlide key={index} className='flex flex-col  items-center justify-center rounded-lg font-bold text-white' style={{ backgroundColor: imageParams[index].color }}>
              <img className='w-1/2 aspect-square rounded' src={image} alt={`Image ${index}`} />
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
