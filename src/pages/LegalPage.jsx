import { useParams, Navigate } from 'react-router-dom';
import legalData from '../data/legal.json';

export default function LegalPage({ pageId }) {
  const data = legalData[pageId];

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Legal & Policies
          </p>
          <h1>{data.title}</h1>
        </div>
      </header>
      <div className="ft-shell ft-page-wrap">
        <article className="ft-page-article page type-page status-publish hentry">
          <div 
            className="ft-entry-content entry-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </article>
      </div>
    </main>
  );
}
