import posts from '../data/posts.json';
import PostCard from '../components/blog/PostCard';

export default function BlogPage() {
  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Latest Articles
          </p>
          <h1>My Blog</h1>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap">
        <div className="ft-grid" style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '32px'
        }}>
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              href={`/${post.date.split('-')[0]}/${post.date.split('-')[1]}/${post.slug}`} // Mock url from date if missing actual
              img={post.img}
              title={post.title}
              excerpt={post.excerpt}
              date={post.dateText}
              datetime={post.date}
              category={post.category}
              categoryHref={post.categoryHref}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
