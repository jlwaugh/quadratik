import React, { Component } from 'react';
import Poll from './Poll'
import { Button,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const list = [
    {
      id: 1,
      name: 'Joe Biden',
      votes: 0
    },
    {
      id: 2,
      name: 'Elizabeth Warren',
      votes: 0
    },
    {
      id: 3,
      name: 'Bernie Sanders',
      votes: 0
    },
    {
      id: 4,
      name: 'Kamala Harris',
      votes: 0
    },
    {
      id: 5,
      name: 'Pete Buttigieg',
      votes: 0
    },
    {
      id: 6,
      name: 'Cory Booker',
      votes: 0
    },
    {
      id: 7,
      name: 'Andrew Yang',
      votes: 0
    },
    {
      id: 8,
      name: 'Beto O\'Rourke',
      votes: 0
    },
    {
      id: 9,
      name: 'Julián Castro',
      votes: 0
    },
    {
      id: 10,
      name: 'Amy Klobuchar',
      votes: 0
    },
    {
      id: 11,
      name: 'Tulsi Gabbard',
      votes: 0
    },
    {
      id: 12,
      name: 'Marianne Williamson',
      votes: 0
    }
    /*{
      id: 13,
      name: 'Steve Bullock',
      votes: 0
    },
    {
      id: 14,
      name: 'Tom Steyer',
      votes: 0
    },
    {
      id: 15,
      name: 'Tim Ryan',
      votes: 0
    },
    {
      id: 16,
      name: 'Michael Bennet',
      votes: 0
    },
    {
      id: 17,
      name: 'John Delaney',
      votes: 0
    },
    {
      id: 18,
      name: 'Bill de Blasio',
      votes: 0
    },
    {
      id: 19,
      name: 'Joe Sestak',
      votes: 0
    },
    {
      id: 20,
      name: 'Wayne Messam',
      votes: 0
    }, */
]

class Ballot extends Component {
    state = {
        members: []
    };
    
    componentDidMount() {
        this.setState({ members: list });
    }
    
    handleEvent = memberId => {
        const updatedList = this.state.members.map(member => {
        if (member.id === memberId) {
            return Object.assign({}, member, {
            votes: member.votes + 1
            });
        } else {
            return member;
        }
    });

    this.setState({
      members: updatedList
    });
  };

  render() {
    return this.state.members.map(member => (
      <InputGroup alignment="center">
        <InputGroupAddon addonType="prepend">
          <Poll key={member.id} id={member.id} name={member.name} votes={member.votes} onVote={this.handleEvent} />
        </InputGroupAddon>
      </InputGroup>
    ))
  }
}

export default Ballot;