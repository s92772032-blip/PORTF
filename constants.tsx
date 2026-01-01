
import { PortfolioItem, Service, Testimonial } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Вечер в горах',
    category: 'video',
    thumbnail: 'https://picsum.photos/id/10/800/450',
    description: 'Эстетическое свадебное видео в горах Кавказа.'
  },
  {
    id: '2',
    title: 'Магия Рождества',
    category: 'ai',
    thumbnail: 'https://picsum.photos/id/102/800/450',
    description: 'Персонализированный AI-мультфильм для семьи.'
  },
  {
    id: '3',
    title: 'Городские ритмы',
    category: 'video',
    thumbnail: 'https://picsum.photos/id/103/800/450',
    description: 'Динамичный репортаж с городского мероприятия.'
  },
  {
    id: '4',
    title: 'Маленький рыцарь',
    category: 'ai',
    thumbnail: 'https://picsum.photos/id/104/800/450',
    description: 'Сказка о храбрости, созданная с помощью нейросетей.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Свадебная видеосъёмка',
    description: 'Создание полноценного фильма о самом важном дне. Эмоции, слезы радости и искренние моменты.'
  },
  {
    id: 's2',
    title: 'AI-анимация на заказ',
    description: 'Оживляю ваши идеи или семейные фото в виде качественных 3D или 2D мультфильмов.'
  },
  {
    id: 's3',
    title: 'Семейные истории',
    description: 'Тёплые домашние видео или прогулочные сеты, которые сохранят вашу любовь на долгие годы.'
  },
  {
    id: 's4',
    title: 'Коммерческие проекты',
    description: 'Съемка мероприятий, промо-роликов и имиджевых видео для бизнеса.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Анна и Максим',
    text: 'Эрдни сделал невозможное — он поймал каждое мгновение нашей свадьбы так, будто это кино. Пересматриваем каждую неделю!',
    date: 'Октябрь 2023'
  },
  {
    id: 't2',
    name: 'Елена С.',
    text: 'Заказывала AI-мультфильм в подарок сыну. Это было волшебно! Он увидел себя настоящим героем сказки. Спасибо!',
    date: 'Декабрь 2023'
  }
];
