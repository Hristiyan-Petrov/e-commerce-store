const { AppDataSource } = require("../data-source");
const { Product } = require("../entity/Product");

const products = [
  {
    name: '"Aether" - Sans Serif Typeface',
    description:
      'A clean, geometric sans-serif font perfect for modern branding, headlines, and UI design. Includes 4 weights (Light, Regular, Bold, Black).',
    price: 35.0,
    imageUrl:
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '"Vivid" - Lightroom Preset Pack',
    description:
      'A collection of 12 professional Lightroom presets designed to make your photos pop with vibrant color and rich contrast. Perfect for travel and lifestyle photography.',
    price: 29.0,
    salePrice: 19.99,
    imageUrl:
      'https://images.unsplash.com/photo-1558315182-3146f734527a?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '"Lo-Fi Dreams" - Sound Kit',
    description:
      'Over 500MB of royalty-free lo-fi hip hop samples, including dusty drum loops, melancholic piano melodies, and warm bass lines.',
    price: 49.99,
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Notion Productivity Template',
    description:
      'An all-in-one Notion dashboard for managing your projects, tasks, goals, and notes. Fully customizable and easy to use.',
    price: 15.0,
    imageUrl:
      'https://images.unsplash.com/photo-1617994210255-90a69c0032e5?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '"Origami" - Procreate Brush Set',
    description:
      'A set of 25 high-resolution paper texture and folding effect brushes for Procreate. Add realistic depth and texture to your digital illustrations.',
    price: 12.5,
    imageUrl:
      'https://images.unsplash.com/photo-1596955783324-7a3a9167b098?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Minimalist Resume/CV Template',
    description:
      'A professionally designed, clean, and modern resume template. Available in Adobe Illustrator, Photoshop, and Canva formats.',
    price: 10.0,
    imageUrl:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '"Glitch" - Video Transition Pack',
    description:
      '10 dynamic glitch and distortion transitions for Adobe Premiere Pro and Final Cut Pro. Drag and drop to add a high-tech feel to your edits.',
    price: 22.0,
    salePrice: 15.0,
    imageUrl:
      'https://images.unsplash.com/photo-1555939328-173c399b3663?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '3D Asset Pack - Sci-Fi Gadgets',
    description:
      'A collection of 15 high-quality, game-ready 3D models of futuristic gadgets and props. Provided in .FBX and .OBJ formats.',
    price: 75.0,
    imageUrl:
      'https://images.unsplash.com/photo-1581094784350-f2150117a3a0?q=80&w=800&auto=format&fit=crop',
  },
];

const seedDB = async () => {
    try {
        console.log('Connecting to db');
        await AppDataSource.initialize();
        console.log('Database connection established.');

        const productRepository = AppDataSource.getRepository(Product);

        console.log('Clearing existing product data...');
        await productRepository.clear();

        console.log('Inserting new products...');
        await productRepository.save(products);

        console.log('✅ Seeding complete!');

    } catch (error) {
        console.error('❌ Error during seeding:', error);

    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('Database connection closed.');
        }
    }
};

seedDB();