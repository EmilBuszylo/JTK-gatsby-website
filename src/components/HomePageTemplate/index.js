import React from "react";
import Helmet from "react-helmet";
import Offerings from "../Offerings";
import PropTypes from "prop-types";
import Hero from "../Hero";
import CategoriesBars from "../CategoryBars";
import ProductCard from "../ProductCard";
import { WelcomeSection } from "../WelcomeSection";
import { ImageBoxSection } from "../ImageBoxSection";

const HomePageTemplate = ({
  title,
  offerings,
  meta_title,
  meta_description,
  slider_captions,
  hotProducts,
  categories,
  bigImage,
  contentComponent,
  welcomeSections,
  imageBoxSections,
}) => (
  <div>
    <Helmet>
      <title>{meta_title}</title>
      <meta name="description" content={meta_description} />
    </Helmet>
    <Hero
      title={title}
      large
      bigImage={bigImage}
      carousel={{
        isSlider: true,
        elements: slider_captions,
      }}
    />
    {welcomeSections &&
      welcomeSections.sections.length > 0 &&
      welcomeSections.sections.map(section => (
        <WelcomeSection section={section} key={section.title} />
      ))}
    <section
      className="container"
      style={{ marginBottom: "-3rem", padding: "3rem 1.5rem 0rem" }}
    >
      <h3 className="title is-2 has-text-centered">Polecane produkty</h3>
    </section>
    <section className="section">
      <div
        className="container hot-products-container"
        style={{ padding: "3rem 0" }}
      >
        <ProductCard products={hotProducts} isHot />
      </div>
    </section>
    <section className="section" style={{ backgroundColor: "#dbe0e4" }}>
      <Offerings
        gridItems={offerings.blurbs}
        contentComponent={contentComponent}
      />
    </section>
    {imageBoxSections &&
      imageBoxSections.sections.length > 0 &&
      imageBoxSections.sections.map((section, index) => (
        <ImageBoxSection
          section={section}
          key={`imageBoxSection-${index}`}
          revers={index % 2 !== 0}
        />
      ))}
    <CategoriesBars categories={categories} />
  </div>
);

HomePageTemplate.propTypes = {
  title: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  offerings: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  welcomeSections: PropTypes.shape({
    sections: PropTypes.array,
  }),
  categories: PropTypes.array,
  hotProducts: PropTypes.array,
  bigImage: PropTypes.object,
};

export default HomePageTemplate;
