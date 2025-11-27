require('dotenv').config(); 
const { AppDataSource } = require("./data-source");
const Product = require("../entities/Product");

const CATEGORIES = {
    KEYBOARDS: 'keyboards',
    MICE: 'mice',
    AUDIO: 'audio',
    ACCESSORIES: 'accessories',
    MONITORS: 'monitors'
};

const products = [
    // --- KEYBOARDS (10 Items) ---
    {
        id: 1,
        name: "Artisan G60 Mechanical Keyboard",
        description: "60% layout with hot-swappable keycaps, CNC aluminum chassis, and Gateron Ink Black switches.",
        category: CATEGORIES.KEYBOARDS,
        price: 289.99,
        salePrice: 249.99,
        imageUrl: "https://picsum.photos/seed/product_01/600/400"
    },
    {
        id: 2,
        name: "ErgoFlow Split Keyboard",
        description: "Ergonomic split design with magnetic tenting, low-profile Kailh Choc switches, and wrist rests.",
        category: CATEGORIES.KEYBOARDS,
        price: 349.00,
        imageUrl: "https://picsum.photos/seed/product_02/600/400"
    },
    {
        id: 3,
        name: "Silent Pro TKL",
        description: "Tenkeyless (TKL) with proprietary silent MX switches and acoustic dampening foam for a quiet typing experience.",
        category: CATEGORIES.KEYBOARDS,
        price: 189.99,
        imageUrl: "https://picsum.photos/seed/product_03/600/400"
    },
    {
        id: 4,
        name: "RGB Spectrum Full-Size",
        description: "Full 104-key layout with per-key RGB lighting, double-shot PBT keycaps, and durable steel plate.",
        category: CATEGORIES.KEYBOARDS,
        price: 159.99,
        salePrice: 129.99,
        imageUrl: "https://picsum.photos/seed/product_04/600/400"
    },
    {
        id: 5,
        name: "Voyager 75% Wireless",
        description: "Compact 75% layout, tri-mode connectivity (BT, 2.4G, USB-C), and carbon fiber plate.",
        category: CATEGORIES.KEYBOARDS,
        price: 250.00,
        imageUrl: "https://picsum.photos/seed/product_05/600/400"
    },
    {
        id: 6,
        name: "CyberDeck Macro Pad",
        description: "Programmable 15-key macro pad with OLED screen and rotary encoder for content creation.",
        category: CATEGORIES.KEYBOARDS,
        price: 99.00,
        imageUrl: "https://picsum.photos/seed/product_06/600/400"
    },
    {
        id: 7,
        name: "Luxor V2 Aluminum",
        description: "Heavy-duty aluminum case, south-facing LEDs, and screw-in stabilizers. Barebones kit.",
        category: CATEGORIES.KEYBOARDS,
        price: 219.95,
        imageUrl: "https://picsum.photos/seed/product_07/600/400"
    },
    {
        id: 8,
        name: "Aether 65 Compact",
        description: "65% layout with dedicated arrow keys, dual-tone keycaps, and USB-C detachable cable.",
        category: CATEGORIES.KEYBOARDS,
        price: 169.99,
        salePrice: 155.00,
        imageUrl: "https://picsum.photos/seed/product_08/600/400"
    },
    {
        id: 9,
        name: "Pro-Gamer Speed Key",
        description: "Linear optical switches designed for competitive speed gaming with zero debounce delay.",
        category: CATEGORIES.KEYBOARDS,
        price: 149.99,
        imageUrl: "https://picsum.photos/seed/product_09/600/400"
    },
    {
        id: 10,
        name: "Retro-Classic Dactyl",
        description: "Hand-wired, contoured ergonomic keyboard with vintage keycap design.",
        category: CATEGORIES.KEYBOARDS,
        price: 499.00,
        imageUrl: "https://picsum.photos/seed/product_10/600/400"
    },

    // --- MICE (10 Items) ---
    {
        id: 11,
        name: "Ultralight Phantom Wireless",
        description: "Magnesium alloy honeycomb shell, sub-50g weight, and 26K DPI sensor. Black matte finish.",
        category: CATEGORIES.MICE,
        price: 179.99,
        imageUrl: "https://picsum.photos/seed/product_11/600/400"
    },
    {
        id: 12,
        name: "ErgoVertical Pro",
        description: "Vertical ergonomic design for natural hand alignment, reducing wrist strain. 6 programmable buttons.",
        category: CATEGORIES.MICE,
        price: 99.99,
        imageUrl: "https://picsum.photos/seed/product_12/600/400"
    },
    {
        id: 13,
        name: "Laser Precision VX",
        description: "High-accuracy laser sensor (30K DPI) for graphic design and engineering tasks. Wired.",
        category: CATEGORIES.MICE,
        price: 120.00,
        salePrice: 100.00,
        imageUrl: "https://picsum.photos/seed/product_13/600/400"
    },
    {
        id: 14,
        name: "Nexus MMO Mouse",
        description: "12 customizable side buttons optimized for Massively Multiplayer Online (MMO) gaming.",
        category: CATEGORIES.MICE,
        price: 110.00,
        imageUrl: "https://picsum.photos/seed/product_14/600/400"
    },
    {
        id: 15,
        name: "Traveler Mini BT",
        description: "Compact Bluetooth mouse with silent clicks and a hidden USB-C charging port. Aluminum base.",
        category: CATEGORIES.MICE,
        price: 69.99,
        imageUrl: "https://picsum.photos/seed/product_15/600/400"
    },
    {
        id: 16,
        name: "Aura Glass Pad",
        description: "Large, tempered glass mouse pad providing extremely smooth, low-friction glide for precision.",
        category: CATEGORIES.MICE,
        price: 79.99,
        salePrice: 65.99,
        imageUrl: "https://picsum.photos/seed/product_16/600/400"
    },
    {
        id: 17,
        name: "MagSafe Charging Mat",
        description: "Desk mat with integrated wireless charging pad for compatible mouse and accessories.",
        category: CATEGORIES.MICE,
        price: 140.00,
        imageUrl: "https://picsum.photos/seed/product_17/600/400"
    },
    {
        id: 18,
        name: "Cortex Pro Trackball",
        description: "Ergonomic trackball design with customizable scroll ring and optical tracking.",
        category: CATEGORIES.MICE,
        price: 139.99,
        imageUrl: "https://picsum.photos/seed/product_18/600/400"
    },
    {
        id: 19,
        name: "Hydra Lightweight RGB",
        description: "Wired esports mouse, symmetrical shape, high flexibility paracord cable, 16K DPI.",
        category: CATEGORIES.MICE,
        price: 79.00,
        imageUrl: "https://picsum.photos/seed/product_19/600/400"
    },
    {
        id: 20,
        name: "Zenith Flow Mouse",
        description: "Silent magnetic scroll wheel and multiple device connectivity for productivity.",
        category: CATEGORIES.MICE,
        price: 119.99,
        salePrice: 99.99,
        imageUrl: "https://picsum.photos/seed/product_20/600/400"
    },

    // --- AUDIO (10 Items) ---
    {
        id: 21,
        name: "Studio Master Headphones",
        description: "Open-back, planar magnetic headphones for critical listening and audio engineering.",
        category: CATEGORIES.AUDIO,
        price: 599.00,
        imageUrl: "https://picsum.photos/seed/product_21/600/400"
    },
    {
        id: 22,
        name: "Nova-X Gaming Headset",
        description: "7.1 surround sound, retractable noise-cancelling microphone, and cooling gel ear pads.",
        category: CATEGORIES.AUDIO,
        price: 199.99,
        imageUrl: "https://picsum.photos/seed/product_22/600/400"
    },
    {
        id: 23,
        name: "Desktop A1 Powered Speakers",
        description: "Compact powered bookshelf speakers with integrated DAC and Bluetooth 5.0.",
        category: CATEGORIES.AUDIO,
        price: 350.00,
        salePrice: 315.00,
        imageUrl: "https://picsum.photos/seed/product_23/600/400"
    },
    {
        id: 24,
        name: "Streamer Pro USB Mic",
        description: "Professional cardioid condenser microphone with shock mount and adjustable gain control.",
        category: CATEGORIES.AUDIO,
        price: 159.00,
        imageUrl: "https://picsum.photos/seed/product_24/600/400"
    },
    {
        id: 25,
        name: "AeroSport TWS Earbuds",
        description: "True wireless earbuds with active noise cancellation (ANC) and low-latency gaming mode.",
        category: CATEGORIES.AUDIO,
        price: 149.99,
        imageUrl: "https://picsum.photos/seed/product_25/600/400"
    },
    {
        id: 26,
        name: "DAC/AMP Titan",
        description: "External digital-to-analog converter and headphone amplifier for audiophiles.",
        category: CATEGORIES.AUDIO,
        price: 499.00,
        salePrice: 450.00,
        imageUrl: "https://picsum.photos/seed/product_26/600/400"
    },
    {
        id: 27,
        name: "Desk Mount Boom Arm",
        description: "Heavy-duty articulating arm for professional microphones, internal cable management.",
        category: CATEGORIES.AUDIO,
        price: 85.00,
        imageUrl: "https://picsum.photos/seed/product_27/600/400"
    },
    {
        id: 28,
        name: "SoundScape 5.1",
        description: "Wired 5.1 channel surround sound system for immersive movie and gaming experiences.",
        category: CATEGORIES.AUDIO,
        price: 429.99,
        imageUrl: "https://picsum.photos/seed/product_28/600/400"
    },
    {
        id: 29,
        name: "USB-C Audio Adapter Pro",
        description: "High-resolution audio adapter for devices without a standard headphone jack.",
        category: CATEGORIES.AUDIO,
        price: 59.99,
        salePrice: 49.99,
        imageUrl: "https://picsum.photos/seed/product_29/600/400"
    },
    {
        id: 30,
        name: "Acoustic Isolation Pads",
        description: "Set of foam pads designed to decouple desktop speakers from the desk surface.",
        category: CATEGORIES.AUDIO,
        price: 45.00,
        imageUrl: "https://picsum.photos/seed/product_30/600/400"
    },

    // --- MONITORS (10 Items) ---
    {
        id: 31,
        name: "OLED Pro 32-inch 4K",
        description: "32-inch OLED display, 4K resolution, 144Hz refresh rate, 0.1ms response time, VESA mount.",
        category: CATEGORIES.MONITORS,
        price: 1499.00,
        imageUrl: "https://picsum.photos/seed/product_31/600/400"
    },
    {
        id: 32,
        name: "UltraWide Creator 49-inch",
        description: "49-inch curved ultrawide (32:9) for multi-tasking and professional video editing.",
        category: CATEGORIES.MONITORS,
        price: 1250.00,
        salePrice: 1100.00,
        imageUrl: "https://picsum.photos/seed/product_32/600/400"
    },
    {
        id: 33,
        name: "Esports 360Hz FHD",
        description: "25-inch Full HD monitor with a blazing fast 360Hz refresh rate for competitive gaming.",
        category: CATEGORIES.MONITORS,
        price: 699.00,
        imageUrl: "https://picsum.photos/seed/product_33/600/400"
    },
    {
        id: 34,
        name: "Portable Touch 15-inch",
        description: "Lightweight, portable 15-inch touch-enabled monitor with a single USB-C connection.",
        category: CATEGORIES.MONITORS,
        price: 399.99,
        imageUrl: "https://picsum.photos/seed/product_34/600/400"
    },
    {
        id: 35,
        name: "Studio 5K Retina",
        description: "27-inch 5K resolution display with P3 wide color gamut and calibrated uniformity.",
        category: CATEGORIES.MONITORS,
        price: 1599.00,
        imageUrl: "https://picsum.photos/seed/product_35/600/400"
    },
    {
        id: 36,
        name: "G-Sync Ultimate QHD",
        description: "27-inch QHD (1440p) display with official NVIDIA G-Sync Ultimate certification and Mini-LED backlighting.",
        category: CATEGORIES.MONITORS,
        price: 899.99,
        salePrice: 799.99,
        imageUrl: "https://picsum.photos/seed/product_36/600/400"
    },
    {
        id: 37,
        name: "Budget 1440p 165Hz",
        description: "Excellent value 1440p monitor with fast 165Hz refresh rate and adjustable stand.",
        category: CATEGORIES.MONITORS,
        price: 349.00,
        imageUrl: "https://picsum.photos/seed/product_37/600/400"
    },
    {
        id: 38,
        name: "Dual Stack Monitor Stand",
        description: "Heavy-duty desk mount for stacking two large monitors vertically.",
        category: CATEGORIES.ACCESSORIES, // Accessories, but related to Monitors
        price: 120.00,
        imageUrl: "https://picsum.photos/seed/product_38/600/400"
    },
    {
        id: 39,
        name: "Curved 4K HDR",
        description: "34-inch curved 4K monitor with HDR 1000 and KVM switch capabilities.",
        category: CATEGORIES.MONITORS,
        price: 999.00,
        imageUrl: "https://picsum.photos/seed/product_39/600/400"
    },
    {
        id: 40,
        name: "Ambient Light Bar",
        description: "Monitor-top light bar with adjustable color temperature and anti-glare design.",
        category: CATEGORIES.ACCESSORIES, // Accessories, but related to Monitors
        price: 79.00,
        salePrice: 59.99,
        imageUrl: "https://picsum.photos/seed/product_40/600/400"
    },

    // --- ACCESSORIES (10 Items) ---
    {
        id: 41,
        name: "Cable Management Sleeve Kit",
        description: "Premium braided cable sleeves and reusable zip ties for clean desk setup.",
        category: CATEGORIES.ACCESSORIES,
        price: 39.99,
        imageUrl: "https://picsum.photos/seed/product_41/600/400"
    },
    {
        id: 42,
        name: "Aluminum Desk Mat",
        description: "Large, smooth aluminum desk pad that doubles as a cool surface for laptops or keyboards.",
        category: CATEGORIES.ACCESSORIES,
        price: 89.00,
        salePrice: 49.99,
        imageUrl: "https://picsum.photos/seed/product_42/600/400"
    },
    {
        id: 43,
        name: "Webcam 4K Pro",
        description: "Professional 4K webcam with autofocus, adjustable field of view, and built-in privacy shutter.",
        category: CATEGORIES.ACCESSORIES,
        price: 199.99,
        imageUrl: "https://picsum.photos/seed/product_43/600/400"
    },
    {
        id: 44,
        name: "USB-C 10-in-1 Hub",
        description: "Docking station with dual 4K HDMI, Gigabit Ethernet, SD card slot, and 100W PD passthrough.",
        category: CATEGORIES.ACCESSORIES,
        price: 129.99,
        salePrice: 110.00,
        imageUrl: "https://picsum.photos/seed/product_44/600/400"
    },
    {
        id: 45,
        name: "Leather Wrist Rest (Keyboard)",
        description: "Hand-stitched leather wrist rest filled with memory foam for 60% and TKL keyboards.",
        category: CATEGORIES.ACCESSORIES,
        price: 65.00,
        imageUrl: "https://picsum.photos/seed/product_45/600/400"
    },
    {
        id: 46,
        name: "Qi Wireless Charger Stand",
        description: "Fast wireless charging pad for phone and watch, doubles as an adjustable phone stand.",
        category: CATEGORIES.ACCESSORIES,
        price: 79.99,
        imageUrl: "https://picsum.photos/seed/product_46/600/400"
    },
    {
        id: 47,
        name: "Ergonomic Foot Rest",
        description: "Adjustable height and angle ergonomic footrest with non-slip surface for improved posture.",
        category: CATEGORIES.ACCESSORIES,
        price: 95.00,
        salePrice: 80.00,
        imageUrl: "https://picsum.photos/seed/product_47/600/400"
    },
    {
        id: 48,
        name: "Desk Shelf Monitor Riser",
        description: "Solid oak monitor stand with integrated storage compartments for desk organization.",
        category: CATEGORIES.ACCESSORIES,
        price: 150.00,
        imageUrl: "https://picsum.photos/seed/product_48/600/400"
    },
    {
        id: 49,
        name: "Braided USB-C Coiled Cable",
        description: "Premium detachable coiled cable for mechanical keyboards with aviation connector.",
        category: CATEGORIES.ACCESSORIES,
        price: 49.99,
        imageUrl: "https://picsum.photos/seed/product_49/600/400"
    },
    {
        id: 50,
        name: "Desk Clamp Headphone Hanger",
        description: "Rotating aluminum hanger that securely clamps to the edge of the desk for headphone storage.",
        category: CATEGORIES.ACCESSORIES,
        price: 35.00,
        imageUrl: "https://picsum.photos/seed/product_50/600/400"
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