import React from 'react';

import { parseStaticImg } from '../../api/images';

import './index.scss';

const Image = ({ href, title, text }) => (
  <img
    className="lozad mb-3 align-self-center resized"
    data-src={parseStaticImg(href)}
    title={title || text}
    alt={title || text}
  />
);

export default Image;
