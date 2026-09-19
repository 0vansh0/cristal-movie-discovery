import { useState } from "react";
import PropTypes from "prop-types";

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallback = "/placeholder.jpg",
  ...rest
}) {
  const [error, setError] = useState(false);

  return (
    <img
      src={!error && src ? src : fallback}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...rest}
    />
  );
}

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
