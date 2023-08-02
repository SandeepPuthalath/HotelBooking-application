import React from 'react';
import ContentLoader from 'react-content-loader';

const HotelDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        <ContentLoader width={200} height={24}>
          <rect x="0" y="0" rx="4" ry="4" width="200" height="24" />
        </ContentLoader>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <ContentLoader width={400} height={200}>
              <rect x="0" y="0" rx="4" ry="4" width="400" height="200" />
            </ContentLoader>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <ContentLoader width={200} height={150}>
                  <rect x="0" y="0" rx="4" ry="4" width="200" height="150" />
                </ContentLoader>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-500 mb-4">
            <ContentLoader width={400} height={20}>
              <rect x="0" y="0" rx="4" ry="4" width="400" height="20" />
            </ContentLoader>
          </p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2">
              <ContentLoader width={80} height={16}>
                <rect x="0" y="0" rx="4" ry="4" width="80" height="16" />
              </ContentLoader>
            </span>
            <span className="text-gray-500">
              <ContentLoader width={120} height={16}>
                <rect x="0" y="0" rx="4" ry="4" width="120" height="16" />
              </ContentLoader>
            </span>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">Rooms:</p>
            <ContentLoader width={200} height={80}>
              <rect x="0" y="0" rx="4" ry="4" width="200" height="80" />
            </ContentLoader>
          </div>
          <p className="text-gray-500 mb-2">
            <ContentLoader width={120} height={16}>
              <rect x="0" y="0" rx="4" ry="4" width="120" height="16" />
            </ContentLoader>
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <ContentLoader width={100} height={32}>
              <rect x="0" y="0" rx="4" ry="4" width="100" height="32" />
            </ContentLoader>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsSkeleton;
