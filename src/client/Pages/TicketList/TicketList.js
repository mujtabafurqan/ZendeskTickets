import React, { useEffect, useState } from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import Api from '../../Helpers/api';
import './TicketList.css';

const TicketList = props => {
    const api = new Api();
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [response, setResponse] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrevious, setHasPrevious] = useState(false);
    
    useEffect(() => {
        getTotalTicketCount();
         api.getTicketList()
            .then(res => {
                console.log(res);
                setTickets(res.data.tickets);
                setResponse(res.data);
                setHasMore(res.data.meta.has_more);
                setHasPrevious(true);
            })
            .catch(err => {
                setError(err);
                setIsError(true);
            }
            );
    }, []);

    const showTicket = (ticket) => {
        props.history.push({
            pathname: '/details',
            state: {
              ticket,
            },
          });
    }
    
    const getTotalTicketCount = () => {
        api.getTotalTicketCount()
            .then(res => {
                console.log(res);
                setTotalCount(res.data.value);
            })
            .catch(err => {
                setError(err);
                setIsError(true);
            }
            );
    }

    const getNext = () => {
        api.getNext(response.links.next)
            .then(res => {
                setTickets(res.data.tickets);
                setResponse(res.data);
                setHasMore(res.data.meta.has_more);
                setHasPrevious(true);
            })
            .catch(err => {
                setError(err);
                setIsError(true);
            }
            );
    }

    const getPrevious = () => {
        api.getNext(response.links.prev)
            .then(res => {
                if(res.data.tickets.length === 0) {
                    setHasPrevious(false);
                }else{
                    setTickets(res.data.tickets);
                    setResponse(res.data);
                    setHasMore(res.data.meta.has_more);
                }
            })
            .catch(err => {
                setError(err);
                setIsError(true);
            }
            );
    }
    return (
        <>
            <div className="container">
                {!isError && <div className="ticketList">
                    <div>
                        You are viewing {tickets.length} of {totalCount} tickets.
                    </div>
                        {tickets!=null && <ListGroup as="ol">
                            {tickets.map(ticket => (
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
                       }
                        <div className='navigation-buttons'>
                            <Button variant="primary" disabled={!hasPrevious} onClick={() => getPrevious()}>Previous 25</Button>
                            <Button variant="primary" disabled={!hasMore} onClick={() => getNext()}>Next 25</Button>
                        </div>
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
