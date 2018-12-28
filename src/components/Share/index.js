import React, {Component} from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookShareCount,
  LinkedinShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import styled from 'styled-components';

import config from '../../../meta/config';

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 15px 0;
`

const SocialLink = styled.div`
  cursor: pointer;
  margin: 5px 15px;
`

const ShareCount = styled.div`
text-align: center;
`

class Share extends Component {
  render () {
    const {title, slug, excerpt, mobile} = this.props
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + slug

    const iconSize = mobile ? 36 : 48
    const filter = count => (count > 0 ? count : '')

    return (
      <SocialLinks>
        <SocialLink>
          <RedditShareButton url={url} title={title}>
            <RedditIcon round size={iconSize} />
            <RedditShareCount url={url}>
              {count => <ShareCount>{filter(count)}</ShareCount>}
            </RedditShareCount>
          </RedditShareButton>
        </SocialLink>
        <SocialLink>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
        </SocialLink>
        <SocialLink>
          <FacebookShareButton url={url} quote={excerpt}>
            <FacebookIcon round size={iconSize} />
            <FacebookShareCount url={url}>
              {count => <ShareCount>{filter(count)}</ShareCount>}
            </FacebookShareCount>
          </FacebookShareButton>
        </SocialLink>
        <SocialLink>
          <LinkedinShareButton
            url={url}
            title={title}
            description={excerpt}
          >
            <LinkedinIcon round size={iconSize} />
            <LinkedinShareCount url={url}>
              {count => <ShareCount>{filter(count)}</ShareCount>}
            </LinkedinShareCount>
          </LinkedinShareButton>
        </SocialLink>
      </SocialLinks>
    )
  }
}

export default Share
