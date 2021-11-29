import React from "react";
import './TicketDetails.css'

const TicketDetails = (props) => {
    const {ticket} = props.history.location.state;
    var options = {year: 'numeric', month: 'long', day: 'numeric' };


    return (
        <div className='details-container'>
            <div className='details-row'>
                <div className="details-key"> Subject :</div>
                <div className="details-value"> {ticket.subject} </div>
            </div>
            <div className='details-row'>
                <div className="details-key"> Id :</div>
                <div className="details-value"> {ticket.id} </div>
            </div>
            <div className='details-row'>
                <div className="details-key"> Created Time :</div>
                <div className="details-value"> {new Date(ticket.created_at).toLocaleDateString('en-US', options)} </div>
            </div>
            <div className='details-row'>
                <div className="details-key"> Last Updated Time :</div>
                <div className="details-value"> {new Date(ticket.updated_at).toLocaleDateString('en-US', options)} </div>
            </div>
            <div className='details-row'>
                <div className="details-key"> Description :</div>
                <div className="details-value"> {ticket.description} </div>
            </div>

            <div className='details-row'>
                <div className="details-key"> status :</div>
                <div className="details-value"> {ticket.status} </div>
            </div>

        </div>
    );
};

export default TicketDetails;