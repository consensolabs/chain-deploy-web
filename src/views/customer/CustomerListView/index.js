import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [node, setNode] = useState();
  const [nodeDetails, setNodeDetails] = useState()
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const handleClose = () => {
    setLoading(false);
  };

  const handleToggle = () => {
    setLoading(!loading);
  };

  const showMessage = () => {
    setMessage(true);
  };

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage(false);
  };

  const createNode = () => {

    handleToggle();
    const apiUrl = 'http://localhost:8000/create';
    axios.post(apiUrl, {"number":"4"}).then((result) => {
      setNode(result.data);
      setLoading(false);
      showMessage()
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
      <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={message} autoHideDuration={6000} onClose={handleMessageClose}>
        <Alert onClose={handleMessageClose} severity="success">
          Node creation is initiated!
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default CustomerListView;
