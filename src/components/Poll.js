import React, { Component } from 'react';
import { Card, Container, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';

class Proposal extends Component {
    handleClick = () => this.props.onVote(this.props.id);
  
    render() {
      return (
        <div className="App">
          <Container>
            <Card>
              <CardBody>
                <CardTitle>{this.props.name}</CardTitle>
                <CardText><Badge color="primary"><h5>{this.props.votes}</h5></Badge></CardText>
                <button className="btn pt-auto btn-secondary float-left" onClick={this.handleClick}>VOTE</button>
              </CardBody>
            </Card>
          </Container>
        </div>
      );
    }
  }

export default Proposal;