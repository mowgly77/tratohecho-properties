interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Sirve WebP automáticamente si existe (.jpg → .webp), con JPG como fallback.
 * Úsalo como reemplazo de <img> en cualquier imagen de propiedad.
 */
const OptimizedImage = ({ src, alt, ...props }: OptimizedImageProps) => {
  const webpSrc = src.replace(/\.(jpg|jpeg)$/i, ".webp");
  const hasWebp = /\.(jpg|jpeg)$/i.test(src);

  if (!hasWebp) {
    return <img src={src} alt={alt} {...props} />;
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};

export default OptimizedImage;
