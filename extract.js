import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const SOURCE_DIR = '../freditech.com';
const DATA_DIR = './src/data';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function extractPosts() {
  const posts = [];
  
  const indexPath = path.join(SOURCE_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf-8');
  const $ = cheerio.load(html);

  // Extract from the featured / category grids on the homepage
  $('.ft-post-card').each((i, el) => {
    const title = $(el).find('.ft-post-card__title a').text().trim() || $(el).find('h3').text().trim();
    if (!title) return;

    const href = $(el).find('.ft-post-card__title a').attr('href') || '';
    
    // Convert links
    let slug = href;
    if (slug.includes('freditech.com')) {
      const url = new URL(slug);
      slug = url.pathname;
    }
    slug = slug.replace('.html', '').replace(/^\/+|\/+$/g, '');

    const img = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');
    
    const category = $(el).find('.ft-kicker').text().trim() || 'Tech';
    let categoryHref = $(el).find('.ft-kicker').attr('href') || '/';
    categoryHref = categoryHref.replace('.html', '');

    const date = $(el).find('time').attr('datetime') || '';
    const dateText = $(el).find('time').text().trim();
    const excerpt = $(el).find('p').text().trim() || '';

    // Only add if not already added
    if (!posts.find(p => p.title === title)) {
      posts.push({
        slug,
        title,
        date,
        dateText,
        category,
        categoryHref,
        img: img || '',
        excerpt,
      });
    }
  });

  fs.writeFileSync(path.join(DATA_DIR, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log(`Extracted ${posts.length} posts to posts.json`);
}

function extractProducts() {
  const shopFile = path.join(SOURCE_DIR, 'shop-3.html');
  if (!fs.existsSync(shopFile)) return;

  const html = fs.readFileSync(shopFile, 'utf-8');
  const $ = cheerio.load(html);
  
  const products = [];
  
  $('.product').each((i, el) => {
    const title = $(el).find('.woocommerce-loop-product__title').text().trim();
    if (!title) return;

    let href = $(el).find('.woocommerce-LoopProduct-link').attr('href') || '';
    href = href.replace('shop-3/', '/shop/').replace('.html', '');

    let img = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');
    if (img && img.startsWith('data:')) {
      img = $(el).find('img').attr('data-lazy-src') || '';
    }

    const priceHtml = $(el).find('.price').html();
    const badge = $(el).find('.onsale').text().trim();

    // Rating
    const starStyle = $(el).find('.star-rating span').attr('style') || '';
    let rating = 0;
    const match = starStyle.match(/width:\s*(\d+)%/);
    if (match) {
      rating = parseInt(match[1]) / 20; // 100% = 5 stars
    }

    products.push({
      id: i,
      title,
      href,
      img: img || '',
      priceHtml: priceHtml || '',
      badge,
      rating,
    });
  });

  fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products, null, 2));
  console.log(`Extracted ${products.length} products to products.json`);
}

function extractLegalPages() {
  const pages = ['privacy-policy', 'terms-and-conditions', 'affiliate-disclosure'];
  const extracted = {};

  for (const page of pages) {
    const filePath = path.join(SOURCE_DIR, page, 'index.html');
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filePath} not found`);
        continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');
    // For legal pages, the file might just redirect or the structure might be in `page.html`
    // Wait, let's try reading the root file for these instead of the directory
    const rootFilePath = path.join(SOURCE_DIR, page + '.html');
    
    let targetFile = filePath;
    if (fs.existsSync(rootFilePath)) {
      targetFile = rootFilePath;
    }

    const html2 = fs.readFileSync(targetFile, 'utf-8');
    const $ = cheerio.load(html2);
    
    const content = $('.entry-content').html() || '';
    const title = $('h1').text().trim() || page.replace(/-/g, ' ').toUpperCase();

    extracted[page] = { title, content };
  }

  fs.writeFileSync(path.join(DATA_DIR, 'legal.json'), JSON.stringify(extracted, null, 2));
  console.log(`Extracted ${Object.keys(extracted).length} legal pages to legal.json`);
}

extractPosts();
extractProducts();
extractLegalPages();
