import parse from 'html-react-parser';

import { ProductDescriptionContainer } from './product-description.styles';

const ProductDescription = ({ description, material }) => {

    // var htmlObject = document.createElement('div');
    // htmlObject.innerHTML = description;

    // return (
    //     <h2>{description}</h2>
    // );

    return (
        <ProductDescriptionContainer>
            {parse(description)}
            <br />
            <br />
            <p>Material and Care:</p>
            {parse(material)}
        </ProductDescriptionContainer>
    )

};

export default ProductDescription;