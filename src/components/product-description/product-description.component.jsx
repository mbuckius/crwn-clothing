import parse from 'html-react-parser';
import { useState } from 'react';

import { 
    ProductDescriptionContainer, 
    Info, 
    Subheading,
    Details
 } from './product-description.styles';

const ProductDescription = ({ description, material }) => {
    
    //  Create bools showDetails and showMaterials which indicate if text should render
    const [showDetails, setShowDetails] = useState(false);
    const [showMaterials, setShowMaterials] = useState(false);

    // Functions to toggle showDetails and showMaterials, called when user clicks on subheading
    const toggleShowDetails = () => (setShowDetails(!showDetails));
    const toggleShowMaterials = () => (setShowMaterials(!showMaterials));

    return (
        <ProductDescriptionContainer>

            <Info onClick={toggleShowDetails}>
                <Subheading>
                    <h4>Details:</h4>
                    {/* Show a plus or minus sign depending on showDetails */}
                    { showDetails? (<span>&#8722;</span>) : (<span>&#43;</span>) } 
                </Subheading>           
                { showDetails && <Details> {parse(description)} </Details> }
            </Info>

            <Info onClick={toggleShowMaterials}>
                <Subheading>
                    <h4>Material and Care:</h4>
                    { showMaterials? (<span>&#8722;</span>) : (<span>&#43;</span>) } 
                </Subheading>   
                { showMaterials && parse(material) }
            </Info>
        </ProductDescriptionContainer>
    );
};

export default ProductDescription;