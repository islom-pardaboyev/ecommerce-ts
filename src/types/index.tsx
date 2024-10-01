export type ProductTypes = {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    brand: string,
    reviews: ReviewsType[]
    images: string[]
}

export type ReviewsType = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}