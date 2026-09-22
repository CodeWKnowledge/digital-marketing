import { useParams, Navigate } from 'react-router-dom';
import posts from '../data/posts.json';

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--post">
        {post.img && (
          <div className="ft-hero-bg">
            <img src={post.img} alt={post.title} />
          </div>
        )}
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>
            <a href={post.categoryHref || '#'}>{post.category}</a>
          </p>
          <h1>{post.title}</h1>
          <div className="ft-post-meta">
            <time dateTime={post.date}>{post.dateText}</time>
          </div>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap">
        <article className="ft-post-article post type-post status-publish hentry">
          {post.content ? (
            <div
              className="ft-entry-content entry-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="ft-entry-content entry-content">
              <p><em>Full article content could not be extracted by HTTrack. This is a placeholder for the content.</em></p>
              <p>{post.excerpt}</p>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
