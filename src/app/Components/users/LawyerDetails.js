import React, {useState} from "react";
import {Redirect, useParams, useHistory, Link} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  Portlet,
  PortletBody, PortletHeader, PortletHeaderToolbar,
} from "../../partials/content/Portlet";
import Rating from "@material-ui/lab/Rating";
import * as chat from "../../store/ducks/chat.duck";
import * as lawyerReducer from "../../store/ducks/lawyers.duck";
import {Alert, Button, Modal} from "react-bootstrap";
import {hireLawyer} from "../../crud/user.crud";
const LawyerDetails = ({addNewReceiver, addRoom, addReceiver, updateLawyer}) => {
  const params = useParams();
  const history = useHistory()
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [res, setRes] = useState({
    success: false,
    error: false,
    message: ''
  })
  const [input, setInput] = useState({
    title: '',
    description: ''
  })
  const handleClose = () => setShow(false)
  const { lawyersList, user } = useSelector(
    ({ lawyers: { lawyersList }, auth: { user } }) => ({
      lawyersList,
      user
    })
  );
  const handleClickMessage = () => {
    addRoom(null)
    addReceiver(null)
    addNewReceiver(params.lawyerId
      ? lawyersList.filter(j => j._id === params.lawyerId).length > 0
        ? lawyersList.filter(j => j._id === params.lawyerId)[0]._id
        : null
      : null)
    history.push('/chat')
  }
  const handleHire = () => {
    const hLawyer = lawyersList.filter(j => j._id === params.lawyerId)[0];
    console.log('input', input)
    hireLawyer({clientId: user._id, lawyerId: hLawyer._id, ...input})
      .then(result => {
        console.log('result', result)
        if (result.data.success){
          setRes({error: false, success: true, message: result.data.message})
          setShowModal(false)
          setInput({title: '', description: ''})
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
  const lawyer = params.lawyerId
    ? lawyersList.filter(j => j._id === params.lawyerId).length > 0
      ? lawyersList.filter(j => j._id === params.lawyerId)[0]
      : null
    : null;
  if (!lawyer) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Alert show={res.success} variant="success">{res.message}</Alert>
        <Alert show={res.error} variant="danger">{res.message}</Alert>
        {
          !lawyer.lawyer_details?.canHire?.includes(user._id) &&
          <Alert show={show} variant="info" onClose={handleClose} dismissible>
            To hire the lawyer, chat with him and provide info about your case, if requirements match, lawyer will enable hiring for you!
          </Alert>
        }
        {console.log(lawyer)}
        <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
          <PortletHeader
            title='Details'
            toolbar={
              <PortletHeaderToolbar>
                {
                  user.role === '1' &&
                  <button className="btn btn-label btn-sm btn-bold" disabled={
                    !lawyer.lawyer_details?.canHire?.includes(user._id) ||
                      lawyer.lawyer_details?.cases?.filter(c => c.client === user._id)?.length > 0
                  } onClick={() => setShowModal(true)}>Hire Now</button>
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
                      lawyer.profileImage && lawyer.profileImage.filename
                        ? `/images/${lawyer.profileImage.filename}`
                        : "/media/users/100_13.jpg"
                    }
                    alt={lawyer.firstName}
                  />
                </div>
                <h5
                  style={{ textOverflow: "ellipsis" }}
                  className="mt-4 mb-2 text-nowrap overflow-hidden text-center letter-space-1"
                >
                  {`${lawyer.firstName} ${lawyer.lastName}`}
                </h5>
                {
                  user?.role === '1' && <div className='d-flex justify-content-center mb-5'>
                    <button onClick={handleClickMessage} className='btn btn-sm btn-label-success'>Message</button>
                  </div>
                }

                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Law School:
                  </span>
                  <span className="letter-space-1">
                    {lawyer.lawyer_details.lawSchool || "N/A"}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Practice Areas:
                  </span>
                  <div className="line-height-md letter-space-1">
                    {lawyer.lawyer_details.practiceAreas && lawyer.lawyer_details.practiceAreas.length > 0  ? (
                      lawyer.lawyer_details.practiceAreas.map(practiceArea => (
                        <div key={practiceArea}>{practiceArea}</div>
                      ))
                    ) : (
                      <div>N/A</div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Contact:
                  </span>
                  <span className="letter-space-1">{lawyer.mobileNo}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Location:
                  </span>
                  <span className="letter-space-1">{`${lawyer.address}, ${lawyer.country}`}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="font-weight-bold letter-space-1">
                    Ratings:
                  </span>
                  <span className="d-flex align-items-center">
                    <Rating
                      name="lawyer-rating"
                      value={lawyer.lawyer_details.ratings || 0}
                      readOnly
                    />
                    ({lawyer.lawyer_details.ratings || 0})
                  </span>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 text-justify line-height-md letter-space-1 break-word"
                style={{ borderLeft: "1px solid #eee" }}
              >
                <h5 className="letter-space-1">Bio</h5>
                {lawyer.lawyer_details.bio || "N/A"}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 col-sm-6">
                <h5 className="letter-space-1">Client's Reviews</h5>
                {
                  lawyer.lawyer_details.reviews && lawyer.lawyer_details.reviews.length > 0 ?
                  lawyer.lawyer_details.reviews.map(review => (
                    <div>{review}</div>
                  ))
                    : <h5 className="p-5 text-center letter-space-1">No Reviews Available!</h5>
                }
              </div>
            </div>
          </PortletBody>
        </Portlet>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Case Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={input.title} name='title' onChange={handleOnChange} placeholder='Case Title' className="form-control form-group"/>
            <textarea rows="5" value={input.description} name='description' onChange={handleOnChange} placeholder='Case Details...' className="form-control"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" disabled={input.title.trim() === '' || input.description.trim() === ''} onClick={handleHire}>
              Hire Now
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default connect(null, {...chat.actions, ...lawyerReducer.actions})(LawyerDetails);
