import ContentLoader from "react-content-loader";

const ProfilePageSkeleton = () => (
    <div className="max-w-xl mx-auto p-6">
      <section className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <ContentLoader
            speed={2}
            width={250}
            height={250}
            viewBox="0 0 250 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="125" cy="125" r="125" />
          </ContentLoader>
        </div>
        <div className="flex justify-center">
          <ContentLoader
            speed={2}
            width={150}
            height={20}
            viewBox="0 0 150 20"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="150" height="20" />
          </ContentLoader>
        </div>
      </section>
      <section className="mb-8">
        <form>
          <div className="mb-4">
            <ContentLoader
              speed={2}
              width={300}
              height={20}
              viewBox="0 0 300 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="300" height="20" />
            </ContentLoader>
          </div>
          <div className="mb-4">
            <ContentLoader
              speed={2}
              width={300}
              height={20}
              viewBox="0 0 300 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="300" height="20" />
            </ContentLoader>
          </div>
          <div className="mb-4">
            <ContentLoader
              speed={2}
              width={300}
              height={20}
              viewBox="0 0 300 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="300" height="20" />
            </ContentLoader>
          </div>
          <div className="mb-4">
            <ContentLoader
              speed={2}
              width={300}
              height={20}
              viewBox="0 0 300 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="300" height="20" />
            </ContentLoader>
          </div>
          <ContentLoader
            speed={2}
            width={100}
            height={40}
            viewBox="0 0 100 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="100" height="40" />
          </ContentLoader>
        </form>
      </section>
    </div>
  );
  
  export default ProfilePageSkeleton;