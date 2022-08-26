import parse from 'html-react-parser';
import { useState } from 'react';

import { 
    ProductDescriptionContainer, 
    Info, 
    Subheading } from './product-description.styles';

const ProductDescription = ({ description, material, price }) => {
    
    //  Create bools showDetails and showMaterials which indicate if text should render
    const [showDetails, setShowDetails] = useState(false);
    const [showMaterials, setShowMaterials] = useState(false);

    // Functions to toggle showDetails and showMaterials, called when user clicks on subheading
    const toggleShowDetails = () => (setShowDetails(!showDetails));
    const toggleShowMaterials = () => (setShowMaterials(!showMaterials));

    return (
        <ProductDescriptionContainer>
            <h3>{`$${price}`}</h3>

            <Info onClick={toggleShowDetails}>
                <Subheading>
                    <h4>Details:</h4>
                    { showDetails? (<span>&#8722;</span>) : (<span>&#43;</span>) } 
                </Subheading>            
                { showDetails && (description? parse(description) : "description")}
            </Info>

            <Info onClick={toggleShowMaterials}>
                <Subheading>
                    <h4>Material and Care:</h4>
                    { showMaterials? (<span>&#8722;</span>) : (<span>&#43;</span>) } 
                </Subheading>   

                { showMaterials && (material? parse(material) : "material")}
            </Info>
        </ProductDescriptionContainer>
    );
};

export default ProductDescription;