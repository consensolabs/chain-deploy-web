import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [node, setNode] = useState();
  const [nodeDetails, setNodeDetails] = useState()

  const createNode = () => {

    const apiUrl = 'http://localhost:8000/create';
    axios.post(apiUrl, {"number":"4"}).then((result) => {
      setNode(result.data);
    });
  }

  const getStatus = () => {
    if(node) {
      const taskId = node.data.task_id;
      const apiUrl = 'http://localhost:8000/status/' + taskId ;
      axios.get(apiUrl).then((repos) => {
        if(repos.data.status == "SUCCESS") {
          setNodeDetails(repos.data.result.success.localhost.instances[0])
        }
        else {
          setNodeDetails({public_ip: "-", state: "pending", region: "-", instance_type: "-"})
        }
      });
    }
  }

  return (
    <Page
      className={classes.root}
      title="Environments"
    >
      <Container maxWidth={false}>
        <Toolbar createNode={createNode} getStatus={getStatus} />
        <Box mt={3}>
          <Results customers={customers} node={node} nodeDetails={nodeDetails}/>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
