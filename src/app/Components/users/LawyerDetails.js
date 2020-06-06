import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import {
  getCategory,
  getDepartment,
  getExperience,
  getQualification,
  getType
} from "../../../utils/job-post-data";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import { canApply } from "../../../utils";
import Rating from "@material-ui/lab/Rating";

const LawyerDetails = () => {
  const params = useParams();
  const { lawyersList, isUser, userId } = useSelector(
    ({ lawyers: { lawyersList } }) => ({
      lawyersList
    })
  );
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
        <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
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
                  className="mt-4 mb-5 text-nowrap overflow-hidden text-center letter-space-1"
                >
                  {`${lawyer.firstName} ${lawyer.lastName}`}
                </h5>
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
      </div>
    );
  }
};

export default LawyerDetails;
