
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export interface Firework {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  particles: Particle[];
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
