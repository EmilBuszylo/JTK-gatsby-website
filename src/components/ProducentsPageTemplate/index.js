import React, { Component } from "react";
import PropTypes from "prop-types";

import Hero from "../Hero";
import ProducentCard from "../ProducentCard";

export default class ProducentsPageTemplate extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    producents: PropTypes.arrayOf(
      PropTypes.shape({
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    content: PropTypes.string.isRequired,
    bigImage: PropTypes.string,
  };

  render() {
    const { title, producents, content, bigImage } = this.props;

    return (
      <div>
        <Hero title={title} bigImage={bigImage} />
        <div className="section">
          <div className="container">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <section className="section">
          <div className="container">
            {producents.map((producent, index) => (
              <ProducentCard key={producent.name + index} data={producent} />
            ))}
          </div>
        </section>
      </div>
    );
  }
}
