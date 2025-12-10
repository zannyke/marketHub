export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    oldPrice: number;
    rating: number;
    reviews: number;
    image: string;
    tag?: string;
    tagColor?: string;
    seller: string;
}

const CATEGORIES = ["Electronics", "Fashion", "Home", "Beauty", "Gaming"];

const CATEGORY_IMAGES: Record<string, string[]> = {
    Electronics: ["/products/headphones.png", "/products/watch.png", "/products/drone.png", "/products/speaker.png"],
    Fashion: ["/products/sunglasses.png", "/products/bag.png", "/products/backpack.png", "/products/fast_food.png"], // Sneakers are fast_food.png
    Home: ["/products/coffee.png", "/products/vase.png"],
    Beauty: ["/products/skincare.png"],
    Gaming: ["/products/mouse.png", "/products/headphones.png"],
};

const TITLES = [
    "Premium Wireless Headphones", "Minimalist Smart Watch", "Designer Sunglasses", "Luxury Leather Bag",
    "Pro Gaming Mouse", "Espresso Master Machine", "Rejuvenating Skincare Set", "Urban Waterproof Backpack",
    "Limited Edition Sneakers", "4K Ultra Drone", "Mechanical Keyboard", "Yoga Mat Pro",
    "Organic Green Tea", "Running Shoes", "Smartphone Gimbal", "Smart Home Hub",
    "Noise Cancelling Earbuds", "Vintage Denim Jacket", "Ceramic Vase", "Bluetooth Speaker"
];

const SELLERS = [
    "TechNova", "UrbanStyle", "HomeLux", "GameZone", "PureBeauty",
    "GadgetWorld", "FashionHub", "DecorDreams", "EliteTech", "TrendSetters"
];

const TAGS = [
    { label: "Sale", color: "bg-indigo-500" },
    { label: "Hot", color: "bg-orange-500" },
    { label: "New", color: "bg-purple-500" },
    { label: "Best Seller", color: "bg-amber-500" },
    { label: "Limited", color: "bg-red-500" },
    undefined, undefined, undefined, undefined // Higher chance of no tag
];

const TITLES_BY_CATEGORY: Record<string, string[]> = {
    Electronics: ["Premium Wireless Headphones", "Minimalist Smart Watch", "4K Ultra Drone", "Bluetooth Speaker", "Pro Gaming Mouse", "Mechanical Keyboard", "Noise Cancelling Earbuds", "Smartphone Gimbal", "Smart Home Hub"],
    Fashion: ["Designer Sunglasses", "Luxury Leather Bag", "Urban Waterproof Backpack", "Limited Edition Sneakers", "Vintage Denim Jacket", "Running Shoes", "Summer Hat", "Silk Scarf"],
    Home: ["Espresso Master Machine", "Ceramic Vase", "Organic Green Tea", "Smart Coffee Maker", "Cotton Bed Sheets", "Minimalist Lamp", "Succulent Pot Set"],
    Beauty: ["Rejuvenating Skincare Set", "Anti-Aging Cream", "Organic Face Wash", "Vitamin C Serum", "Hair Care Bundle"],
    Gaming: ["Pro Gaming Mouse", "Mechanical Keyboard", "Gaming Headset", "RGB Mousepad", "Console Controller"]
};

export const generateProducts = (count: number): Product[] => {
    return Array.from({ length: count }, (_, i) => {
        const categoryKeys = Object.keys(CATEGORY_IMAGES);
        const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

        // Get consistent image
        const catImages = CATEGORY_IMAGES[category] || ["/products/headphones.png"];
        const image = catImages[Math.floor(Math.random() * catImages.length)];

        // Get consistent title
        const catTitles = TITLES_BY_CATEGORY[category] || TITLES;
        const baseTitle = catTitles[Math.floor(Math.random() * catTitles.length)];

        const tagObj = TAGS[Math.floor(Math.random() * TAGS.length)];
        const seller = SELLERS[Math.floor(Math.random() * SELLERS.length)];

        // Random price between 20 and 1000
        const price = Math.floor(Math.random() * 980) + 20;

        return {
            id: i + 1,
            title: `${baseTitle}`, // Cleaner title
            category,
            price: price + 0.99,
            oldPrice: price + Math.floor(Math.random() * 50) + 10 + 0.99,
            rating: parseFloat((3 + Math.random() * 2).toFixed(1)), // 3.0 to 5.0
            reviews: Math.floor(Math.random() * 500),
            image,
            tag: tagObj?.label,
            tagColor: tagObj?.color,
            seller
        };
    });
};
