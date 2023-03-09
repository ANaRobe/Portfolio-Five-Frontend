import React, {useEffect, useState} from 'react';
import {Container, Form, Row, Col} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useLocation} from 'react-router-dom';
import {axiosReq} from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import NoResults from "../../assets/no_results.png";
import {fetchMoreData} from '../../utils/utils';
import Workshop from './Workshop';
import styles from "../../styles/SearchBar.module.css";
import PopularProfiles from "../profiles/PopularProfiles";


function WorkshopsPage({
    filter = ''
}) {
    const [workshops, setWorkshops] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    const [query, setQuery] = useState('');


    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const {data} = await axiosReq.get(`/workshops/?${filter}search=${query}`,);
                setWorkshops(data);
                setHasLoaded(true);
            } catch (err) {}
        };

        setHasLoaded(false);

        const timer = setTimeout(() => {
            fetchWorkshops();
        }, 1000);

        return() => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2"
                lg={8}>
                <Container className="py-2 p-0 p-lg-2 md-">
                    <i className={
                        `fas fa-search ${
                            styles.SearchIcon
                        }`
                    }/>
                    <Form className={
                            styles.SearchBar
                        }
                        onSubmit={
                            (e) => e.preventDefault()
                    }>
                        <Form.Control value={query}
                            onChange={
                                (e) => setQuery(e.target.value)
                            }
                            type="text"
                            className="mr-sm-2"
                            placeholder="Search workshops"
                            aria-label="search bar"/>
                        <i className={
                                `fa-solid fa-eraser ${
                                    styles.Clear
                                }`
                            }
                            onClick={
                                () => setQuery("")
                            }/>
                    </Form>
                </Container>
                <PopularProfiles mobile/> {
                hasLoaded ? (
                    <> {
                        workshops.results.length ? (
                            <InfiniteScroll children={
                                    workshops.results.map((workshop) => (
                                        <Workshop key={
                                                workshop.id
                                            }
                                            {...workshop}
                                            setWorkshops={setWorkshops}/>
                                    ))
                                }
                                dataLength={
                                    workshops.results.length
                                }
                                loader={
                                    <Asset
                                spin/>
                                }
                                hasMore={
                                    !!workshops.next
                                }
                                next={
                                    () => fetchMoreData(workshops, setWorkshops)
                                }/>
                        ) : (
                            <Container>
                                <Asset src={NoResults}/>
                            </Container>
                        )
                    } </>
                ) : (
                    <Container>
                        <Asset spin/>
                    </Container>
                )
            } </Col>
            <Col lg={4}
                className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles/>
            </Col>
        </Row>
    );
}

export default WorkshopsPage;
