import React from 'react';
import {  Card, CardImg, CardText, CardBody,
  CardTitle, Button,  Breadcrumb,
  BreadcrumbItem, Modal, ModalHeader, ModalBody, Form,
  FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values){
    const vals = JSON.stringify(values);
    console.log(vals);

    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    this.toggleModal();
  }

  render(){
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <div className="container">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>Rating</Label>
                    <Col md={12}>
                    <Control.select
                            className="form-control"
                            model=".rating"
                            id="rating"
                            validators={{
                                required
                            }}
                            >
                      <option selected value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Control.select>
                    <Errors
                        className="text-danger"
                        model=".rating"
                        show="touched"
                        messages={{
                            required: 'You must select a rating'
                        }}
                     />
                    </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="author" md={12}>Your Name</Label>
                      <Col md={12}>
                          <Control.text model=".author" id="author" name="author"
                              placeholder="Your Name"
                              className="form-control"
                              validators={{
                                  required, minLength: minLength(3), maxLength: maxLength(15)
                              }}
                               />
                          <Errors
                              className="text-danger"
                              model=".author"
                              show="touched"
                              messages={{
                                  required: 'Required',
                                  minLength: 'Must be greater than 3 characters',
                                  maxLength: 'Must be 15 characters or less'
                              }}
                           />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="comment" md={12}>Comment</Label>
                      <Col md={12}>
                          <Control.textarea rows={6} model=".comment" id="author" name="author"
                              placeholder=""
                              className="form-control"
                               />
                      </Col>
                  </Row>
                  <Row className="form-group">
                    <Col>
                     <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Col>
                  </Row>
                </LocalForm>
              </div>
            </ModalBody>
        </Modal>
        <Button  outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg" ></span> Submit Comment</Button>
      </div>
    )
  }
}

const RenderDish = ({dish}) => {
  if(dish == null){
    return (<div></div>);
  }

  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}

const RenderComments = ({dishId, addComment, comments}) => {
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
      <CommentForm dishId={dishId} addComment={addComment}/>
    </div>
  )
 }

const DishDetail = (props) => {
  // let dish = props.dish;
  // let comments = props.comments;
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
              <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
            </div>
          </div>
        </div>
      );

    } else {
      return (<div></div>);
    }

}


export default DishDetail;
