import React from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';
export default function Index() {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  });
  return (
    <>
# Actian Data Intelligence Platform documentation has moved.'
 
 Be sure to update any bookmarks to the new URL: https://docs.actian.com/zeenea/.
    </>
  );
}
