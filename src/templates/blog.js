import React, { Component } from "react";

import config from "../../data/config";
import Helmet from "react-helmet";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import PaginationLink from "../components/PaginationLink";

export default class BlogPage extends Component {
  render() {
    const { pageContext } = this.props;
    const { group, index, first, last } = pageContext;
    const previousUrl = index - 1 === 1 ? "" : (index - 1).toString();
    const nextUrl = (index + 1).toString() + "/";

    const websiteSchemaOrgJSONLD = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
    };

    return (
      <div>
        <Helmet>
          <title>Blog</title>
          {/* Schema.org tags */}
          <script type="application/ld+json">
            {JSON.stringify(websiteSchemaOrgJSONLD)}
          </script>
        </Helmet>
        <Hero title="Blog" />
        <section className="section">
          <PostCard posts={group} />
          <section className="section">
            <div className="buttons is-centered">
              <PaginationLink
                test={first}
                url={previousUrl}
                text="Poprzednia srtona"
                baseUrl="blog"
              />
              <PaginationLink
                test={last}
                url={nextUrl}
                text="Następna strona"
                baseUrl="blog"
              />
            </div>
          </section>
        </section>
      </div>
    );
  }
}
