/**
 * SearchPanel — slide-in search overlay, matching the original ft-search-panel HTML.
 *
 * Props:
 *   isOpen   {boolean}   — whether the panel is open
 *   onClose  {function}  — callback to close the panel
 */
export default function SearchPanel({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements['s'].value.trim();
    if (query) {
      // In a future phase: integrate with a site search solution.
      // For now, open a Google site search as a fallback.
      window.open(
        `https://www.google.com/search?q=site:bridgetkelly.com+${encodeURIComponent(query)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
    onClose();
  };

  return (
    <div
      id="ft-search-panel"
      className="ft-search-panel"
      hidden={!isOpen}
      aria-hidden={!isOpen}
    >
      <button
        className="ft-search-panel__backdrop"
        type="button"
        aria-label="Close search"
        onClick={onClose}
      />
      <div
        className="ft-search-panel__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ft-search-title"
      >
        <div className="ft-search-panel__top">
          <p id="ft-search-title">Search Bridget Kelly</p>
          <button
            className="ft-icon-button"
            type="button"
            aria-label="Close search"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>
        <form
          className="ft-search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <label className="screen-reader-text" htmlFor="ft-search-field">
            Search for:
          </label>
          <input
            id="ft-search-field"
            type="search"
            name="s"
            defaultValue=""
            placeholder="Search reviews, products and guides…"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
        <p className="ft-search-panel__hint">
          Try &ldquo;laptop review&rdquo;, &ldquo;smartphone&rdquo;, &ldquo;EV&rdquo; or &ldquo;buying guide&rdquo;.
        </p>
      </div>
    </div>
  );
}
