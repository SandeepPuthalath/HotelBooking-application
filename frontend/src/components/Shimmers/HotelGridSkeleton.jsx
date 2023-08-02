import ContentLoader from "react-content-loader";

const HotelGridSkeleton = () => {
  const hotels = Array.from({ length: 8 }); // Dummy data for the skeleton

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotels.map((_, index) => (
          <div key={index} className="mb-4">
            <ContentLoader width={300} height={400}>
              <rect x="0" y="0" rx="4" ry="4" width="300" height="200" />
              <rect x="0" y="220" rx="4" ry="4" width="120" height="16" />
              <rect x="0" y="250" rx="4" ry="4" width="200" height="12" />
              <rect x="0" y="270" rx="4" ry="4" width="80" height="12" />
            </ContentLoader>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelGridSkeleton;
