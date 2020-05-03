import React, { Component } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import config from "../../data/config";
import Helmet from "react-helmet";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import PaginationLink from "../components/PaginationLink";
import CategoryFilters from "../components/CategoryFilters";
import { HTMLContent } from "../components/Content";
import Content from "../components/Content";

import {
  LinkButton,
  GatsbyLinkButton,
  Divider,
} from "../components/WelcomeSection/styled";

const SidebarColumn = styled.div`
  @media (max-width: 1024px) {
    display: none !important;
  }
`;

export default class ProductsPage extends Component {
  state = {
    category: "all",
  };

  render() {
    const { frontmatter } = this.props.data.markdownRemark;
    const { pageContext } = this.props;
    const { group, index, first, last, additionalContext } = pageContext;
    const previousUrl = index - 1 === 1 ? "" : (index - 1).toString();
    const nextUrl = (index + 1).toString() + "/";
    const PostContent = HTMLContent || Content;
    const websiteSchemaOrgJSONLD = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
    };

    const lastProducts = additionalContext && additionalContext.lastProducts;
    const hotProducts = additionalContext && additionalContext.hotProducts;

    return (
      <div>
        <Helmet>
          <title>{frontmatter.meta_title}</title>
          <meta name="description" content={frontmatter.meta_description} />
        </Helmet>
        <Hero title="Produkty" />
        {/* welcome section */}
        <section className="section">
          <div className="container has-text-centered">
            <h3 className="title is-2 ">{frontmatter.title}</h3>
            <PostContent
              className="content"
              content={this.props.data.markdownRemark.html}
            />
            {frontmatter.isExternal ? (
              <LinkButton
                className="button is-rounded has-text-centered"
                href={frontmatter.buttonLink}
              >
                {frontmatter.buttonText}
              </LinkButton>
            ) : (
              <GatsbyLinkButton
                className="button is-rounded has-text-centered"
                to={frontmatter.buttonLink.replace("https://jtlsklima.pl/", "")}
              >
                {frontmatter.buttonText}
              </GatsbyLinkButton>
            )}
          </div>
        </section>
        <Divider />
        <section className="section">
          <div className="container">
            <div
              className="columns is-mobile"
              style={{ justifyContent: "space-around" }}
            >
              <div className="column is-full-mobile is-four-fifths">
                <CategoryFilters />
                {Boolean(group && group.length > 0) && (
                  <ProductCard
                    products={group}
                    isHot={false}
                    justify="flex-start"
                  />
                )}
                <section className="section">
                  <div className="buttons is-centered">
                    <PaginationLink
                      test={first}
                      url={previousUrl}
                      text="Poprzednia strona"
                      baseUrl="produkty"
                    />
                    <PaginationLink
                      test={last}
                      url={nextUrl}
                      text="Następna strona"
                      baseUrl="produkty"
                    />
                  </div>
                </section>
              </div>
              <SidebarColumn className="column is-one-fifth">
                <Sidebar
                  lastProducts={lastProducts}
                  hotProducts={hotProducts}
                />
              </SidebarColumn>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query ProductsPage {
    markdownRemark(fields: { slug: { eq: "/products/" } }) {
      html
      frontmatter {
        meta_title
        meta_description
        bigImage {
          childImageSharp {
            fluid(maxWidth: 2200, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        buttonText
        buttonLink
        isExternal
      }
    }
  }
`;
