import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Modal, Table, Alert} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {categories, departments, types} from "../../../../utils/job-post-data";
import moment from 'moment'
import {Tooltip} from "@material-ui/core";
import {deleteJob} from "../../../crud/job.crud";
import * as caseReducer from "../../../store/ducks/cases.duck";
import PaginationComponent from "../../../Components/PaginationComponent";
import Filters from "../../../Components/Filters";
import {getAllCases} from "../../../crud/user.crud";
const Cases = ({casesList, user, addCases, casesLoading, updateCase}) => {
  const history = useHistory()
  const [show, setShow] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [filteredData, setFilteredData] = useState(casesList || [])
  const [filters, setFilters] = useState({
    search: ''
  })

  useEffect(() => {
    getAllCases({userId: user._id, userType: 'lawyer'})
      .then(result => {
        console.log('result', result)
        if (result.data.success) {
          addCases(result.data.cases)
        } else {
          console.log('Something went wrong')
        }
      })
      .catch(error => console.log('error', error.message))
  }, [])
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCaseId(id)
    setShow(true);
  }
  const confirmDelete = () => {
    deleteJob(caseId)
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleClose()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleClose()
          // removeJob(caseId)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not delete Job Post'})
        handleClose()
        closeAlert()
      })
  }
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }

  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  useEffect(() => {
    setFilteredData(casesList.filter(sCase =>
      sCase.details.title.toLowerCase().includes(filters.search.toLowerCase())
    ))
  }, [filters, casesList])
  return (
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Cases'
        />
        <PortletBody>
          <div className="d-flex align-items-center justify-content-end">
            <div className="position-relative">
              <input type="text" className='form-control form-control-sm ml-2 ' placeholder='Search for Case' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
              <span className='fa fa-search position-absolute ' style={{top: '30%', right: 0}}/>
            </div>
          </div>
          <Table responsive className='mt-2' hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Client</th>
              <th>Next Hearing</th>
              <th>Total Hearings</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {
              filteredData.length === 0
                ? <tr >
                  <td colSpan={8} style={{textAlign: 'center'}}>No Cases Found</td>
                </tr>
                : filteredData
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= casesList.length ? ((pageNo - 1) * perPage) + perPage : casesList.length)
                  .map((caseDetails, i) => (
                    <tr key={i} style={{cursor:'pointer'}} onClick={() => history.push(`/cases/details/${caseDetails._id}`)}>
                      <td>{i+1}</td>
                      <td>{caseDetails.details.title}</td>
                      <td>{`${caseDetails.client?.firstName} ${caseDetails.client?.lastName}`}</td>
                      <td>{caseDetails.details.hearings.sort((a, b) => new Date(a.date) - new Date(b.date))[0]?.date ? moment(caseDetails.details.hearings.sort((a, b) => new Date(a.date) - new Date(b.date))[0]?.date).format('DD/MM/YYYY') : 'N/A'}</td>
                      <td>{caseDetails.details.hearings.length}</td>
                      <td>{caseDetails.details.status || 'In Progress'}</td>
                      {/*<td>{moment(caseDetails.dueDate).format('DD/MM/YYYY')}</td>*/}
                      {/*<td>*/}
                      {/*  <Tooltip title='Edit Post' placement='top'>*/}
                      {/*    <Link to={`/caseDetailss/edit/${caseDetails._id}`}>*/}
                      {/*      <i className='fa fa-pencil-alt mr-4'/>*/}
                      {/*    </Link>*/}
                      {/*  </Tooltip>*/}
                      {/*  <Tooltip title='Delete Post' placement='top'>*/}
                      {/*    <i className='fa fa-minus-circle' style={{color: 'red'}} onClick={() => handleShow(caseDetails._id)}/>*/}
                      {/*  </Tooltip>*/}
                      {/*</td>*/}
                    </tr>
                  ))
            }
            </tbody>
          </Table>
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={filteredData.length}
          />
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job post?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-danger btn-sm' onClick={confirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ cases, auth: {user} }) => ({
  casesList: cases.casesList,
  user
});

export default connect(mapStateToProps, caseReducer.actions)(Cases);