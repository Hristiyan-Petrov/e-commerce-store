require('dotenv').config(); 
const { AppDataSource } = require("./data-source");
const Product = require("../entities/Product");

const CATEGORIES = {
    KEYBOARDS: 'keyboards',
    MICE: 'mice',
    AUDIO: 'audio',
    ACCESSORIES: 'accessories', // <--- Important for impulse buys
    MONITORS: 'monitors'
};

const products = [
    // --- MICE ---
    {
        name: "Logitech MX Master 3S",
        description: "The gold standard for productivity. Quiet clicks, 8K DPI tracking, and MagSpeed electromagnetic scrolling.",
        category: CATEGORIES.MICE,
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech G Pro X Superlight",
        description: "Meticulously designed in collaboration with many of the world's leading esports pros. Ultra-lightweight engineering.",
        category: CATEGORIES.MICE,
        price: 159.00,
        salePrice: 129.99, 
        imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech Lift Vertical Ergonomic",
        description: "A vertical ergonomic mouse designed for small to medium hands to improve posture and reduce wrist pressure.",
        category: CATEGORIES.MICE,
        price: 69.99,
        imageUrl: "https://images.unsplash.com/photo-1625696838670-3ca46a196695?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech G502 X Plus",
        description: "The world's most popular gaming mouse, reinvented. Hybrid optical-mechanical switches and HERO 25K sensor.",
        category: CATEGORIES.MICE,
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1586351012965-861624544334?q=80&w=800&auto=format&fit=crop"
    },

    // --- KEYBOARDS ---
    {
        name: "Keychron Q1 Pro",
        description: "A fully customizable wireless mechanical keyboard with a premium aluminum body and QMK/VIA support.",
        category: CATEGORIES.KEYBOARDS,
        price: 199.00,
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "NuPhy Air75 V2",
        description: "The world's thinnest wireless mechanical keyboard. Perfect for on-the-go productivity with MacOS and Windows.",
        category: CATEGORIES.KEYBOARDS,
        price: 119.00,
        imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech MX Keys S",
        description: "Fluid, quiet typing with smart illumination and spherical-dished keys shaped for your fingertips.",
        category: CATEGORIES.KEYBOARDS,
        price: 109.99,
        salePrice: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech G915 TKL Lightspeed",
        description: "A breakthrough in design and engineering. Lightspeed pro-grade wireless, advanced LIGHTSYNC RGB, and low-profile switches.",
        category: CATEGORIES.KEYBOARDS,
        price: 229.99,
        imageUrl: "https://images.unsplash.com/photo-1613145972468-2d4ba75dc998?q=80&w=800&auto=format&fit=crop"
    },

    // --- AUDIO ---
    {
        name: "Audio-Technica ATH-M50x",
        description: "Critically acclaimed sonic performance praised by top audio engineers and pro audio reviewers.",
        category: CATEGORIES.AUDIO,
        price: 169.00,
        salePrice: 149.00,
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Edifier R1280T Powered Speakers",
        description: "Studio sound quality with a wooden enclosure. The best budget speakers for your desk setup.",
        category: CATEGORIES.AUDIO,
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1545459720-aacaf5090834?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Blue Yeti X Professional Mic",
        description: "The state-of-the-art flagship USB microphone for professional-level gaming, Twitch streaming, and podcasting.",
        category: CATEGORIES.AUDIO,
        price: 169.99,
        imageUrl: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech G733 Lightspeed Headset",
        description: "Wireless gaming headset designed for comfort and style. Features surround sound, voice filters, and advanced lighting.",
        category: CATEGORIES.AUDIO,
        price: 149.00,
        imageUrl: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=800&auto=format&fit=crop"
    },

    // --- MONITORS ---
    {
        name: "LG 34WP65C-B Ultrawide",
        description: "34-Inch Curved UltraWide QHD (3440 x 1440) Monitor with HDR 10 and sRGB 99% Color Gamut.",
        category: CATEGORIES.MONITORS,
        price: 399.99,
        salePrice: 349.99,
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Dell UltraSharp U2723QE",
        description: "27 inch 4K UHD Monitor with IPS Black technology for exceptional color and contrast.",
        category: CATEGORIES.MONITORS,
        price: 579.99,
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Alienware AW3423DWF",
        description: "Quantum Dot-OLED Curved Gaming Monitor. Infinite contrast and cinema-quality color for the ultimate visual experience.",
        category: CATEGORIES.MONITORS,
        price: 899.99,
        imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop"
    },

    // --- ACCESSORIES ---
    {
        name: "Wool Felt Desk Mat",
        description: "Premium merino wool felt desk pad. Protects your desk and improves mouse acoustics.",
        category: CATEGORIES.ACCESSORIES,
        price: 29.00,
        salePrice: 19.99,
        imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Cable Management Kit",
        description: "Keep your setup clean. Includes 10 velcro ties, 5 cable clips, and a sleeve.",
        category: CATEGORIES.ACCESSORIES,
        price: 14.99, 
        imageUrl: "https://images.unsplash.com/photo-1616440347437-b1c13d5cc221?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Screen Cleaning Spray",
        description: "Streak-free microbial cleaning solution with a microfiber cloth included.",
        category: CATEGORIES.ACCESSORIES,
        price: 9.99,
        imageUrl: "https://images.unsplash.com/photo-1629904853716-f004b377c814?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Wooden Wrist Rest",
        description: "Ergonomic walnut wood wrist rest for 75% mechanical keyboards.",
        category: CATEGORIES.ACCESSORIES,
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1609176378942-e1d5282479e0?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Logitech Brio 4K Webcam",
        description: "Ultra 4K HD video collaboration excellence. RightLight 3 allows you to look your best in any lighting condition.",
        category: CATEGORIES.ACCESSORIES,
        price: 199.99,
        salePrice: 169.99,
        imageUrl: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "BenQ ScreenBar Halo",
        description: "Intelligent monitor light bar with auto-dimming and hue adjustment. Saves desk space and reduces eye strain.",
        category: CATEGORIES.ACCESSORIES,
        price: 179.00,
        imageUrl: "https://images.unsplash.com/photo-1616353071588-708dcff912e2?q=80&w=800&auto=format&fit=crop"
    }
];

const seedDB = async () => {
    try {
        console.log('Connecting to db...');
        await AppDataSource.initialize();
        console.log('Database connection established.');

        const productRepository = AppDataSource.getRepository(Product);

        console.log('Clearing existing product data...');
        // await productRepository.clear(); // Warning: Truncates table
        await productRepository.query('TRUNCATE TABLE "products" RESTART IDENTITY CASCADE');


        console.log('Inserting new products...');
        await productRepository.save(products);

        console.log('✅ Seeding complete! Added ' + products.length + ' products.');

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