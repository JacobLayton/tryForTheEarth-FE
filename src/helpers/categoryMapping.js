export function findCategoryNumber (category) {
    const categoryMap = {
        product_reviews: 1,
        lifestyle: 2,
        for_the_home: 3,
        minimalism: 4,
        general: 5
    }
    return categoryMap[category];
}