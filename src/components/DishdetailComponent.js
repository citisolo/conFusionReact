import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props){
    super(props);
  }

  renderDish(dish){
    if(dish == null){
      return (<div></div>);
    }

    return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(dish.comments)}
        </div>
      </div>
    </div>
    )
  }

  renderComments(comments){
    if(comments == null){
      return (<div></div>);
    }

    let commentList = comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.author}, {new Intl.DateTimeFormat('en-UK', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
          </div>
        )
    });

    return (
      <div>
        <h4> Comments </h4>
        {commentList}
      </div>
    )
  }

  render(){

    return (
      <div>
        {this.renderDish(this.props.dish)}
      </div>
    )
  }
}

export default DishDetail;
