import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
const HomePage = () => {
  console.log(tmdbConfigs.mediaCategory.popular);
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </>
  );
};

export default HomePage;
