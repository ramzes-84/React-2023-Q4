import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
// import { ArticleInCatalog } from '../types';

// const articleResponse: ArticleInCatalog = {
//   id: 'id',
//   type: 'type',
//   sectionId: 'sectionID',
//   sectionName: 'Australia news',
//   webPublicationDate: '2023-11-10T03:39:59Z',
//   webTitle: 'webTitle',
//   webUrl: 'https://www.test.com/',
//   apiUrl: 'https://www.test.com/',
//   isHosted: false,
//   pillarId: 'pillar/news',
//   pillarName: 'News',
//   fields: {
//     headline: 'headline',
//     standfirst: 'standfirst',
//     trailText: 'Follow live',
//     byline: 'Cait Kelly (now) and  Rafqa Touma (earlier)',
//     main: 'main',
//     wordcount: 'wordcount',
//     firstPublicationDate: 'firstPublicationDate',
//     isInappropriateForSponsorship: 'false',
//     isPremoderated: 'false',
//     lastModified: '2023-11-10T03:42:58Z',
//     productionOffice: 'AUS',
//     publication: 'theguardian.com',
//     shortUrl: 'https://www.theguardian.com/p/pae44',
//     shouldHideAdverts: 'false',
//     showInRelatedContent: 'true',
//     thumbnail: 'https://test.com/',
//     legallySensitive: 'false',
//     lang: 'en',
//     isLive: 'true',
//     bodyText: '',
//     charCount: '44957',
//     shouldHideReaderRevenue: 'false',
//     showAffiliateLinks: 'false',
//     bylineHtml: 'bylineHtml',
//     body: 'body',
//     newspaperPageNumber: '',
//     newspaperEditionDate: '',
//   },
// };

export function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const handlers = [
  http.get('https://content.guardianapis.com/search', () => {
    return new HttpResponse('Not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }),
];

export const server = setupServer(...handlers);
