import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const MyImage = ({ image_url,title }) => (
  <LazyLoadImage
    alt={title}
    effect="blur"
    height="280px"

    src={image_url} />
);