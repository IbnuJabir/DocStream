import { Fragment, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [revenue, setRevenue] = useState(null); // Initialize to null for loading state

  const fetchRevenue = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOCSTREAM_API_URL}/transactions/revenue`);
      // console.log(result.data);
      setRevenue(result.data);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);
  
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  return (
    <Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
        {revenue}{" "}ETB
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {f.format(Date.now())}
      </Typography>
      <div>
        <Link href="/transactions">
          View Details
        </Link>
      </div>
    </Fragment>
  );
}
