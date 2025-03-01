// utils/mockProducts.js
export const generateMockProducts = (count) => {
  const arabicNames = ["شاي أخضر", "قهوة عربية", "زعتر", "كركم"];
  const englishNames = ["Green Tea", "Arabic Coffee", "Thyme", "Turmeric"];
  const arabicDescriptions = [
    "وصف عربي للشاي الأخضر",
    "وصف عربي للقهوة العربية",
    "وصف عربي للزعتر",
    "وصف عربي للكركم",
  ];
  const englishDescriptions = [
    "Description for Green Tea",
    "Description for Arabic Coffee",
    "Description for Thyme",
    "Description for Turmeric",
  ];
  const categories = [1, 2, 3, 4]; // Example category IDs
  const covers = [
    "https://picsum.photos/300/200?random=1",
    "https://picsum.photos/300/200?random=2",
    "https://picsum.photos/300/200?random=3",
    "https://picsum.photos/300/200?random=4",
  ];

  return Array.from({ length: count }, (_, index) => ({
    productId: 9,
    arabicName: arabicNames[Math.floor(Math.random() * arabicNames.length)],
    englishName: englishNames[Math.floor(Math.random() * englishNames.length)],
    arabicDescription:
      arabicDescriptions[Math.floor(Math.random() * arabicDescriptions.length)],
    englishDescription:
      englishDescriptions[
        Math.floor(Math.random() * englishDescriptions.length)
      ],
    categoryId: categories[Math.floor(Math.random() * categories.length)],
    minPrice: Math.floor(Math.random() * 100000) + 10000, // Random price between 10,000 and 110,000
    covers: [covers[Math.floor(Math.random() * covers.length)]],
  }));
};
