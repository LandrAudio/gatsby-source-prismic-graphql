import React from 'react';
import { RichText } from 'prismic-reactjs';
import { graphql } from 'gatsby';
import { linkResolver } from '../prismic/linkResolver';
import { get } from 'lodash';

export const query = graphql`
  query BlogPost($uid: String) {
    prismic {
      allBlogposs(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              lang
            }
            title
            body
          }
        }
      }
    }
  }
`;

const BlogPost = props => {
  const edges = get(props.data, 'prismic.allBlogposs.edges', []);
  const data = get(edges, '0.node');

  if (!data) {
    return null;
  }

  return (
    <div id="blogpost">
      <h1>{RichText.asText(data.title)}</h1>
      {RichText.render(data.body, linkResolver)}
    </div>
  );
};

export default BlogPost;
