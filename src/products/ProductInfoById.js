import {useResource} from '../hooks/useResource';

export const ProductInfoById = ({ productId }) => {
    const product = useResource(`/products/${productId}`);
    const { name, price, description, rating } = product || {};

    return product ? (
        <>
            <h3>{name}</h3>
            <p>{price}</p>
            <h3>Description:</h3>
            <p>{description}</p>
            <p>Average rating: {rating}</p>
        </>
    ) : <p>Loading...</p>;
}
