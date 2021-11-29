import React, { useEffect, useState } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import MyPagination from '../../Helpers/MyPagination';
import Api from '../../Helpers/api';
import './TicketList.css';

const TicketList = props => {
    const api = new Api();
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    
    const [tickets, setTickets] = useState([]);
    const [activeTickets, setActiveTickets] = useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    
    useEffect(() => {
         api.getTicketList()
            .then(res => {
                console.log(res);
                setTickets(res.data.tickets);
                getActiveTickets(1, res.data.tickets);
            })
            .catch(err => 
                console.log(err)
            );
    }, []);

    const getActiveTickets = (pageNumber, tickets) => {
        setCurrPage(pageNumber);
        var activeTickets = [];
        for(var i = (pageNumber-1); i < (pageNumber); i++) {
            activeTickets.push(tickets[i]);
        }
        setActiveTickets(activeTickets);
    }
    const showTicket = (ticket) => {
        props.history.push({
            pathname: '/details',
            state: {
              ticket,
            },
          });
    }
    return (
        <>
            <div className="container">
                <div className="ticketList">
                <MyPagination totPages={tickets.length} currentPage={currPage} pageClicked={(ele) => getActiveTickets(ele,tickets)}>
                        <ListGroup as="ol" numbered>
                            {activeTickets.map(ticket => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    onClick={() => showTicket(ticket)}
                                >
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">{ticket.subject}</div>
                                    Last Updated : {new Date(ticket.created_at).toLocaleDateString('en-US', options)}
                                    </div>
                                    <Badge variant="primary" pill>
                                    {ticket.status}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </MyPagination>
                </div>
            </div>
        </>
    )
}

export default TicketList
