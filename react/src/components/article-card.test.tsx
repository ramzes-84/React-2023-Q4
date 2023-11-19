import { describe, it, expect } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ArticleCard } from './article-card';
import { BrowserRouter } from 'react-router-dom';
import { articleResponse } from '../utils/test-data';

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
