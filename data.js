const products = [
    {
        id: 1,
        name: "Pro Gaming Laptop X1",
        category: "Laptops",
        price: 2499,
        image: "https://image.pollinations.ai/prompt/futuristic%20gaming%20laptop%20rgb%20lights%20dark%20background?nologo=true",
        description: "Experience ultimate performance with the X1. Featuring the latest RTX graphics and Ryzen 9 processor."
    },
    {
        id: 2,
        name: "Neon Phone 15 Pro",
        category: "Phones",
        price: 1199,
        image: "images/iphone15pro_v2.jpg",
        description: "Sleek design, powerful camera system, and all-day battery life."
    },
    {
        id: 3,
        name: "Wireless Headset Z",
        category: "Audio",
        price: 299,
        image: "images/wireless_headset_z.jpg",
        description: "Noise-cancelling over-ear headphones with premium sound quality."
    },
    {
        id: 4,
        name: "Smart Watch Ultra",
        category: "Wearables",
        price: 499,
        image: "https://image.pollinations.ai/prompt/smartwatch%20fitness%20tracker%20rugged%20design?nologo=true",
        description: "Track your health and stay connected with the most advanced smartwatch yet."
    },
    {
        id: 5,
        name: "VR Headset Reality",
        category: "Gaming",
        price: 899,
        image: "https://image.pollinations.ai/prompt/vr%20headset%20virtual%20reality%20device%20neon?nologo=true",
        description: "Dive into immersive worlds with 8K resolution and haptic feedback."
    },
    {
        id: 6,
        name: "Drone SkyMaster 4K",
        category: "Drones",
        price: 1299,
        image: "https://image.pollinations.ai/prompt/professional%20camera%20drone%20flying%20sunset?nologo=true",
        description: "Capture breathtaking aerial footage with a 3-axis gimbal and 45-minute flight time."
    },
    {
        id: 7,
        name: "Mirrorless Camera Alpha",
        category: "Cameras",
        price: 1599,
        image: "https://image.pollinations.ai/prompt/mirrorless%20digital%20camera%20lens%20product%20shot?nologo=true",
        description: "Professional grade photography in a compact body. 24MP sensor and 4K video."
    },
    {
        id: 8,
        name: "Mechanical Keyboard RGB",
        category: "Accessories",
        price: 149,
        image: "https://image.pollinations.ai/prompt/mechanical%20keyboard%20rgb%20backlight%20gaming?nologo=true",
        description: "Tactile switches with customizable RGB lighting for the ultimate typing experience."
    },
    {
        id: 9,
        name: "UltraWide Monitor 34\"",
        category: "Monitors",
        price: 699,
        image: "https://image.pollinations.ai/prompt/curved%20ultrawide%20monitor%20gaming%20setup?nologo=true",
        description: "Boost productivity and immersion with a curved 144Hz IPS display."
    },
    {
        id: 10,
        name: "Smart Home Hub",
        category: "Smart Home",
        price: 129,
        image: "https://image.pollinations.ai/prompt/smart%20home%20hub%20device%20minimalist?nologo=true",
        description: "Control all your devices from one central hub with voice activation."
    },
    {
        id: 11,
        name: "Gaming Mouse Elite",
        category: "Accessories",
        price: 89,
        image: "https://image.pollinations.ai/prompt/gaming%20mouse%20rgb%20wireless%20close%20up?nologo=true",
        description: "Precision sensor with 20,000 DPI and lightweight design for esports."
    },
    {
        id: 12,
        name: "Tablet Pro 12.9",
        category: "Tablets",
        price: 1099,
        image: "https://image.pollinations.ai/prompt/tablet%20with%20stylus%20digital%20art%20screen?nologo=true",
        description: "Your next computer is not a computer. It's a magical sheet of glass."
    },
    {
        id: 13,
        name: "Bluetooth Speaker Boom",
        category: "Audio",
        price: 199,
        image: "https://image.pollinations.ai/prompt/portable%20bluetooth%20speaker%20waterproof%20outdoor?nologo=true",
        description: "360-degree sound with waterproof design for any adventure."
    },
    {
        id: 14,
        name: "Action Cam X",
        category: "Cameras",
        price: 399,
        image: "https://image.pollinations.ai/prompt/action%20camera%20rugged%20sport%20edition?nologo=true",
        description: "Rugged and waterproof camera for extreme sports and vlogging."
    },
    {
        id: 15,
        name: "Console 5",
        category: "Gaming",
        price: 499,
        image: "https://image.pollinations.ai/prompt/next%20gen%20gaming%20console%20controller%20dark?nologo=true",
        description: "Next-gen gaming with ray tracing and ultra-fast SSD storage."
    },
    {
        id: 16,
        name: "Noise Cancelling Earbuds",
        category: "Audio",
        price: 249,
        image: "https://image.pollinations.ai/prompt/wireless%20earbuds%20charging%20case%20premium?nologo=true",
        description: "Immersive sound in a tiny package. Active noise cancellation included."
    },
    {
        id: 17,
        name: "Smart Thermostat",
        category: "Smart Home",
        price: 199,
        image: "https://image.pollinations.ai/prompt/smart%20thermostat%20digital%20wall%20display?nologo=true",
        description: "Save energy and stay comfortable with intelligent temperature control."
    },
    {
        id: 18,
        name: "Wireless Charger Pad",
        category: "Accessories",
        price: 49,
        image: "https://image.pollinations.ai/prompt/wireless%20charging%20pad%20phone%20desk?nologo=true",
        description: "Fast wire-free charging for all your Qi-enabled devices."
    },
    {
        id: 19,
        name: "Creator Laptop Studio",
        category: "Laptops",
        price: 2199,
        image: "https://image.pollinations.ai/prompt/laptop%20studio%20mode%20digital%20pen?nologo=true",
        description: "Designed for digital artists with a stunning color-accurate touchscreen."
    },
    {
        id: 20,
        name: "Foldable Phone Z",
        category: "Phones",
        price: 1799,
        image: "https://image.pollinations.ai/prompt/foldable%20smartphone%20open%20screen%20technology?nologo=true",
        description: "The future in your pocket. Unfold an immense screen for multitasking."
    },
    {
        id: 21,
        name: "HP Omen 16",
        category: "Laptops",
        price: 1699,
        image: "https://image.pollinations.ai/prompt/hp%20omen%20gaming%20laptop%20rgb%20keyboard%20black?nologo=true",
        description: "Powered by OMEN Tempest Cooling technology, preventing overheating even when your game heats up."
    },
    {
        id: 22,
        name: "Asus TUF Gaming F15",
        category: "Laptops",
        price: 1199,
        image: "images/asus_tuf_f15.jpg",
        description: "Geared for serious gaming and real-world durability, fully loaded for victory."
    },
    {
        id: 23,
        name: "iPhone 17 Pro Max",
        category: "Phones",
        price: 1599,
        image: "images/iphone17_pro_max.jpg",
        description: "Example of future technology. The most advanced iPhone ever created (Concept)."
    },
    {
        id: 24,
        name: "Keychron K2 Pro",
        category: "Accessories",
        price: 119,
        image: "https://image.pollinations.ai/prompt/mechanical%20keyboard%20keychron%20custom%20setup?nologo=true",
        description: "Wireless custom mechanical keyboard with QMK/VIA support."
    },
    {
        id: 25,
        name: "Samsung Odyssey Neo G9",
        category: "Monitors",
        price: 2199,
        image: "https://image.pollinations.ai/prompt/samsung%20odyssey%20neo%20g9%20ultrawide%20monitor?nologo=true",
        description: "Immerse yourself in the game with a 1000R curved screen and Quantum Mini-LED."
    },
    {
        id: 26,
        name: "Bose QuietComfort Ultra",
        category: "Audio",
        price: 429,
        image: "https://image.pollinations.ai/prompt/bose%20headphones%20premium%20noise%20cancelling?nologo=true",
        description: "World-class noise cancellation, quieter than ever before."
    }
];

const categories = [
    { name: "Laptops", icon: "fa-laptop" },
    { name: "Phones", icon: "fa-mobile-alt" },
    { name: "Audio", icon: "fa-headphones" },
    { name: "Gaming", icon: "fa-gamepad" },
    { name: "Cameras", icon: "fa-camera" },
    { name: "Drones", icon: "fa-plane" },
    { name: "Smart Home", icon: "fa-home" },
    { name: "Accessories", icon: "fa-keyboard" }
];
