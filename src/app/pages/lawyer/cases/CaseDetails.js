import React, {useEffect, useState} from "react";
import {Redirect, useParams, useHistory} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  Portlet,
  PortletBody, PortletHeader, PortletHeaderToolbar,
} from "../../../partials/content/Portlet";
import * as chat from "../../../store/ducks/chat.duck";
import * as casesReducer from "../../../store/ducks/cases.duck";
import {Alert, Button, Modal} from "react-bootstrap";
import moment from "moment";
import {addHearing} from "../../../crud/user.crud";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {ExpandMore} from "@material-ui/icons";
import {ExpansionPanelActions} from "@material-ui/core";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {practiceAreas} from "../../../../utils/practiceAreas";
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
const CasesDetails = () => {
  const params = useParams();
  const history = useHistory()
  const [show, setShow] = useState(true);
  const [sCase, setScase] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [res, setRes] = useState({
    success: false,
    error: false,
    message: ''
  })
  const [input, setInput] = useState({
    title: '',
    description: '',
    date: ''
  })
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleClose = () => setShow(false)
  const { casesList, user } = useSelector(
    ({ cases: { casesList }, auth: { user } }) => ({
      casesList,
      user
    })
  );
  const handleAddHearing = () => {
    console.log('input', input)
    addHearing({caseId: sCase._id, ...input})
      .then(result => {
        console.log('result', result)
        if (result.data.success){
          setRes({error: false, success: true, message: result.data.message})
          setShowModal(false)
          setInput({title: '', description: ''})
          setScase(result.data.cases)
          closeRes()
        } else {
          setRes({success: false, error: true, message: result.data.message})
          closeRes()
        }
      })
      .catch(error => {
        setRes({success: false, error: true, message: error.message})
        closeRes()
      })
  }
  const closeRes = () =>{
    setTimeout(() => {
      setRes({success: false, error: false, message: ''})

    }, 3000)
  }
  const handleOnChange = event => {
    setInput({...input, [event.target.name]: event.target.value})
  }
  useEffect(() => {
    setScase(params.caseId
      ? casesList.filter(c => c._id === params.caseId).length > 0
        ? casesList.filter(c => c._id === params.caseId)[0]
        : null
      : null)
    setLoading(false)
  }, [])
  if (!sCase && !loading) {
    return <Redirect to="/" />;
  } else {
    if (loading) return <div className='spinner'/>
    else {
    return (
      <div>
        <Alert show={res.success} variant="success">{res.message}</Alert>
        <Alert show={res.error} variant="danger">{res.message}</Alert>
        {console.log(sCase)}
        <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
          <PortletHeader
            title='Details'
            toolbar={
              <PortletHeaderToolbar>
                {
                  user.role === '2' &&
                  <button className="btn btn-label btn-sm btn-bold" onClick={() => setShowModal(true)}>Add New Hearing</button>
                }
              </PortletHeaderToolbar>
            }
          />
          <PortletBody>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="d-flex justify-content-center">
                  <img
                    className="kt-img-rounded shadow"
                    width={120}
                    height={120}
                    src={
                      sCase.client?.profileImage?.filename
                        ? `/images/${sCase.client.profileImage.filename}`
                        : "/media/users/100_13.jpg"
                    }
                    alt={sCase.client.firstName}
                  />
                </div>
                <h5
                  style={{ textOverflow: "ellipsis" }}
                  className="mt-4 mb-2 text-nowrap overflow-hidden text-center letter-space-1"
                >
                  {`${sCase.client.firstName} ${sCase.client.lastName}`}
                </h5>

                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Case Title:
                  </span>
                  <span className="letter-space-1">
                    {sCase.details.title || "N/A"}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Next Hearing:
                  </span>
                  <div className="line-height-md letter-space-1">
                    {sCase.details.hearings.sort((a, b) => new Date(a.date) - new Date(b.date))[0]?.date ? moment(sCase.details.hearings.sort((a, b) => new Date(a.date) - new Date(b.date))[0]?.date).format('DD/MM/YYYY') : 'N/A'}
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Total Hearings:
                  </span>
                  {sCase.details.hearings.length}
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Case Status:
                  </span>
                  <span className="d-flex align-items-center">
                   {sCase.details.status || 'In Progress'}
                  </span>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 text-justify line-height-md letter-space-1 break-word"
                style={{ borderLeft: "1px solid #eee" }}
              >
                <h5 className="letter-space-1">Case Description</h5>
                {sCase.details.description || "N/A"}
              </div>
            </div>
            <div className="font-weight-bold letter-space-1 mt-5 mb-5">
              Case Hearings:
            </div>
            <div>


            {
              sCase.details.hearings.map(hearing => (
                <ExpansionPanel key={hearing._id} square expanded={expanded === hearing._id} onChange={ handleChange(hearing._id)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                  >
                    <div className="font-weight-bold letter-space-1" style={{color: '#646c9a', flexBasis: '33.33%'}}>{hearing.title}</div>
                    <div >{moment(hearing.date).format('MM-DD-YYYY')}</div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className=" letter-space-1 " style={{color: '#646c9a'}}>
                      {hearing.description}
                    </div>
                  </ExpansionPanelDetails>
                  <ExpansionPanelActions>
                    <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown}>
                      <DropdownToggle
                        className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
                        caret
                      >
                        {status !== '' ? status : 'Select Status to change'}
                      </DropdownToggle>

                      <DropdownMenu className='dropdown-scroll'>
                        <DropdownItem onClick={() => handleChangeStatus('')} >All</DropdownItem>
                        <DropdownItem onClick={() => handleChangeStatus('Completed')}>{practiceArea}</DropdownItem>
                        <DropdownItem onClick={() => handleChangeStatus('Completed')} >{practiceArea}</DropdownItem>
                        <DropdownItem onClick={() => handleChangeStatus('Completed')} >{practiceArea}</DropdownItem>
                      </DropdownMenu>

                    </Dropdown>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              ))
            }
            </div>
          </PortletBody>
        </Portlet>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Hearing Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={input.title} name='title' onChange={handleOnChange} placeholder='Hearing Title' className="form-control form-group"/>
            <input type='date' value={input.date} name='date' onChange={handleOnChange} className="form-control form-group"/>
            <textarea rows="5" value={input.description} name='description' onChange={handleOnChange} placeholder='Hearing Details...' className="form-control"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" disabled={input.title.trim() === '' || input.description.trim() === '' || input.date.trim() === ''} onClick={handleAddHearing}>
              Add Now
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    }
  }
};

export default connect(null, {...chat.actions, ...casesReducer.actions})(CasesDetails);
