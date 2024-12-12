import { Fragment } from "react";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const Home = () => {
  return (
    <Fragment>
      {/* hero slider */}
      <HeroSliderOne />

      {/* featured icon */}
      <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

      {/* tab product */}
      <TabProduct spaceBottomClass="pb-60" category="fashion" />

      {/* blog featured */}
      <BlogFeatured spaceBottomClass="pb-55" />
    </Fragment>
  );
};

export default Home;
