import { Link } from 'react-router-dom';

/**
 * PostCard — reusable blog post card component.
 *
 * Props:
 *   href        {string}  — React Router path to the post
 *   img         {string}  — Image source URL
 *   imgAlt      {string}  — Image alt text
 *   imgWidth    {number}  — Image width (default 720)
 *   imgHeight   {number}  — Image height (default 450)
 *   category    {string}  — Category label text
 *   categoryHref {string} — React Router path to the category
 *   title       {string}  — Post title
 *   excerpt     {string}  — Optional post excerpt
 *   date        {string}  — Display date e.g. "Sep 15, 2026"
 *   datetime    {string}  — Machine-readable datetime attribute
 *   readTime    {string}  — e.g. "13 min read"
 *   compact     {boolean} — Use compact layout (no excerpt)
 */
export default function PostCard({
  href,
  img,
  imgAlt = '',
  imgWidth = 720,
  imgHeight = 450,
  category,
  categoryHref,
  title,
  excerpt,
  date,
  datetime,
  readTime,
  compact = false,
}) {
  const cardClass = compact
    ? 'ft-post-card ft-post-card--compact'
    : 'ft-post-card';

  return (
    <article className={cardClass}>
      {img && (
        <Link
          className="ft-post-card__media"
          to={href}
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            src={img}
            alt={imgAlt}
            width={imgWidth}
            height={imgHeight}
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}
      <div className="ft-post-card__body">
        {category && categoryHref && (
          <Link className="ft-kicker" to={categoryHref}>
            {category}
          </Link>
        )}
        <h3 className="ft-post-card__title">
          <Link to={href}>{title}</Link>
        </h3>
        {!compact && excerpt && <p>{excerpt}</p>}
        {(date || readTime) && (
          <div className="ft-post-meta">
            {date && (
              <time dateTime={datetime}>{date}</time>
            )}
            {date && readTime && <span aria-hidden="true">•</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </article>
  );
}
