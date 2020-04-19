import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MdContent } from "../MdContent";

const ContentBlock = styled.div`
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  align-items: center;
`;

const ContentDivider = styled.div`
  width: 90%;
  height: 1px;
  background: #aaa;
  opacity: 0.9;
  margin: 32px auto;
`;

const Offerings = ({ gridItems, contentComponent }) => {
  console.log(gridItems);
  return (
    <div className="container hot-products-container">
      {gridItems.map((item, index) => (
        <div key={item.text + index}>
          <div className="section">
            <ContentBlock
              reverse={index % 2 ? true : false}
              className="columns is-tablet is-centered"
            >
              <div className="column is-three-quarters-desktop">
                <MdContent className="content" md={item.text} />
              </div>
              <div className="column">
                <img alt="" src={item.image} />
              </div>
            </ContentBlock>
          </div>
          {index === 0 && <ContentDivider />}
        </div>
      ))}
    </div>
  );
};

Offerings.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default Offerings;
