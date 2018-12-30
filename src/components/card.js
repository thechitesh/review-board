
import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, CardText} from 'reactstrap';

const FeedbackCard = (props) => {
    return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
            <CardText></CardText>
        </Card>
);    
}

export default FeedbackCard;