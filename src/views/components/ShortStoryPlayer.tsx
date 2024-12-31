import React, { useState, useEffect, useRef } from 'react';
import playingOn from '@/assets/playing-on.svg';
import playingOff from '@/assets/playing-off.svg';

interface AudioPlayerProps {
  index: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ index }) => {
  // 用于存储音频源
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 播放状态
  // 用于表示音频加载状态
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 动态导入 mp3 文件
  useEffect(() => {
    const loadAudio = async () => {
      setIsLoading(true); // 开始加载时，设置为加载中
      try {
        const audioPath = await import(`@/assets/mp3/${index}.mp3`);
        setAudioSrc(audioPath.default); // 设置动态导入的音频路径
      } catch (error) {
        console.error('音频加载失败:', error);
        setAudioSrc(null); // 音频加载失败时，确保音频源为 null
      } finally {
        setIsLoading(false); // 加载结束，设置加载状态为 false
      }
    };

    loadAudio();
    // 重置播放状态为 false index 变化时
    setIsPlaying(false);

    // 如果音频加载成功，自动播放
    if (audioRef.current) {
      audioRef.current.play();
    }

  }, [index]); // 依赖项为 index，确保 index 变化时重新加载

  // 播放或暂停音频
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 如果音频没有加载完成或者加载失败，不渲染播放器
  if (isLoading || !audioSrc) {
    return null; // 不渲染播放器组件
  }

  return (
    <div className="flex items-center justify-center p-2 bg-white bg-opacity-50 rounded-tl" onClick={togglePlay}>
      {/* 音频已经加载才渲染音频元素 */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      {isPlaying ? (
        <img src={playingOff} alt="Pause" />
      ) : (
        <img src={playingOn} alt="Play" />
      )}
    </div>
  );
};

export default AudioPlayer;
