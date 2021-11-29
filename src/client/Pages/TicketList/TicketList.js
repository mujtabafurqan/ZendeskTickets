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
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
         api.getTicketList()
            .then(res => {
                console.log(res);
                setTickets(res.data.tickets);
                getActiveTickets(1, res.data.tickets);
            })
            .catch(err => {
                setError(err);
                setIsError(true);
            }
            );
    }, []);

    const getActiveTickets = (pageNumber, tickets) => {
        setCurrPage(pageNumber);
        var activeTickets = [];
        for(var i = (pageNumber-1) * 25; i < (pageNumber) * 25; i++) {
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
                {!isError && <div className="ticketList">
                    <div>
                        You are viewing {activeTickets.length} of {tickets.length} tickets.
                    </div>
                    <MyPagination totPages={Math.ceil(tickets.length/25)} currentPage={currPage} pageClicked={(ele) => getActiveTickets(ele,tickets)}>
                        <ListGroup as="ol">
                            {activeTickets.map(ticket => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    onClick={() => showTicket(ticket)}
                                    key={ticket.id}
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
                }
                {isError && <div className="error">
                    <h1>oh no! something went wrong :(</h1>
                    <p>{error.message}</p>
                </div>}
            </div>
        </>
    )
}

export default TicketList
