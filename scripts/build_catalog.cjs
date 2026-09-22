const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'products.json');

const knownProducts = {
  // Jewelry
  '29e10b0937fc5681248df27b81df75b0.jpg': { name: 'Gold Crystal Elegance Set', desc: 'A stunning gold-tone jewelry set featuring teardrop and diamond-shaped crystals. Includes necklace, earrings, bracelet, and ring.', cat: 'Jewelry', subcat: 'Jewelry Sets' },
  '2f6905359f433fa004655df629134d8e.jpg': { name: 'Anne Klein Silver Watch & Bracelet Set', desc: 'Elegant silver-tone watch set by Anne Klein, including two clover-motif bracelets and an infinity bracelet.', cat: 'Jewelry', subcat: 'Watches' },
  '4a064985ed736d5c8ac949b8d9e9358f.jpg': { name: 'Mother of Pearl Clover Set', desc: 'Gold-tone clover jewelry set with delicate white mother-of-pearl inserts.', cat: 'Jewelry', subcat: 'Jewelry Sets' },
  '7ffea1f8b04c465ba619b059c1b71db9.jpg': { name: 'Black Onyx Clover Set', desc: 'Sophisticated gold-tone clover jewelry set featuring deep black onyx-style inserts.', cat: 'Jewelry', subcat: 'Jewelry Sets' },
  'b888c355bdf2879b75a9548d5224d0df.jpg': { name: 'Rolex Datejust Blue Dial', desc: 'Classic Rolex Datejust featuring a striking blue dial, date window, and signature silver Jubilee band.', cat: 'Jewelry', subcat: 'Luxury Watches' },
  'bc24f121a880f99d053d3e52ee9a897d.jpg': { name: 'Floral Zirconia Statement Set', desc: 'Large gold-tone jewelry set with intricate floral and leaf motifs, heavily encrusted with cubic zirconia.', cat: 'Jewelry', subcat: 'Jewelry Sets' },
  'd0118d8d414032a0614fcf81b093b95d.jpg': { name: 'Enamel Clover Bracelets', desc: 'A trio of delicate gold-tone bracelets featuring clover motifs in red, white, and pink enamel.', cat: 'Jewelry', subcat: 'Bracelets' },
  'e81f4102d9273dcc44fd5552a9cef40a.jpg': { name: 'Delicate Starburst Crystal Set', desc: 'Dainty gold-tone jewelry set with star and flower crystal designs. Perfect for everyday elegance.', cat: 'Jewelry', subcat: 'Jewelry Sets' },
  
  // Cameras
  '069e81c5a0ea9b2d0c35aef675389589.jpg': { name: 'Canon Battery Charger', desc: 'Standard battery charger for Canon camera batteries with charge indicator lights.', cat: 'Photography', subcat: 'Accessories' },
  '1053a45e1e78de25bbccfcbfcd147d92.jpg': { name: 'Fujifilm X-T5 Mirrorless Camera', desc: 'Fujifilm X-T5 mirrorless camera with silver body, custom denim grip wrap, and attached flash.', cat: 'Photography', subcat: 'Cameras' },
  '27f78264f9ac9982ea89978c7e5ed601.jpg': { name: 'DJI Ronin-S Camera Gimbal', desc: 'Professional 3-axis camera gimbal by DJI, shown supporting a Canon DSLR setup.', cat: 'Photography', subcat: 'Accessories' },
  '38b307ac60f7e3f2f34eb1bfc458b5bd.jpg': { name: 'Olympus BLX-1 Battery Pack', desc: '7.2V 2000mAh Lithium-ion battery pack for Olympus cameras.', cat: 'Photography', subcat: 'Accessories' },
  '66d0097732e2c225e1bc1efe84357d56.jpg': { name: 'Canon EOS 750D DSLR', desc: 'Canon EOS 750D DSLR camera with 18-55mm kit lens and pop-up flash engaged.', cat: 'Photography', subcat: 'Cameras' },
  '8194b5bd4cf0bff89b8667405f20cb57.jpg': { name: 'DJI Mini 2 Ultralight Drone', desc: 'Compact and foldable DJI Mini 2 drone with remote controller.', cat: 'Tech & Gadgets', subcat: 'Drones' },
  '923d562c4c00887f5d65f505e31ab960.jpg': { name: 'Sony Alpha a6700 Mirrorless', desc: 'Sony Alpha a6700 APS-C mirrorless camera paired with an 18-135mm OSS lens.', cat: 'Photography', subcat: 'Cameras' },
  'ad44802b699f721461d36f208465ba84.jpg': { name: 'Nikon EN-EL15 Battery 2-Pack', desc: 'Two-pack of 7.0V 2550mAh Lithium-ion replacement batteries for Nikon cameras.', cat: 'Photography', subcat: 'Accessories' },
  'b90671451fdf6edeeb7549812367ebe7.jpg': { name: 'Canon LP-E17 Battery Pack', desc: '7.2V 1040mAh Lithium-ion battery pack for Canon EOS cameras.', cat: 'Photography', subcat: 'Accessories' },
  'f7c59467a2ee17d09c6adf8b4c5b0846.jpg': { name: 'Sony XDCAM 4K Camcorder', desc: 'Professional Sony XDCAM 4K video camcorder with top handle and shotgun microphone mount.', cat: 'Photography', subcat: 'Cameras' },

  // Female Clothing
  '19c35f97afabcd80adf4b11a22e3c0ce.jpg': { name: 'Striped Knit Romper', desc: 'Brown and beige horizontally striped knit short-sleeve romper with a collared neckline.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '23ed4fa40a07495ed8b59e5187e4ae92.jpg': { name: 'Olive Green Tie-Back Set', desc: 'Chic olive green two-piece set featuring a tie-back crop top with flutter sleeves and wide-leg trousers.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '28008aec9dcb1ab66a92459e041452dd.jpg': { name: 'Pink Textured Utility Romper', desc: 'Soft pink short-sleeve romper with a textured cable-knit pattern, button front, and tie belt.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '476e47583cfcd9e2267abd8a8a6bc4ef.jpg': { name: 'Floral Halter Maxi Dress', desc: 'Elegant black halter-neck maxi dress featuring large, vibrant pink floral placements and ruched detailing.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '66cbeae997e94e31ec92f82507632528.jpg': { name: 'Striped Off-Shoulder Midi Dress', desc: 'Bold black and white vertically striped midi dress with an off-the-shoulder neckline.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '66f507731612691016527103ca343905.jpg': { name: 'Light Blue Floral Mini', desc: 'Delicate light blue mini dress with a white ditsy floral print, v-neckline, and ruffled hem.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '6ed7303d14b8a7feaa2644eb7630b980.jpg': { name: 'Cherry Embroidered Mini Dress', desc: 'White square-neck mini dress featuring puff sleeves, a corset-style waist tie, and sweet red cherry embroidery.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '7c01524642a5b35be18a4e65735d8c69.jpg': { name: 'Sleeveless Denim Jumpsuit', desc: 'Wide-leg sleeveless denim jumpsuit featuring a lapel collar, double-breasted buttons, and a matching D-ring belt.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  '9c2ea86509a7452170dde87dcbb4de8c.jpg': { name: 'Brown Ruched Slip Dress', desc: 'Fitted brown mini slip dress with spaghetti straps and side ruched detailing.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
  'c828ab95f0d7487f806f7a502a2486d5.jpg': { name: 'Abstract Floral Puff Sleeve Midi', desc: 'Vibrant pink and white abstract floral midi dress with a v-neck, puff sleeves, and tiered skirt.', cat: 'Fashion', subcat: 'Women\'s Apparel' },
};

function generatePrice() {
  return (Math.random() * (199 - 19) + 19).toFixed(2);
}

function generateProducts() {
  const products = [];
  let idCounter = 1;

  const folders = fs.readdirSync(ASSETS_DIR);
  
  folders.forEach(folder => {
    const folderPath = path.join(ASSETS_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i));
    
    files.forEach(file => {
      const known = knownProducts[file];
      
      let name = `Premium ${folder.replace(/[^a-zA-Z]/g, ' ')} Item`;
      let desc = `A high-quality item from our ${folder.replace(/[^a-zA-Z]/g, ' ')} collection. Designed for everyday utility and style.`;
      let cat = 'Uncategorized';
      let subcat = folder;

      if (known) {
        name = known.name;
        desc = known.desc;
        cat = known.cat;
        subcat = known.subcat;
      } else {
        // Fallbacks based on folder
        if (folder.includes('gadget')) {
          cat = 'Tech & Gadgets';
          name = 'Tech Accessory Pro';
          desc = 'A high-performance tech accessory built to improve your daily workflow and entertainment.';
        } else if (folder.includes('male')) {
          cat = 'Fashion';
          name = 'Men\'s Casual Wear';
          desc = 'Comfortable and stylish men\'s apparel suitable for casual outings.';
        } else if (folder.includes('workspace')) {
          cat = 'Gaming & Workspace';
          name = 'Ergonomic Workspace Essential';
          desc = 'Upgrade your setup with this ergonomic and aesthetically pleasing workspace addition.';
        }
      }

      const price = generatePrice();

      products.push({
        id: `prod_${idCounter++}`,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: name,
        category: cat,
        subcategory: subcat,
        priceHtml: `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>${price}</bdi></span>`,
        rating: Math.floor(Math.random() * 2) + 4,
        badge: Math.random() > 0.7 ? 'Best Seller' : '',
        shortDescription: desc,
        fullDescription: `<p>${desc}</p><p>This item is a perfect addition to your collection, offering both style and durability. Images may depict slight variations in color due to lighting.</p>`,
        images: [`/src/assets/${folder}/${file}`],
        primaryImage: `/src/assets/${folder}/${file}`
      });
    });
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
  console.log(`Generated ${products.length} products to ${OUTPUT_FILE}`);
}

generateProducts();
