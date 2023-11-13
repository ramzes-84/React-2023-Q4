import { describe, it, expect } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ArticleCard } from './article-card';
import { ArticleInCatalog } from '../types';
import { BrowserRouter } from 'react-router-dom';

const articleResponse: ArticleInCatalog = {
  id: 'id',
  type: 'type',
  sectionId: 'sectionID',
  sectionName: 'Australia news',
  webPublicationDate: '2023-11-10T03:39:59Z',
  webTitle: 'webTitle',
  webUrl: 'https://www.test.com/',
  apiUrl: 'https://www.test.com/',
  isHosted: false,
  pillarId: 'pillar/news',
  pillarName: 'News',
  fields: {
    headline: 'headline',
    standfirst: 'standfirst',
    trailText: 'Follow live',
    byline: 'Cait Kelly (now) and  Rafqa Touma (earlier)',
    main: 'main',
    wordcount: 'wordcount',
    firstPublicationDate: 'firstPublicationDate',
    isInappropriateForSponsorship: 'false',
    isPremoderated: 'false',
    lastModified: '2023-11-10T03:42:58Z',
    productionOffice: 'AUS',
    publication: 'theguardian.com',
    shortUrl: 'https://www.theguardian.com/p/pae44',
    shouldHideAdverts: 'false',
    showInRelatedContent: 'true',
    thumbnail: 'https://test.com/',
    legallySensitive: 'false',
    lang: 'en',
    isLive: 'true',
    bodyText: '',
    charCount: '44957',
    shouldHideReaderRevenue: 'false',
    showAffiliateLinks: 'false',
    bylineHtml: 'bylineHtml',
    body: 'body',
    newspaperPageNumber: '',
    newspaperEditionDate: '',
  },
};

describe('ArticleCard component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <ArticleCard article={articleResponse} />
      </BrowserRouter>
    );

    const btn = screen.getByText('🌐');
    const webTitle = screen.getByText('webTitle');
    const trailText = screen.getByText('Follow live');

    expect(btn).toBeInTheDocument();
    expect(webTitle).toBeInTheDocument();
    expect(trailText).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', () => {
    act(() => {
      render(
        <BrowserRouter>
          <ArticleCard article={articleResponse} />
        </BrowserRouter>
      );
    });
    expect(document.location.pathname).toEqual('/');

    const btn = screen.getByText('🔍');
    fireEvent.click(btn);

    expect(document.location.pathname).toEqual('/split/id');
  });

  it('Validate that NO IMAGE is shown', () => {
    articleResponse.fields.thumbnail = '';
    render(
      <BrowserRouter>
        <ArticleCard article={articleResponse} />
      </BrowserRouter>
    );
    const img: HTMLImageElement = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img.src).toEqual('http://localhost:3000/no-image.png');
  });
});
