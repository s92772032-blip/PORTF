
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'video' | 'ai';
  thumbnail: string;
  videoUrl?: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  date: string;
}
