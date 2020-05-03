import React from "react";
import {
  SectionWrapper,
  WhiteBox,
  ImageBox,
  ImageBoxWrapper,
  BoxText,
  LinkButton,
  GatsbyLinkButton,
} from "./styled";

export const ImageBoxSection = ({ section, revers }) => {
  return (
    <SectionWrapper revers={revers}>
      <WhiteBox>
        <BoxText md={section.whiteBoardText} color="#000" />
        {section.whiteBoardIsExternal ? (
          <LinkButton
            className="button is-rounded has-text-centered"
            href={section.whiteBoardButtonLink}
            color="#4a4a4a"
            hoverColor="#fff"
          >
            {section.whiteBoardButtonText}
          </LinkButton>
        ) : (
          <GatsbyLinkButton
            className="button is-rounded has-text-centered"
            color="#4a4a4a"
            hoverColor="#fff"
            to={section.whiteBoardButtonLink.replace(
              "https://jtlsklima.pl/",
              ""
            )}
          >
            {section.whiteBoardButtonText}
          </GatsbyLinkButton>
        )}
      </WhiteBox>
      <ImageBoxWrapper>
        <ImageBox
          fluid={section.image.childImageSharp.fluid}
          {...section.image.childImageSharp}
          alt=""
        ></ImageBox>
        <BoxText md={section.imageText} color="#fff" />
        {section.isExternal ? (
          <LinkButton
            className="button is-rounded has-text-centered"
            href={section.imageButtonLink}
          >
            {section.imageButtonText}
          </LinkButton>
        ) : (
          <GatsbyLinkButton
            className="button is-rounded has-text-centered"
            to={section.imageButtonLink.replace("https://jtlsklima.pl/", "")}
          >
            {section.imageButtonText}
          </GatsbyLinkButton>
        )}
      </ImageBoxWrapper>
    </SectionWrapper>
  );
};
