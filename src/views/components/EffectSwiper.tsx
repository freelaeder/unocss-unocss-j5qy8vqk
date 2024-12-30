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
      content: '大笑小恶魔以他的笑声闻名。他那充满魔力的笑声，能让任何人都陷入欢笑之中。无论是敌人还是朋友，只要听到他的笑声，都无法保持严肃。这种奇特的能力使得大笑小恶魔在恶魔世界中有着独特的地位。很少有人知道，大笑小恶魔最初并不是一个如此快乐的存在。他曾经是一个黑暗的恶魔，名叫“黑笑”。黑笑的笑声虽然恐怖，但却有一种神秘的魔力，能让人感到寒意与惊恐。他的笑声犹如雷鸣，带着死亡的气息，令整个恶魔世界为之震颤。然而，这种黑暗的力量在他心中渐渐滋生了孤独和痛苦。黑笑决定离开恶魔世界，前往一片人类世界，以寻找自己心中的和平。某一天，他偶然遇到一个人类女孩，女孩对他微笑并说：“你为什么不笑呢？你看起来那么不开心。”那一刻，黑笑感受到了久违的温暖和人类的善良。从那时起，他决定改变自己的笑声，不再让它带来恐惧，而是让它传递欢乐。从黑笑到大笑小恶魔，他的笑声变得如同阳光，充满了温暖和活力。如今，无论是恶魔界还是人类世界，大笑小恶魔的笑声都能让人们放松心情，忘却烦恼，重新找回内心的快乐。'
    },
    {
      name: '呆萌小恶魔',
      color: 'rgb(255, 155, 0)',
      content: '呆萌小恶魔是恶魔界最可爱的角色之一。尽管她有着恶魔的外形，但她却有一颗纯真无邪的心。她总是傻乎乎地笑着，给周围的人带来温暖和欢乐。她的天真和善良，使她成为了恶魔界的最爱。呆萌小恶魔名叫“萌萌”，她的外貌并不符合传统的恶魔形象，她有一对大大的眼睛，和一张总是露出呆萌微笑的小嘴。她的笑容是如此纯粹，以至于每个人都无法抵抗她的魅力。萌萌从小生活在恶魔界的边缘地带，这里环境恶劣，充满了各种危险和冷漠。然而，萌萌从来没有因为周围的黑暗而改变自己的心性。她每天都会在森林中玩耍，和其他恶魔们分享她的欢笑。有一次，她在森林中遇到了一只迷路的小狐狸。小狐狸因为失去家人而感到非常伤心。萌萌看着小狐狸伤心的样子，决定带着它回到恶魔村。一路上，萌萌不断地为小狐狸讲笑话，试图让它开心。即使小狐狸不太懂她的笑话，但看到萌萌那无邪的笑容，它也忍不住微笑起来。最终，萌萌带着小狐狸找到了它的家，而她的笑容和善良也让其他恶魔们看到了不同的恶魔形象。渐渐地，萌萌成为了恶魔界的明星，每个人都爱她。她用她的笑容改变了这个冷酷的世界，证明了即使是恶魔，也能拥有一颗善良的心。'
    },
    {
      name: '可爱小恶麾',
      color: 'rgb(0, 128, 0)',
      content: '可爱小恶麾是恶魔世界里最具魅力的存在之一。她那迷人的微笑和天使般的眼神，总能让所有人感到温馨。尽管她是恶魔，但她总是带着友善的态度与人相处，她的故事常常成为恶魔世界里最动人的传说。小恶麾名叫“莉莉”，她的恶魔血统让她拥有了极强的魔力，但她从不利用这些力量伤害他人。相反，她更喜欢通过自己的美丽和智慧帮助别人。莉莉的故事开始于她年轻时。她是恶魔王国中最被宠爱的小恶魔之一，凭借她天生的魅力，她常常受到王国内其他恶魔的青睐。但莉莉从不以此为傲，她觉得自己有责任用自己的力量为这个世界带来更多的光明。她的最初使命是去寻找传说中的“光明之花”，这是一种可以将黑暗驱散的神秘植物。据说，谁能找到光明之花，谁就能改变世界。莉莉毅然决定踏上寻找光明之花的旅程。她穿越了恶魔世界的无数险恶之地，在艰难的冒险中，她结识了许多有趣的伙伴，包括一只会说话的狼和一个曾经是邪恶巫师的老者。在这段旅程中，莉莉不仅用她的智慧和勇气帮助伙伴们解决了一个又一个难题，还通过她的温柔和善良感化了许多曾经敌对的恶魔。在莉莉的努力下，光明之花最终被她找到，而她的故事也成为了恶魔世界里最美丽的传说之一。'
    },
    {
      name: '恐怖小恶魔',
      color: 'rgb(0, 0, 255)',
      content: '恐怖小恶魔是恶魔界最为神秘和恐怖的角色之一。身披黑袍，眼中透出冰冷的光芒，他的出现总能让人感到不寒而栗。恐怖小恶魔的故事总是充满了恐惧与悬疑，令无数人胆寒。恐怖小恶魔名叫“黑夜”，他是恶魔界中的一位强大存在。黑夜从小生活在恶魔界最黑暗的角落，他的力量源于黑暗，而他的形象也总是与恐惧紧密相连。许多人说，他的眼神能够洞穿一切，看透人心的恐惧。而黑夜的笑容，虽然稀少，但每一次都让人无法忘怀。黑夜曾经是恶魔界最为尊敬的战士，他的剑术无人能敌，且战无不胜。无论敌人有多强大，他总是能够凭借着自己的黑暗力量战胜对方。然而，随着时间的推移，黑夜渐渐发现，自己的力量让他变得更加孤独。没有人敢接近他，所有的恶魔都畏惧他。在一次深夜，他遇到了一位年轻的恶魔猎人，这个猎人不但没有害怕他，反而向他发出了挑战。黑夜被这个年轻人的勇气和决心所震撼。经过一场激烈的对决，黑夜被击败了，但他并没有感到愤怒或痛苦，反而有了一种从未有过的解脱感。黑夜意识到，真正的力量不仅仅来自黑暗，更多的是来自内心的勇气和坦然。经过这次转变，黑夜变得不再那么恐怖，他开始帮助其他恶魔解决问题，逐渐成为了一个有着正义之心的英雄。'
    },
    {
      name: '吸血小恶麾',
      color: 'rgb(75, 0, 130)',
      content: '吸血小恶麾是一位古老的恶魔，他的生命源泉来自吸取他人的血液。虽然他是恶魔中的吸血鬼，但他却拥有一颗矛盾的心。他既渴望力量，又惧怕孤独，在无尽的黑夜中徘徊。吸血小恶麾名叫“德拉库拉”，他是吸血鬼家族的继承人，拥有强大的黑暗力量。德拉库拉的故事充满了悲剧色彩。作为吸血鬼家族的一员，他天生拥有吸血的能力，这让他注定要与人类世界为敌。然而，德拉库拉从未真正愿意伤害无辜的人类。每当夜幕降临，他总是徘徊在村庄附近，内心充满了对自己命运的悔恼。有一次，德拉库拉遇到了一位名叫“丽莎”的女孩。丽莎是一个温柔的女子，她并没有像其他人一样对德拉库拉心生恐惧，反而对他产生了同情。丽莎告诉德拉库拉，她相信他并不想伤害别人，而是被自己的命运所束缚。她的善良让德拉库拉深感震撼，也让他开始重新审视自己的人生。为了改变自己的命运，德拉库拉决定去寻找一个能够解除吸血诅咒的魔法。然而，在这个过程中，他面临了无数的危险和挑战，甚至在一次对抗恶魔猎人的战斗中差点丧命。在经历了这一切之后，德拉库拉终于找到了能够解开诅咒的魔法，他终于获得了自由，也找到了内心的平静。'
    },
    {
      name: '小恶魔艾玛',
      color: 'rgb(238, 130, 238)',
      content: '小恶魔艾玛是一个充满魔力的年轻恶魔，她有着一对翅膀，可以自由飞翔在天空中。艾玛善良又勇敢，她不喜欢与别人为敌，总是尽力帮助需要帮助的人。她的故事充满了挑战和成长，逐渐成为了恶魔界的代表人物之一。艾玛原本生活在恶魔界的一个小村庄里，那里的人们虽然都是恶魔，却充满了友善与爱。艾玛天生拥有一对洁白的翅膀，这使她在同龄的恶魔中显得与众不同。她的翅膀并不代表着邪恶，反而给她带来了更多的自由与希望。艾玛的故事开始于一次不幸的事件。有一天，恶魔界的天空突然乌云密布，恶魔王国遭遇了邪恶力量的袭击。黑暗的力量迅速侵袭了整个村庄，艾玛的家人也在这场灾难中失踪了。为了找回家人，艾玛决定展开一场冒险。她飞翔在天空中，穿越了无数的黑暗森林和险恶的山脉。在这段冒险中，艾玛不仅结识了许多勇敢的伙伴，还学会了如何控制自己的魔法力量。她渐渐发现，自己不仅仅是一个拥有翅膀的恶魔，还是一个能够带领大家战胜邪恶的英雄。在一次决定命运的战斗中，艾玛成功击败了邪恶力量，救回了她的家人。她的故事在恶魔界传开，成为了所有恶魔心中的英雄榜样。'
    },
    {
      name: '小恶磨蝙蝠',
      color: 'rgb(128, 0, 0)',
      content: '小恶磨蝙蝠是一只神秘的恶魔蝙蝠，拥有夜视能力和迅猛的飞行速度。他在黑暗中飞行，成为了许多恶魔传说中的一部分。他的故事充满了恐怖和孤独，只有最强大的恶魔才能与他并肩作战。小恶磨蝙蝠名叫“诺克”，他生于恶魔界的最黑暗角落。诺克的出现总是伴随着黑暗的降临，他的身影如同一道幽灵般，飞翔在夜空中，快速穿越每一个阴影。诺克的能力不仅仅来自于他的飞行速度，更来自于他那异常敏锐的感知力。他的夜视能力让他能够在黑暗中看到任何生物，无论是敌人还是猎物。在许多传说中，诺克被描绘为一位神秘的存在，有时候他是恶魔的盟友，帮助他们追踪敌人；而有时候，他又是恶魔的敌人，带领着恶魔猎人追击邪恶力量。尽管诺克的形象常常让人感到恐惧，但没有人知道，他的内心其实充满了孤独。因为他太过强大，以至于没有任何恶魔能够与他并肩作战。诺克的故事在恶魔界流传已久，成为了许多恶魔传说中的一个谜。'
    },
    {
      name: '小恶魔查理',
      color: 'rgb(255, 192, 203)',
      content: '小恶魔查理是恶魔世界里最爱笑的角色之一。他总是带着笑容，不论发生什么，他都能从中找到幽默的一面。查理用他的笑声和幽默让恶魔世界充满了欢乐，他的故事传遍了每个角落。查理名叫“查理奥”，他是一位出生于恶魔界的小恶魔。与其他恶魔不同的是，查理总是能用幽默化解困境，而不是依靠暴力或魔法。在恶魔界，暴力和权谋几乎是每个恶魔争斗的方式，但查理却认为，“笑容才是最强的武器”。他总是用自己的笑容感染别人，用幽默打破僵局。查理的故事始于他和一位恶魔猎人的对决。那位猎人是恶魔界最为恐怖的战士，他曾经击败过无数恶魔。其他恶魔都认为，查理必定无法战胜这位强敌。然而，查理并没有选择战斗，而是带着笑容向那位猎人发起了挑战。他用无比幽默的言辞和搞笑的行为，让猎人笑得喘不过气，甚至忘记了自己原本的目标。最终，猎人也被查理的笑容征服，放弃了追捕他。查理的故事在恶魔界广为流传，成为了所有恶魔心中的幽默英雄。'
    },
    {
      name: '小恶麾哈利',
      color: 'rgb(255, 69, 0)',
      content: '小恶麾哈利是一位狡猾而聪明的恶魔，他的头脑比力量更为强大。哈利生长在恶魔界最动荡的时期，那时，许多强大的恶魔因争夺力量而爆发了战争。而哈利的独特之处在于，他并不依赖暴力来解决问题。相反，他凭借卓越的智慧，巧妙地在纷乱的局势中找到生存之道。一次，哈利偶然发现了一个能改变恶魔世界格局的秘密。为了获得这个秘密，他需要穿越一片充满机关陷阱的森林，而这一片森林正是恶魔界的禁忌之地。许多恶魔都知道，进入那片森林的结局只有死亡。然而，哈利不同，他凭借无与伦比的智谋和洞察力，化解了森林中的所有危险，成功找到了隐藏的宝藏。当他带着宝藏回到恶魔界时，所有人都为之震惊，认为哈利不仅聪明，而且拥有极大的勇气和毅力。从那以后，哈利的名字传遍了整个恶魔界，成为了智慧与胆略的象征。无论是在与敌人的对抗中，还是在解开复杂难题时，哈利总能利用他的智慧巧妙地化解所有困境，成为恶魔界传奇人物。'
    },
    {
      name: '小恶魔坏笑',
      color: 'rgb(34, 139, 34)',
      content: '小恶魔坏笑是恶魔世界中的反派角色之一，他的名字早已成为恐惧的代名词。坏笑的出生地并不特殊，但他的人生却注定不平凡。坏笑小时候生活在恶魔界的一个贫困村落里，村落周围时常发生暴力冲突和血腥的争斗，而坏笑的父母是村中最贫弱的一对。尽管如此，坏笑从小便展示出了惊人的聪明才智。与其他恶魔不同，坏笑从不依赖蛮力，而是以阴谋和欺骗为生。他总能在别人不经意间制造混乱，巧妙地引导事态的发展，让对方自乱阵脚。坏笑在少年时期就积累了足够的恶名，成为恶魔界的一名极具威胁的阴谋家。最令所有人恐惧的是，他那邪恶的笑声，它能引发一系列不幸事件。每当坏笑出现时，他的笑声就像是预示着灾难的降临，所有听到他笑声的人都会不由自主地陷入恐惧的情绪。曾有一位强大的魔法师挑战过坏笑，想要揭露他一切的罪行，但在对决中，坏笑利用魔法师的疑虑和不安，让他自己破坏了自己所有的法术。最终，魔法师在坏笑的诡计中死于非命，坏笑因此名声大噪。坏笑的故事，充满了背叛、阴谋、以及无尽的恐惧，成为了恶魔界的黑暗传说。'
    },
    {
      name: '小恶魔杰克',
      color: 'rgb(0, 191, 255)',
      content: '小恶魔杰克是恶魔界中的一位勇士，他以无畏和坚毅著称。杰克来自恶魔界的一片荒野，那里的恶魔个个暴戾无常，只有最强大的恶魔才能生存下来。从小，杰克就展现出了与众不同的勇气和毅力。他的父亲是一位著名的恶魔战士，他常常带着杰克参加恶魔界的战斗和冒险，教导他如何使用武器和战斗技巧。然而，杰克的父亲早逝，留下了杰克孤单一人。虽然杰克失去了父亲，但他并没有因此而软弱，相反，这段经历让他更加坚定了自己要保护家园的决心。一次，恶魔界的一个强敌侵入了杰克的家乡，企图摧毁一切。杰克毅然决然地拿起武器，迎战来犯的敌人。尽管敌人强大，杰克的勇气和坚韧不拔的精神让他在战斗中占据了上风。经过激烈的战斗，杰克最终击败了敌人，保护了家园，成为了恶魔界的英雄。杰克的故事传遍了整个恶魔界，成千上万的恶魔都为他树立了丰碑。他那无畏的精神和坚定的信念，使他成为了恶魔界最受尊敬的战士之一，传说他的名字永远不会消失。'
    },
    {
      name: '小恶魔卡尔',
      color: 'rgb(123, 104, 238)',
      content: '小恶魔卡尔是一位神秘的角色，他的外形和性格都充满了不确定性。卡尔出生于恶魔界最偏远的地方，一个没人知晓的小村庄。这个村庄的恶魔，个个都与世隔绝，过着平凡的生活。然而，卡尔与其他恶魔不同，他拥有一种特殊的能力，那就是预知未来。他能够通过一系列符号和图像，准确地预测未来的事件。这种能力让卡尔在恶魔界中成为了一个非常神秘且有争议的人物。卡尔一直试图隐藏自己的能力，不愿让他人知道。然而，命运的安排让卡尔卷入了一个巨大的阴谋之中。恶魔界的一位强大法师意外得知了卡尔的预知能力，并企图利用他来实现自己的私欲。为了逃避法师的追杀，卡尔不得不踏上了一段危险的旅程。在这段旅程中，卡尔遇到了许多充满危险的敌人，但他凭借自己的智慧和预测能力，成功化解了一个又一个的危机。在经历了无数挑战之后，卡尔逐渐揭开了法师背后的阴谋，最终破坏了法师的计划，保护了恶魔界的未来。卡尔的故事成为了恶魔界的传奇，他的神秘和勇气，使得他成为了许多恶魔追寻的目标，成为恶魔界最具冒险精神和神秘气质的英雄之一。'
    },
    {
      name: '小恶魔莱恩',
      color: 'rgb(255, 20, 147)',
      content: '小恶魔莱恩是一个充满能量和活力的恶魔，他的笑容能够照亮整个黑暗世界。莱恩出生在恶魔界的一个平凡家庭，他的父母并不强大，也没有什么显赫的背景。然而，莱恩天生拥有巨大的能量，他能将任何负面情绪转化为动力。他的笑容，总是让他周围的人感到温暖和愉悦。莱恩不喜欢沉浸在黑暗的世界中，他总是寻找挑战自己和他人的机会。一次，莱恩偶然得知恶魔界的一个强大敌人正在策划一场灾难，威胁到整个世界的和平。于是，莱恩决定加入这场战斗，保护他的家园。在战斗中，莱恩不断突破自我，用无穷的能量和活力影响着战局。尽管他看起来像是一个不拘小节的恶魔，但他的决心和坚韧让敌人感到畏惧。莱恩最终成功击败了敌人，成为恶魔界的英雄之一。他的故事被传颂，成为了勇气和希望的象征。莱恩教会我们，无论外界如何变化，只要保持一颗积极的心态，就能在困境中找到光明。'
    },
    {
      name: '小恶麾丽莎',
      color: 'rgb(255, 105, 180)',
      content: '小恶麾丽莎是一位充满魔力的女性角色，她的美丽和智慧使她在恶魔世界中备受敬仰。丽莎出生在恶魔界的一个古老而神秘的家族，她的父母是恶魔界最强大的法师之一。丽莎从小便继承了父母的强大法力，并且展现出惊人的天赋。她不仅能够掌握极其复杂的法术，还能够轻松运用她的魅力征服周围的一切。丽莎的外表美丽迷人，身上散发着一种神秘的气质，她的每一个微笑都充满了诱惑，使得恶魔界中无数恶魔为她着迷。然而，丽莎并不以自己的外貌为傲，她知道，真正的力量来自内心的智慧与勇气。在一次对抗恶魔界叛乱的战斗中，丽莎的魔法和智慧展现得淋漓尽致。她不仅成功化解了敌人的阴谋，还巧妙地利用敌人的分歧，使得敌人自相残杀。丽莎的故事在恶魔界广为流传，她的聪明与美丽让她成为了恶魔界女性的象征，许多恶魔都为她的智慧和领导力所折服。她不仅是一位强大的法师，还是一位优秀的政治家，凭借自己的智慧和魅力，她领导着一支强大的恶魔军队，为恶魔界带来了无数胜利。'
    },
    {
      name: '小恶麾吓人',
      color: 'rgb(139, 0, 0)',
      content: '小恶麾吓人是一个专门制造恐惧和惊悚气氛的恶魔，他总是喜欢在别人最放松的时候出现，给人带来强烈的心理冲击。他的外形丑陋而怪异，双眼总是充满了深不可测的黑暗，四肢长满锋利的尖刺，而他最为人所知的特征便是那永不消失的阴森笑容。吓人的故事起源于恶魔界的一个遥远而被遗弃的废墟，那里曾是一个辉煌的王国，但因一场背叛与战争而毁灭。吓人原本是王国中的一名普通恶魔，但他天生对恐惧有着强烈的感知能力。随着岁月的推移，他逐渐掌握了制造恐怖气氛的技巧，能通过操控环境、心态与幻觉，让敌人陷入无尽的恐惧之中。吓人的力量并不体现在力量的对抗上，而是通过制造心理上的恐惧，击垮敌人的意志力。每当敌人毫无防备时，吓人就会悄无声息地出现在他们的梦中或暗处，带来无法言喻的压迫感。一次，恶魔界的英雄们集结一起准备对抗强敌，而吓人趁机潜入他们的营地，利用他们的内心恐惧制造幻觉，让整个队伍陷入混乱。最终，敌人并未被打败，而是自己因为恐惧而自乱阵脚。吓人的恐怖传说至今仍在恶魔界流传，他被誉为恐惧的化身，任何面对他的人都无法逃脱内心深处的绝望。'
    },
    {
      name: '小恶魔象鼻',
      color: 'rgb(0, 100, 0)',
      content: '小恶魔象鼻是恶魔界的一个守护者，他的象鼻能感知到一切危险。象鼻的出生地是恶魔界中最险恶的森林之一，那片森林中布满了巨大的猛兽和致命的陷阱。象鼻的父母是这片森林的守护者之一，传说象鼻的父亲曾经用他那强大的象鼻拯救过无数的恶魔。象鼻从小便继承了父亲的能力，象鼻的鼻子比任何普通的象鼻都要强大，能感知到周围数百米以内的危险。而象鼻的智慧也让他成为了恶魔界的传奇英雄。曾有一次，恶魔界的皇帝被敌人囚禁在一座密不透风的堡垒中，而敌人为了确保皇帝无法逃脱，设下了严密的陷阱和监视。象鼻凭借自己敏锐的感知力，带领一队勇士悄悄潜入敌人腹地。他们利用象鼻的力量避开了所有陷阱，在敌人毫无察觉的情况下，成功将皇帝救出。象鼻的故事传遍了整个恶魔界，他被誉为无畏的守护者和智慧的象征，许多恶魔都将他视为自己的偶像。象鼻的力量不仅在于他的象鼻，还在于他拥有洞察力和勇气，这使得他成为了恶魔界中最受尊敬的存在之一。'
    },
    {
      name: '小恶魔小牛',
      color: 'rgb(54, 94, 77)',
      content: '小恶魔小牛是一个力大无穷的恶魔，他在恶魔界中以无畏和坚强著称。小牛的出生地并不显赫，但他从小便展现出惊人的力量。在恶魔界，有一条不成文的规定，所有恶魔都必须通过一个残酷的力量试炼，才能获得恶魔界的认可。许多恶魔都以暴力和强大的武力为荣，但小牛与众不同。他不仅拥有巨大的体力和力量，还是一位心地善良的恶魔。传说在小牛的家乡，有一只巨大的怪兽频频出没，破坏了村民的家园，许多恶魔都被其吓退。小牛不畏强敌，挺身而出，凭借自己强大的力量与怪兽展开了惊天对决。最终，小牛用自己巨大的力量击败了怪兽，保护了村民们的家园。此举让他一夜之间声名大噪，成为了恶魔界的英雄之一。小牛的力量和勇气无可匹敌，他告诉所有人，面对挑战时，只有无畏地迎上去，才能战胜一切障碍。他的故事激励了无数恶魔，让他们明白了面对困境时，坚定的意志和强大的内心比任何外在的力量更为重要。'
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
    await new Promise(resolve => setTimeout(resolve, 1000));
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
