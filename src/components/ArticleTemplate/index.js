import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";

import Content from "../Content";
import SE0 from "../SEO";
import { Link } from "gatsby";
import Share from "../Share";
import Disqus from "../Disqus";

const Divider = styled.hr`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ArticleTemplate = ({
  content,
  contentComponent,
  cover,
  meta_title,
  meta_desc,
  tags,
  title,
  slug
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      <SE0
        title={title}
        meta_title={meta_title}
        meta_desc={meta_desc}
        cover={cover}
        slug={slug}
      />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <img src={cover} alt={title} />
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Divider />
            <Share title={title} slug={slug} excerpt={meta_desc} />
            <Divider />
            <Disqus title={title} slug={slug} />
          </div>
        </div>
      </div>
    </section>
  );
};

ArticleTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  cover: PropTypes.string,
  meta_title: PropTypes.string,
  meta_desc: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string
};

export default ArticleTemplate;
