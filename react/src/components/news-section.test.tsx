import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { NewsSection } from './news-section';

vi.mock('react-router-dom', () => {
  return {
    Link: vi.fn(),
    Outlet: vi.fn(),
    useParams: vi.fn().mockReturnValue({ ['*']: 'url/params' }),
  };
});
vi.mock('./article-card', () => {
  return {
    ArticleCard: vi.fn().mockReturnValue(<div>Article Card</div>),
  };
});
vi.mock('./pagination', () => {
  return {
    Pagination: vi.fn().mockReturnValue(<div>Pagination buttons</div>),
  };
});
vi.mock('../hooks/context-check', () => {
  const articleResponse1 = {
    id: 'id1',
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
  const articleResponse2 = {
    id: 'id2',
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
  return {
    useContextChecker: vi
      .fn()
      .mockReturnValueOnce({ news: [articleResponse1, articleResponse2] })
      .mockReturnValueOnce({ news: [] }),
  };
});

describe('NewsSection component should render main page elements: card & pagination if there are articles', async () => {
  it('Verify that the component renders the specified number of cards', () => {
    act(() => {
      render(<NewsSection />);
    });

    const cards = screen.getAllByText('Article Card');
    const pagination = screen.getByText('Pagination buttons');

    expect(cards.length).toEqual(2);
    expect(pagination).toBeInTheDocument();
  });
});

describe('NewsSection component should render warning when there are no data', async () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    act(() => {
      render(<NewsSection />);
    });

    const nothingMsg = screen.getByText('Nothing was found');

    expect(nothingMsg).toBeInTheDocument();
  });
});
