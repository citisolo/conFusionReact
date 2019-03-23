import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,  Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderDish = ({dish}) => {
  if(dish == null){
    return (<div></div>);
  }

  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name}/>
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}

const RenderComments = ({comments}) => {
  //console.log(`comments = ${comments}`);
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

const DishDetail = (props) => {
  let dish = props.dish;
  let comments = props.comments;
  return (
    <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish}/>
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={comments}/>
        </div>
      </div>
    </div>
  )
}


export default DishDetail;
