import React from 'react';
import {EventIndexItem} from './event_index_item';
import { isEmpty } from 'lodash';

class EventIndex extends React.Component {
  constructor(props){
    super(props);
    this.alreadyOnSearchPage = false;
    // debugger
    this.state = this.props.query
  }

  componentDidMount(){
    if (this.props.query.name === '' && this.props.searchIndex === false){
      debugger
      this.props.fetchEvents(
        {
          name: '',
        }
      ).then(this.props.fetchCategories())
    } else if (this.props.searchIndex & this.props.ownProps.history.action === 'PUSH'){
      debugger
      this.props.fetchEvents(
        {
          name: this.props.query.name,
        }
      ).then(this.props.fetchCategories())
    } else if (this.props.searchIndex){
      debugger
      this.props.fetchEvents(
        {
          name: this.props.query.name,
        }
      ).then(this.props.fetchCategories())
    }
  }

  componentWillReceiveProps(newProps){
    debugger
    if (this.props.searchIndex && this.props.query.name !== newProps.query.name) {

      debugger
      this.props.fetchEvents({
        name: newProps.query.name
      }).then(this.props.fetchCategories())
    }
  }



  findCategoryName(event, categories){
    let categoryId = event.category_id;
    let cat = this.props.categories[categoryId].name
    return cat
  }


  render(){
    let events;
    let eventIndex;
    if (!(isEmpty(this.props.categories))) {
      events = this.props.events.map((event) => {
      let category = this.findCategoryName(event, this.props.categories)
      debugger
      return <EventIndexItem key={event.id} event={event} category={ category }
                deleteSave={this.props.deleteSave} createSave={this.props.createSave}
                currentUser={this.props.currentUser} searchIndex={this.props.searchIndex}
                fetchEvents={this.props.fetchEvents} ownProps={this.props} receiveQuery={this.props.receiveQuery}/>
      })
    }

    if (this.props.searchIndex){
      eventIndex = (
        <div className='event-meta-container-search'>
          <div className='event-index-container-search'>
            <ul className='event-list-search'>
              {events}
            </ul>
          </div>
        </div>
      )
    } else {
      eventIndex = (<div className='event-meta-container'>
        <div className='event-index-container'>
          <ul className='event-list'>
            {events}
          </ul>
        </div>
      </div>
      )
    }
    return (
      eventIndex
    )
  }
}

// <div className='event-meta-container'>
//   <div className='event-index-container'>
//     <ul className='event-list'>
//       {events}
//     </ul>
//   </div>
// </div>

export default EventIndex;
