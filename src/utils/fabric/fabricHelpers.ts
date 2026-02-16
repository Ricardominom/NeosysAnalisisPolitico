import { Canvas, Rect, Text, Circle, Group } from 'fabric';

// Dimensiones estándar de slide (16:9)
export const SLIDE_WIDTH = 1280;
export const SLIDE_HEIGHT = 720;

/**
 * Crea un fondo para el slide
 */
export const createBackground = (color: string = '#f5f5f5'): Rect => {
  return new Rect({
    left: 0,
    top: 0,
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    fill: color,
    selectable: false,
    evented: false,
  });
};

/**
 * Crea un texto con formato
 */
export const createText = (
  text: string,
  options: {
    left?: number;
    top?: number;
    fontSize?: number;
    fontWeight?: string | number;
    fill?: string;
    fontFamily?: string;
    textAlign?: string;
  } = {}
): Text => {
  return new Text(text, {
    left: options.left || 0,
    top: options.top || 0,
    fontSize: options.fontSize || 24,
    fontWeight: options.fontWeight || 'normal',
    fill: options.fill || '#000000',
    fontFamily: options.fontFamily || 'Arial, sans-serif',
    textAlign: options.textAlign || 'left',
    selectable: false,
    evented: false,
  });
};

/**
 * Crea una caja/rectángulo con borde redondeado
 */
export const createBox = (
  options: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    rx?: number;
    ry?: number;
  } = {}
): Rect => {
  return new Rect({
    left: options.left || 0,
    top: options.top || 0,
    width: options.width || 100,
    height: options.height || 100,
    fill: options.fill || '#ffffff',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 0,
    rx: options.rx || 0,
    ry: options.ry || 0,
    selectable: false,
    evented: false,
  });
};

/**
 * Crea una rueda de colores (simplificada)
 */
export const createColorWheel = (
  centerX: number,
  centerY: number,
  radius: number
): Group => {
  const colors = [
    '#FF6B6B', // Rojo
    '#FF8E53', // Naranja
    '#FFA94D', // Amarillo-Naranja
    '#FFD93D', // Amarillo
    '#95E1D3', // Verde claro
    '#4CAF50', // Verde
    '#2196F3', // Azul
    '#3F51B5', // Azul oscuro
    '#9C27B0', // Púrpura
    '#E91E63', // Rosa
  ];

  const segments: any[] = [];
  const angleStep = (2 * Math.PI) / colors.length;

  colors.forEach((color, index) => {
    const startAngle = index * angleStep;
    const endAngle = (index + 1) * angleStep;

    // Crear segmento circular
    const segment = new Circle({
      radius: radius,
      left: centerX - radius,
      top: centerY - radius,
      fill: color,
      startAngle: startAngle,
      endAngle: endAngle,
      selectable: false,
      evented: false,
    });

    segments.push(segment);
  });

  // Círculo blanco central
  const innerCircle = new Circle({
    radius: radius * 0.6,
    left: centerX - radius * 0.6,
    top: centerY - radius * 0.6,
    fill: '#ffffff',
    selectable: false,
    evented: false,
  });

  segments.push(innerCircle);

  return new Group(segments, {
    left: centerX - radius,
    top: centerY - radius,
    selectable: false,
    evented: false,
  });
};

/**
 * Crea un icono de check (✓)
 */
export const createCheckIcon = (
  left: number,
  top: number,
  size: number = 30,
  color: string = '#ffffff'
): Text => {
  return new Text('✓', {
    left,
    top,
    fontSize: size,
    fill: color,
    fontFamily: 'Arial',
    selectable: false,
    evented: false,
  });
};

/**
 * Crea un icono de X (✗)
 */
export const createXIcon = (
  left: number,
  top: number,
  size: number = 30,
  color: string = '#ffffff'
): Text => {
  return new Text('✗', {
    left,
    top,
    fontSize: size,
    fill: color,
    fontFamily: 'Arial',
    selectable: false,
    evented: false,
  });
};

/**
 * Crea un bullet point
 */
export const createBulletPoint = (
  text: string,
  left: number,
  top: number,
  options: {
    fontSize?: number;
    fill?: string;
    maxWidth?: number;
  } = {}
): Group => {
  const bullet = new Text('▸', {
    left: 0,
    top: 0,
    fontSize: options.fontSize || 18,
    fill: options.fill || '#000000',
    selectable: false,
    evented: false,
  });

  const textObj = new Text(text, {
    left: 30,
    top: 0,
    fontSize: options.fontSize || 18,
    fill: options.fill || '#000000',
    selectable: false,
    evented: false,
  });

  if (options.maxWidth) {
    textObj.set({ width: options.maxWidth });
  }

  return new Group([bullet, textObj], {
    left,
    top,
    selectable: false,
    evented: false,
  });
};

/**
 * Crea un header con título y subtítulo
 */
export const createHeader = (
  title: string,
  subtitle: string,
  options: {
    left?: number;
    top?: number;
    titleSize?: number;
    subtitleSize?: number;
    titleColor?: string;
    subtitleColor?: string;
  } = {}
): Group => {
  const titleText = createText(title, {
    left: 0,
    top: 0,
    fontSize: options.titleSize || 40,
    fontWeight: 'bold',
    fill: options.titleColor || '#000000',
  });

  const subtitleText = createText(subtitle, {
    left: 0,
    top: 60,
    fontSize: options.subtitleSize || 24,
    fill: options.subtitleColor || '#666666',
  });

  return new Group([titleText, subtitleText], {
    left: options.left || 80,
    top: options.top || 60,
    selectable: false,
    evented: false,
  });
};
