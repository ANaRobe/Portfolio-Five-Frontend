import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Workshop from './Workshop';


function WorkshopPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: workshop }] = await Promise.all([
          axiosReq.get(`/workshops/${id}`),
        ]);
        setWorkshop({ results: [workshop] });
      } catch (error) {
        //console.log(error);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Workshop {...workshop.results[0]} setWorkshop={setWorkshop} workshopPage />
    </Container>
  );
}

export default WorkshopPage;
