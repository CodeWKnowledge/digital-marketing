import { useParams } from 'react-router-dom';
import posts from '../data/posts.json';
import PostCard from '../components/blog/PostCard';

export default function CategoryPage() {
  const { slug } = useParams();
  
  // Format slug to match Category name (e.g., "reviews" -> "Reviews")
  // Or match against the categoryHref which contains the slug.
  const matchingPosts = posts.filter(post => 
    post.categoryHref.toLowerCase().includes(slug.toLowerCase()) || 
    post.category.toLowerCase() === slug.toLowerCase()
  );

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Category Archive
          </p>
          <h1>{categoryName}</h1>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap">
        {matchingPosts.length > 0 ? (
          <div className="ft-grid" style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '32px'
          }}>
            {matchingPosts.map((post) => (
              <PostCard
                key={post.slug}
                href={`/${post.date.split('-')[0]}/${post.date.split('-')[1]}/${post.slug}`}
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
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
