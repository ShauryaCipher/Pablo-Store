import { Product } from "./store";

const rawData = [
    "p1:IMG-20251230-WA0408.jpg,IMG-20251230-WA0491.jpg,IMG-20251230-WA0494.jpg,IMG-20251230-WA0495.jpg",
    "p10:IMG-20251230-WA0453.jpg,IMG-20251230-WA0454.jpg,IMG-20251230-WA0460.jpg",
    "p11:IMG-20251230-WA0413.jpg,IMG-20251230-WA0443.jpg,IMG-20251230-WA0452.jpg,IMG-20251230-WA0456.jpg",
    "p12:IMG-20251230-WA0445.jpg,IMG-20251230-WA0446.jpg,IMG-20251230-WA0447.jpg,IMG-20251230-WA0448.jpg",
    "p13:IMG-20251230-WA0424.jpg,IMG-20251230-WA0425.jpg,IMG-20251230-WA0426.jpg,IMG-20251230-WA0464.jpg",
    "p14:IMG-20251230-WA0411.jpg,IMG-20251230-WA0487.jpg,IMG-20251230-WA0492.jpg,IMG-20251230-WA0496.jpg",
    "p15:IMG-20251230-WA0407.jpg,IMG-20251230-WA0488.jpg,IMG-20251230-WA0489.jpg,IMG-20251230-WA0493.jpg",
    "p16:IMG-20251230-WA0479.jpg,IMG-20251230-WA0480.jpg,IMG-20251230-WA0481.jpg,IMG-20251230-WA0482.jpg",
    "p17:IMG-20251230-WA0431.jpg,IMG-20251230-WA0432.jpg,IMG-20251230-WA0433.jpg",
    "p18:IMG-20251230-WA0438.jpg,IMG-20251230-WA0439.jpg,IMG-20251230-WA0440.jpg",
    "p19:IMG-20251230-WA0434.jpg,IMG-20251230-WA0435.jpg,IMG-20251230-WA0436.jpg,IMG-20251230-WA0437.jpg",
    "p2:IMG-20251230-WA0483.jpg,IMG-20251230-WA0484.jpg,IMG-20251230-WA0485.jpg,IMG-20251230-WA0486.jpg",
    "p20:IMG-20251230-WA0414.jpg,IMG-20251230-WA0415.jpg,IMG-20251230-WA0416.jpg",
    "p21:IMG-20251230-WA0458.jpg,IMG-20251230-WA0459.jpg",
    "p22:IMG-20251230-WA0362.jpg,IMG-20251230-WA0364.jpg,IMG-20251230-WA0427.jpg,IMG-20251230-WA0428.jpg",
    "p23:IMG-20251230-WA0392.jpg,IMG-20251230-WA0393.jpg,IMG-20251230-WA0406.jpg,IMG-20251230-WA0457.jpg",
    "p24:IMG-20251230-WA0396.jpg,IMG-20251230-WA0397.jpg,IMG-20251230-WA0398.jpg,IMG-20251230-WA0399.jpg",
    "p25:IMG-20251230-WA0394.jpg,IMG-20251230-WA0404.jpg,IMG-20251230-WA0405.jpg",
    "p26:IMG-20251230-WA0369.jpg,IMG-20251230-WA0419.jpg,IMG-20251230-WA0420.jpg",
    "p27:IMG-20251230-WA0395.jpg,IMG-20251230-WA0400.jpg,IMG-20251230-WA0401.jpg,IMG-20251230-WA0402.jpg",
    "p28:IMG-20251230-WA0377.jpg,IMG-20251230-WA0378.jpg,IMG-20251230-WA0379.jpg,IMG-20251230-WA0380.jpg",
    "p29:IMG-20251230-WA0373.jpg,IMG-20251230-WA0384.jpg,IMG-20251230-WA0385.jpg",
    "p3:IMG-20251230-WA0475.jpg,IMG-20251230-WA0476.jpg,IMG-20251230-WA0477.jpg,IMG-20251230-WA0478.jpg",
    "p30:IMG-20251230-WA0083.jpg,IMG-20251230-WA0085.jpg,IMG-20251230-WA0086.jpg,IMG-20251230-WA0087.jpg",
    "p31:IMG-20251230-WA0088.jpg,IMG-20251230-WA0089.jpg,IMG-20251230-WA0090.jpg,IMG-20251230-WA0091.jpg,IMG-20251230-WA0092.jpg",
    "p32:IMG-20251230-WA0093.jpg,IMG-20251230-WA0094.jpg,IMG-20251230-WA0095.jpg,IMG-20251230-WA0240.jpg",
    "p33:IMG-20251230-WA0099.jpg,IMG-20251230-WA0100.jpg,IMG-20251230-WA0101.jpg,IMG-20251230-WA0241.jpg",
    "p34:IMG-20251230-WA0102.jpg,IMG-20251230-WA0103.jpg,IMG-20251230-WA0104.jpg,IMG-20251230-WA0105.jpg",
    "p35:IMG-20251230-WA0096.jpg,IMG-20251230-WA0097.jpg,IMG-20251230-WA0098.jpg",
    "p36:IMG-20251230-WA0082.jpg,IMG-20251230-WA0238.jpg,IMG-20251230-WA0239.jpg",
    "p37:IMG-20251230-WA0371.jpg,IMG-20251230-WA0372.jpg,IMG-20251230-WA0387.jpg",
    "p38:IMG-20251230-WA0140.jpg,IMG-20251230-WA0154.jpg,IMG-20251230-WA0155.jpg,IMG-20251230-WA0156.jpg,IMG-20251230-WA0159.jpg",
    "p39:IMG-20251230-WA0182.jpg,IMG-20251230-WA0183.jpg,IMG-20251230-WA0184.jpg,IMG-20251230-WA0185.jpg,IMG-20251230-WA0192.jpg,IMG-20251230-WA0216.jpg",
    "p4:IMG-20251230-WA0409.jpg,IMG-20251230-WA0410.jpg,IMG-20251230-WA0490.jpg,IMG-20251230-WA0497.jpg",
    "p40:IMG-20251230-WA0186.jpg,IMG-20251230-WA0187.jpg,IMG-20251230-WA0188.jpg",
    "p41:IMG-20251230-WA0200.jpg,IMG-20251230-WA0201.jpg,IMG-20251230-WA0202.jpg,IMG-20251230-WA0211.jpg",
    "p42:IMG-20251230-WA0106.jpg,IMG-20251230-WA0107.jpg,IMG-20251230-WA0108.jpg,IMG-20251230-WA0109.jpg,IMG-20251230-WA0110.jpg,IMG-20251230-WA0111.jpg,IMG-20251230-WA0112.jpg,IMG-20251230-WA0113.jpg,IMG-20251230-WA0114.jpg,IMG-20251230-WA0115.jpg,IMG-20251230-WA0116.jpg,IMG-20251230-WA0117.jpg,IMG-20251230-WA0118.jpg,IMG-20251230-WA0119.jpg,IMG-20251230-WA0120.jpg,IMG-20251230-WA0121.jpg,IMG-20251230-WA0122.jpg,IMG-20251230-WA0123.jpg,IMG-20251230-WA0124.jpg,IMG-20251230-WA0125.jpg,IMG-20251230-WA0126.jpg,IMG-20251230-WA0127.jpg,IMG-20251230-WA0128.jpg,IMG-20251230-WA0327.jpg,IMG-20251230-WA0328.jpg,IMG-20251230-WA0329.jpg,IMG-20251230-WA0330.jpg,IMG-20251230-WA0331.jpg,IMG-20251230-WA0332.jpg,IMG-20251230-WA0333.jpg,IMG-20251230-WA0334.jpg,IMG-20251230-WA0335.jpg,IMG-20251230-WA0336.jpg,IMG-20251230-WA0337.jpg,IMG-20251230-WA0338.jpg,IMG-20251230-WA0339.jpg,IMG-20251230-WA0340.jpg,IMG-20251230-WA0341.jpg,IMG-20251230-WA0342.jpg,IMG-20251230-WA0343.jpg,IMG-20251230-WA0344.jpg,IMG-20251230-WA0345.jpg,IMG-20251230-WA0346.jpg,IMG-20251230-WA0347.jpg,IMG-20251230-WA0348.jpg,IMG-20251230-WA0349.jpg,IMG-20251230-WA0350.jpg,IMG-20251230-WA0351.jpg,IMG-20251230-WA0352.jpg,IMG-20251230-WA0353.jpg,IMG-20251230-WA0354.jpg",
    "p43:IMG-20251230-WA0141.jpg,IMG-20251230-WA0152.jpg,IMG-20251230-WA0153.jpg,IMG-20251230-WA0157.jpg,IMG-20251230-WA0158.jpg,IMG-20251230-WA0162.jpg,IMG-20251230-WA0163.jpg,IMG-20251230-WA0164.jpg,IMG-20251230-WA0166.jpg,IMG-20251230-WA0167.jpg,IMG-20251230-WA0170.jpg,IMG-20251230-WA0171.jpg,IMG-20251230-WA0174.jpg,IMG-20251230-WA0176.jpg,IMG-20251230-WA0189.jpg,IMG-20251230-WA0194.jpg,IMG-20251230-WA0195.jpg,IMG-20251230-WA0198.jpg,IMG-20251230-WA0203.jpg,IMG-20251230-WA0212.jpg,IMG-20251230-WA0213.jpg",
    "p44:1688_image_share_2f923d29c79f6f01367aef34f3170d56.jpg,1688_image_share_8039b0ece99d768ca7dcb8d41b8868f7.jpg,1688_image_share_ba378fc74960ea37e5d25348303c3d7a.jpg,1688_image_share_c1b12071570d5c0f08e56c903ad4d7c1.jpg,1688_image_share_e5cbbfd8026317628b101f5490b52243.jpg",
    "p45:1767170203796.webp,1767170235189.webp,1767170264585.webp,1767170309072.webp",
    "p46:3B5E268B-E445-45C2-8294-49D481CC28F7.webp,9A33CCFB-0CF2-488E-AA04-5323D4C069E2.webp,9C88316D-6347-4234-8657-2417FC13757C.jpg,Image_2024-12-23_at_11.52.38_99a72d41.webp,WhatsApp_Image_2024-11-21_at_19.19.28_17840114.jpg,WhatsApp_Image_2024-11-21_at_19.19.29_5ff603ae.jpg,WhatsApp_Image_2024-11-21_at_19.19.30_aea2fbd1.webp,tb_image_share_1764165660486_jpg.webp,vvic_90188a32784fd6e5b1796a20ab2f0c11.jpg,vvic_c5ad8557f2b4e9de1a2fe1005e209d3b.jpg,vvic_c841f00fbec38f63ccb801f3a3625c17.jpg",
    "p47:1767169675350.webp,1767169709561.webp,1767170000015.webp,1767170031216.webp,1767170063367.webp,WhatsApp_Image_2025-12-03_at_5.42.35_PM.webp,WhatsApp_Image_2025-12-03_at_5.42.35_PM_1.webp",
    "p48:AF8C413E-C57C-4F83-B784-9B1CE1AE0E1A.webp,B3820777-A845-4310-AB5E-3305B94D318C.webp,C5C46DEF-0CE7-40E6-985D-21345B8A6AFF.webp,IMG-20241210-WA0012.webp,WhatsApp_Image_2024-12-20_at_11.32.48_cc8ae6e1.jpg,img_2_2_ad6947cd-f9a0-405a-9df5-00009b79ed97.webp",
    "p49:1688_image_share_c18c9f0a3eef27c9071e99dee9ff9762.webp,1688_image_share_c18c9f0a3eef27c9071e99dee9ff9762_e6d1d4c8-cec7-4c0c-be43-3c62ad4eda97.webp",
    "p50:1688_image_share_8622f146b53b3547479c5886eaa3511d.webp,1688_image_share_d7cc165328abb59296715dbcbe398921.webp,1767163550886.webp,WhatsApp_Image_2025-12-03_at_5.42.31_PM.jpg,WhatsApp_Image_2025-12-03_at_5.42.31_PM_1.webp",
    "p51:1688_image_share_45c0eb93b50953c9dadd5b0aeaa06b9a.webp,1688_image_share_88f7d7988ca05d34d6f2c2229a1560b7.webp,1688_image_share_92fc084ec77342c0e75d7f592caf524a.webp,1688_image_share_a3d86f69f9ff2a718fc55e9b202af00c.jpg,imge__brown.webp",
    "p52:Luxury_Cashmere_Capes_1.webp,Luxury_Cashmere_Capes_2.jpg,Luxury_Cashmere_Capes_3.webp,Luxury_Cashmere_Capes_4.webp,Luxury_Cashmere_Capes_5.webp",
    "p53:1688_image_share_390013bcb88c999eeb7263098ca8fd69.webp,1688_image_share_3fbc84b4cb11db0e7a51c8d870e521b3.webp,1688_image_share_553d622fe2fa4902d2ef6caf81ced6a6.webp,1688_image_share_bd906c27f0e5b854cf3d68b83591adb9.webp,1688_image_share_dbf5c15dba7a2c86ec82ec0817d34993.webp",
    "p54:1688_image_share_0a0e377fbb5a346f294a6987119c31a7.webp,497929CA-9A39-41FB-BD0A-5ED4A0455D98.webp,B2394BF4-8EBE-4582-AA7E-0DB4982A3764.webp,D7F76F2B-E2C7-4D69-848F-01E62C071D33.webp",
    "p55:file_000000001fbc7206a896d3b3f2034378.webp,file_000000003d247206b064d719a995762b.webp,file_0000000041f8720682a3e4aea912ce03.webp,file_00000000538072069fca1af762f10872.webp",
    "p5:IMG-20251230-WA0468.jpg,IMG-20251230-WA0469.jpg,IMG-20251230-WA0470.jpg,IMG-20251230-WA0471.jpg",
    "p6:IMG-20251230-WA0472.jpg,IMG-20251230-WA0473.jpg,IMG-20251230-WA0474.jpg",
    "p7:IMG-20251230-WA0444.jpg,IMG-20251230-WA0465.jpg,IMG-20251230-WA0466.jpg",
    "p8:IMG-20251230-WA0449.jpg,IMG-20251230-WA0450.jpg,IMG-20251230-WA0451.jpg,IMG-20251230-WA0467.jpg",
    "p9:IMG-20251230-WA0455.jpg,IMG-20251230-WA0461.jpg,IMG-20251230-WA0462.jpg,IMG-20251230-WA0463.jpg",
    "p56:image.png",
    "p57:image.png",
    "p58:image.png",
    "p59:image.png",
    "p60:image.png",
    "p61:image.png",
    "p62:image.png",
    "p63:image.png"
];

const categoriesNames = ['Jackets', 'Sweatshirts', 'Accessories', 'Footwear'];
const productNamesMap: Record<string, string> = {
    "p1": "Retro Purple Windbreaker",
    "p2": "Venom Graphic Hoodie",
    "p3": "One Piece Charcoal Hoodie",
    "p4": "Oversized Black Hoodie",
    "p5": "Pink Circle Graphic Tee",
    "p6": "Ice Blue Windbreaker",
    "p7": "Grey Back-Print Windbreaker",
    "p8": "Yellow Hoodie",
    "p9": "Weekend Plants Oversized Tee",
    "p10": "Cream Wide-Leg Jeans",
    "p11": "Pink DRIP Oversized Sweatshirt",
    "p12": "Charcoal Washed Hoodie",
    "p13": "Blue Mickey Sketch Hoodie",
    "p14": "Black Nostalgia Drip Tee",
    "p15": "Purple Tie-Dye Sweatshirt",
    "p16": "Peanuts Social Club Tee",
    "p17": "Tan Essentials Tee",
    "p18": "Black Back-Print Tee",
    "p19": "Purple Stitch-Detail Tee",
    "p20": "Grey Gradient Tee",
    "p21": "Striped Black Tee",
    "p22": "Lion King Sunset Tee",
    "p23": "Blue Embossed Logo Hoodie",
    "p24": "Iron Man Windbreaker",
    "p25": "Tony Stark Signature Jacket",
    "p26": "Beige '54' Fleece Hoodie",
    "p27": "Superman Zip-Up Hoodie",
    "p28": "Black Panther Tee",
    "p29": "Mode On Puff Print Hoodie",
    "p30": "Marble Swirl Hoodie",
    "p31": "Worst Enemies Best Friends Tee",
    "p32": "Golf Cart Patch Tee",
    "p33": "Sleek Black Puffer",
    "p34": "Tri-Color Windbreaker",
    "p35": "Black Varsity Jacket",
    "p36": "Red Quilted Jacket",
    "p37": "Dark Wash Jeans",
    "p38": "Shearling Collar Flight Jacket",
    "p39": "Denim Jacket with Phone Pocket",
    "p40": "Red Bow Denim Jacket",
    "p41": "Grey Cable-Knit Set",
    "p42": "Lavender Faux Fur Cape",
    "p43": "Navy Textured Knit Sweater",
    "p44": "Cream Zip-Up Hoodie",
    "p45": "Dark Textured Knit Cardigan",
    "p46": "Cream Ribbed Turtleneck",
    "p47": "Plaid Fur-Trim Poncho",
    "p48": "Heart Pattern Sweatshirt",
    "p49": "Burgundy Fur-Collar Cape",
    "p50": "Houndstooth Fur-Collar Coat",
    "p51": "Brown Cardigan Detail",
    "p52": "White Fleece Detail",
    "p53": "Gym Reaper Panda Tee",
    "p54": "Brown Cardigan Outfit",
    "p55": "Purple Mickey Mouse Hoodie",
    "p56": "Brown Winter Parka",
    "p57": "Long Brown Teddy Coat",
    "p58": "Olive Fur-Lined Parka",
    "p59": "Blue Puffer Jacket",
    "p60": "Black Mickey Hoodie",
    "p61": "Wollen Shrug",
    "p62": "Classic Pufferjacket"
};

export const products: Product[] = rawData.map((line) => {
    const parts = line.split(':');
    const dirName = parts[0];
    const files = parts[1].split(',');

    // Improved category logic based on descriptive names
    const name = productNamesMap[dirName] || "Premium Winter Style";
    const lowerName = name.toLowerCase();

    let category = "Sweatshirts";
    if (lowerName.includes("jacket") || lowerName.includes("windbreaker") || lowerName.includes("puffer") || lowerName.includes("varsity") || lowerName.includes("coat") || lowerName.includes("parka") || lowerName.includes("cape") || lowerName.includes("poncho")) {
        category = "Jackets";
    } else if (lowerName.includes("jeans") || lowerName.includes("pants") || (lowerName.includes("denim") && !lowerName.includes("jacket"))) {
        category = "Jeans";
    } else if (lowerName.includes("hoodie") || lowerName.includes("sweatshirt") || lowerName.includes("tee") || lowerName.includes("sweater") || lowerName.includes("cardigan") || lowerName.includes("knit")) {
        category = "Sweatshirts";
    }

    const priceMap: Record<string, number> = {
        'Sweatshirts': 799,
        'Jackets': 899,
        'Jeans': 799
    };
    const price = priceMap[category] || 799;

    return {
        id: dirName,
        name: name,
        price: price,
        originalPrice: price + 500,
        image: "/products/" + dirName + "/" + files[0],
        images: files.map(f => "/products/" + dirName + "/" + f),
        category,
        description: "Experience ultimate warmth and style with our " + name + ". Crafted for the modern winter enthusiast.",
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Neutral', 'Dark', 'Earth'],
        inStock: true,
    };
});

export const categories = ['All', 'Jackets', 'Sweatshirts', 'Jeans'];
