import React, { useState, useEffect } from 'react';
import Image from './Image';
import '../css/App.css';

const importAll = (r) => {
  return r.keys().map(r);
};

const Gallery = () => {
  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  const imagesPerPage = 15;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true whenever the page changes

    // Simulate loading delay (Remove this in production)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay); // Clear timeout on component unmount
  }, [currentPage]); // Re-run effect whenever currentPage changes

  // Calculate start and end indices of images to display based on current page
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = Math.min(startIndex + imagesPerPage, images.length);

  const visibleImages = images.slice(startIndex, endIndex);

  return (
    <div className="gallery">
      {selectedImage && (
        <div className="overlay" onClick={handleClose}>
          <img className="enlarged-image" src={selectedImage} alt="Enlarged" />
        </div>
      )}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="image-grid">
            {visibleImages.map((image, index) => (
              <Image key={index} src={image} onClick={handleImageClick} />
            ))}
          </div>
          <div className="pagination">
            <span className="pagination-label">Pages:</span>
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
