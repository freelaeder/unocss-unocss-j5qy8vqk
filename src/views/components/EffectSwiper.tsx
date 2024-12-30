import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import Loading from './Loading';

// 处理SwiperSlide的切换
interface SwiperInstance {
  activeIndex: number;
}


export default function App() {

  // 图片路径集合
  const [images, setImages] = useState<string[]>([]);
  // 新增状态来追踪当前的索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 控制加载状态
  const [loading, setLoading] = useState(true);
  // 图片名称及颜色参数
  const imageParams = [
    {
      name: '戴帽子像素人',
      color: 'rgb(206, 17, 17)',
      content: '戴帽子像素人是一个生活在像素世界里的勇敢人物。每天，他都带着一顶不同的帽子，去寻找新的冒险。无论是战斗怪物，还是帮助需要帮助的人，戴帽子像素人总是毫不犹豫地站出来，成为别人眼中的英雄。他的帽子有着不同的象征，每一顶帽子代表着不同的力量和故事。每一顶帽子都是他过往冒险的象征，代表着他所获得的不同力量。戴帽子像素人不仅仅是一个冒险家，他更是一个象征着勇气、智慧与坚持的存在。'
    },
    {
      name: '方块人',
      color: 'rgb(0, 140, 255)',
      content: '方块人是一个拥有方形身体的神秘存在，他生活在方块世界的中心。这个世界的每个角落都充满了几何形状，而方块人却拥有独特的能力，可以改变任何物体的形状。通过这些能力，他不仅解决了许多难题，还结交了许多朋友。方块人从小就知道自己与众不同，他的能力不仅能够将方块形状变得更具创意，还能在面临困难时灵活应变。方块人通过自己对几何世界的理解，不仅帮助他人，还逐渐解开了世界背后深藏的秘密。每次的冒险都充满了挑战和未知，但每一次的突破也让他变得更加成熟。'
    },
    {
      name: '方块人杂技',
      color: 'rgb(10, 184, 111)',
      content: '方块人杂技是方块世界里最受欢迎的表演之一。每当夜幕降临，方块人和他的伙伴们都会进行一场精彩的杂技表演。无论是空中飞跃，还是奇特的几何动作，他们的表演总能让观众目瞪口呆。方块人以他的灵活和创意，赢得了世界各地观众的喜爱。这些杂技不仅仅是一场表演，更是方块人对生活的一种表达。他通过这些舞蹈般的动作与变化，展现了自己内心对自由与创造的渴望。他的每一场演出，都带给观众无尽的惊叹与欢笑，而这些精彩的时刻也让方块人更加坚定了自己走向更广阔世界的决心。'
    },
    {
      name: '可爱像素人',
      color: 'rgb(211, 122, 7)',
      content: '可爱像素人是一个拥有无限爱心的小精灵，他生活在像素村庄里。每当有村民需要帮助，他都会毫不犹豫地伸出援手。无论是修理破损的房屋，还是帮助种植庄稼，他都做得尽善尽美。他那双大大的眼睛，总是充满了温暖和善意。可爱像素人有着一种特殊的能力，他能够通过简单的微笑和关怀，化解周围的一切困难和矛盾。他不仅仅是村庄的守护者，更是村民们心中的希望。在他的小小世界里，充满了关爱与温暖，每一个曾经被他帮助过的人，都会在心里种下感恩的种子，继续传递善意。'
    },
    {
      name: '像素巫师',
      color: 'rgb(118, 163, 12)',
      content: '像素巫师是一个拥有强大魔法力量的神秘人物。身穿长袍，手持法杖，他总是在像素世界的边缘施展着神奇的魔法。他不仅精通各种元素魔法，还能用魔法改变世界的规则。像素巫师的故事流传千里，成为了许多人心中的传奇。他的魔法不仅仅限于普通的元素控制，还涉及到时间、空间的操控。随着他的魔法越来越强大，他也意识到自己的力量所带来的责任。为了更好地掌控这些力量，像素巫师开始踏上了更为艰难的修行之路。在每一次魔法的施展中，他都在不断思索，如何将这些力量运用到更为善良的目的上。'
    },
    {
      name: '像素宝箱',
      color: 'rgb(180, 10, 47)',
      content: '像素宝箱是一个充满神秘的物品，传说它拥有无穷的财富和奇珍异宝。每一个打开宝箱的人，都可能发现不同的惊喜。从珍贵的宝石到古老的神器，像素宝箱总是带来意想不到的幸运。人们纷纷为打开宝箱而竞相努力，但也有不少人陷入了宝箱的诅咒中。传说中，这个宝箱不仅仅是财富的象征，更是命运的引导者。每一次打开，都会揭示出不同的命运轨迹，或是带来巨大的财富，或是带来无法预见的灾难。有人说，打开宝箱的人必须具备无畏的心灵，只有勇敢者才能真正掌控宝箱的力量。'
    },
    {
      name: '方块魔法师',
      color: 'rgb(35, 99, 19)',
      content: '方块魔法师是一位高深的魔法使者，住在方块世界的深处。不同于普通的魔法师，他擅长用方块元素施展魔法，能创造出各种令人惊叹的魔法效果。无论是召唤怪物，还是打造不朽的魔法护盾，他都能够轻松掌控。方块魔法师的每一场施法，都是一场视觉与心灵的双重震撼。他的魔法不单单依赖于力量，更在于他如何利用方块的独特性质。方块魔法师拥有掌控创造与毁灭的力量，他可以通过改变物体的方块结构来影响整个世界的规律。在他的世界里，魔法是无所不能的，而他通过这些力量，帮助无数人化解危机。'
    },
    {
      name: '像素人',
      color: 'rgb(0, 68, 255)',
      content: '像素人是一个生活在像素世界的普通居民，尽管他的外形简单，但内心充满了冒险精神。像素人梦想着有一天能够离开像素村，去探索更广阔的世界。他的勇气和智慧，让他不断在挑战中成长。虽然他的世界充满了规则与限制，但他从未放弃过自己心中的梦想。每次冒险，像素人都能遇到新的挑战，也收获了新的朋友。在他身上，体现了每个普通人都拥有超越自我的潜力，正是这种勇敢的精神，鼓舞着他去战胜困难，迎接每一次未知的冒险。'
    },
    {
      name: '魔法师像素人',
      color: 'rgb(218, 12, 218)',
      content: '魔法师像素人是一位身穿华丽法袍的年轻魔法师，他的魔法力量与众不同。通过对像素世界的深入研究，他发现了一种将魔法与像素元素结合的方法，使得他的魔法变得更加强大而神奇。他不仅仅学习了传统的魔法技巧，还创造了属于自己的魔法法则。魔法师像素人的力量并非来自于强大的体力，而是来自于他对于像素世界深刻的理解和控制。他的每一场魔法，都充满了创造性与智慧，而这种新型的魔法，也逐渐改变了像素世界的格局。在他的冒险中，魔法不仅仅是一个工具，更是与世界沟通的桥梁。'
    },
    {
      name: '大力士小恶魔',
      color: 'rgb(255, 0, 0)',
      content: '大力士小恶魔是一个以力量为荣的角色。尽管他身材小巧，但他拥有着超乎常人的力量。每当战斗来临，他总是冲在最前面，凭借着惊人的力量，将敌人一一击败。他的勇猛与坚韧，使得他成为了恶魔界的英雄。大力士小恶魔虽然外表强大，但他内心却拥有一颗温柔的心。在战斗的背后，他总是默默守护着身边的人，帮助那些需要帮助的弱者。他的力量不仅仅是肉体的，更是来自于他无畏的心和对正义的坚定信念。'
    },
    {
      name: '大笑小恶魔',
      color: 'rgb(255, 165, 0)',
      content: '大笑小恶魔以他的笑声闻名。他那充满魔力的笑声，能让任何人都陷入欢笑之中。无论是敌人还是朋友，只要听到他的笑声，都无法保持严肃。这种奇特的能力使得大笑小恶魔在恶魔世界中有着独特的地位。'
    },
    {
      name: '呆萌小恶魔',
      color: 'rgb(255, 155, 0)',
      content: '呆萌小恶魔是恶魔界最可爱的角色之一。尽管她有着恶魔的外形，但她却有一颗纯真无邪的心。她总是傻乎乎地笑着，给周围的人带来温暖和欢乐。她的天真和善良，使她成为了恶魔界的最爱。'
    },
    {
      name: '可爱小恶麾',
      color: 'rgb(0, 128, 0)',
      content: '可爱小恶麾是恶魔世界里最具魅力的存在之一。她那迷人的微笑和天使般的眼神，总能让所有人感到温馨。尽管她是恶魔，但她总是带着友善的态度与人相处，她的故事常常成为恶魔世界里最动人的传说。'
    },
    {
      name: '恐怖小恶魔',
      color: 'rgb(0, 0, 255)',
      content: '恐怖小恶魔是恶魔界最为神秘和恐怖的角色之一。身披黑袍，眼中透出冰冷的光芒，他的出现总能让人感到不寒而栗。恐怖小恶魔的故事总是充满了恐惧与悬疑，令无数人胆寒。'
    },
    {
      name: '吸血小恶麾',
      color: 'rgb(75, 0, 130)',
      content: '吸血小恶麾是一位古老的恶魔，他的生命源泉来自吸取他人的血液。虽然他是恶魔中的吸血鬼，但他却拥有一颗矛盾的心。他既渴望力量，又惧怕孤独，在无尽的黑夜中徘徊。'
    },
    {
      name: '小恶魔艾玛',
      color: 'rgb(238, 130, 238)',
      content: '小恶魔艾玛是一个充满魔力的年轻恶魔，她有着一对翅膀，可以自由飞翔在天空中。艾玛善良又勇敢，她不喜欢与别人为敌，总是尽力帮助需要帮助的人。她的故事充满了挑战和成长，逐渐成为了恶魔界的代表人物之一。'
    },
    {
      name: '小恶磨蝙蝠',
      color: 'rgb(128, 0, 0)',
      content: '小恶磨蝙蝠是一只神秘的恶魔蝙蝠，拥有夜视能力和迅猛的飞行速度。他在黑暗中飞行，成为了许多恶魔传说中的一部分。他的故事充满了恐怖和孤独，只有最强大的恶魔才能与他并肩作战。'
    },
    {
      name: '小恶魔查理',
      color: 'rgb(255, 192, 203)',
      content: '小恶魔查理是恶魔世界里最爱笑的角色之一。他总是带着笑容，不论发生什么，他都能从中找到幽默的一面。查理用他的笑声和幽默让恶魔世界充满了欢乐，他的故事传遍了每个角落。'
    },
    {
      name: '小恶麾哈利',
      color: 'rgb(255, 69, 0)',
      content: '小恶麾哈利是一位狡猾而聪明的恶魔，他的头脑比力量更为强大。无论是与敌人对抗，还是解开难题，哈利总能巧妙地化解一切困境。他的机智和幽默让他成为恶魔世界中的传奇人物。'
    },
    {
      name: '小恶魔坏笑',
      color: 'rgb(34, 139, 34)',
      content: '小恶魔坏笑是恶魔世界中的反派角色之一。他那邪恶的笑声总能让人感到一阵寒意。每当他出现在场景中，都会带来一阵紧张气氛。坏笑的故事充满了背叛和阴谋，成为了恶魔界的黑暗传说。'
    },
    {
      name: '小恶魔杰克',
      color: 'rgb(0, 191, 255)',
      content: '小恶魔杰克是恶魔界中的一位勇士，他以无畏和坚毅著称。杰克总是为了保护自己的家园而战斗，不怕面对任何敌人。他的坚韧不拔和勇气让他成为恶魔界的英雄，传说他的故事永远不会消失。'
    },
    {
      name: '小恶魔卡尔',
      color: 'rgb(123, 104, 238)',
      content: '小恶魔卡尔是一位神秘的角色，他的外形和性格都充满了不确定性。无论是在战斗中，还是在与他人互动时，卡尔总是带着一层神秘面纱。他的故事充满了冒险和危险，成为了许多恶魔追寻的目标。'
    },
    {
      name: '小恶魔莱恩',
      color: 'rgb(255, 20, 147)',
      content: '小恶魔莱恩是一个充满能量和活力的恶魔，他的笑容能够照亮整个黑暗世界。莱恩喜欢挑战自己和他人，总是在冒险中寻找乐趣。尽管他外表凶猛，但内心却有着一颗善良的心。'
    },
    {
      name: '小恶麾丽莎',
      color: 'rgb(255, 105, 180)',
      content: '小恶麾丽莎是一位充满魔力的女性角色，她的美丽和智慧使她在恶魔世界中备受敬仰。丽莎不仅拥有强大的法术，还擅长与人打交道。她用她的魅力征服了恶魔界的许多人。'
    },
    {
      name: '小恶麾吓人',
      color: 'rgb(139, 0, 0)',
      content: '小恶麾吓人是一个专门制造恐惧和惊悚气氛的恶魔。他总是喜欢在别人最放松的时候出现，给人带来强烈的心理冲击。他的故事总是让人毛骨悚然，成为了恶魔界的恐怖传奇之一。'
    },
    {
      name: '小恶魔象鼻',
      color: 'rgb(0, 100, 0)',
      content: '小恶魔象鼻是恶魔界的一个守护者，他的象鼻能感知到一切危险。无论敌人隐藏在哪里，只要他挥动鼻子，敌人的行踪就无所遁形。象鼻的故事总是与勇气和智慧紧密相连。'
    },
    {
      name: '小恶魔小牛',
      color: 'rgb(54, 94, 77)',
      content: '小恶魔小牛是一个力大无穷的恶魔，他在恶魔界中以无畏和坚强著称。每当遇到困难时，他总是冲在最前面，用自己强大的力量打破一切障碍。他的故事告诉我们，只有无畏地面对挑战，才能获得最终的胜利。'
    },
  ];
  // 按顺序加载图片和 JSON 数据
  const loadImages = async () => {
    const imageModules = import.meta.glob('@/assets/images/*.svg');
    const imagePaths = Object.keys(imageModules).sort((a, b) => {
      const matchA = a.match(/(\d+)\.svg$/);
      const numA = matchA ? parseInt(matchA[1]) : 0;
      const matchB = b.match(/(\d+)\.svg$/);
      const numB = matchB ? parseInt(matchB[1]) : 0;
      return numA - numB;
    });

    const loadedImages = [];
    for (const path of imagePaths) {
      const module = await imageModules[path]() as { default: string };
      loadedImages.push(module.default);
    }

    setImages(loadedImages);
    // 延迟 1 秒钟
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // 数据加载完成后隐藏loading
    setLoading(false);
  };
  // 处理SwiperSlide的切换
  const handleSlideChange = (swiper: SwiperInstance): void => {
    setCurrentIndex(swiper.activeIndex); // 更新当前的索引
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-[240px] h-[320px] bg-gray-100 mt-2em"
              onSlideChange={handleSlideChange} // 监听滑动事件
            >
              {
                images.map((image, index) => (
                  <SwiperSlide key={index} className='flex flex-col items-center justify-center rounded-lg font-bold text-white' style={{ backgroundColor: imageParams[index].color }}>
                    <img className='w-1/2 aspect-square rounded' src={image} alt={`Image ${index}`} />
                    <div>
                      <h3 className="mt-2em animate-bounce-alt animate-duration-2s">
                        {
                          imageParams[index].name
                        }
                      </h3>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <div className='w-50vw max-w-55vw min-w-[300px] h-full bg-gray-100 mx-auto p-4 mt-4 text-white text-xl rounded' style={{ backgroundColor: imageParams[currentIndex].color, }}>
              <p>
                {
                  imageParams[currentIndex].content
                }
              </p>
            </div>
          </>
        )
      }
    </>
  );
}
