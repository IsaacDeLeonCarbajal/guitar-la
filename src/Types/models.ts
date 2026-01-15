export type Cart = Record<
    Item['id'],
    Item & {
        quantity: number;
    }>

export type Item = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}
