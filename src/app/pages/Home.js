import React, {useEffect, useState} from 'react';
import UserLayout from "../Components/layout/user/UserLayout";
import {Link} from "react-router-dom";
import {getAllLawyers} from "../crud/user.crud";
import LawyerCard from "../Components/users/LawyerCard";
import * as lawyer from "../store/ducks/lawyers.duck";
import {connect, useSelector} from "react-redux";
import {getRatings} from "../../utils";
const Home = ({addLawyers}) => {
  const { lawyersList } = useSelector(
    ({ lawyers: {lawyersList} }) => ({
      lawyersList
    })
  );
  useEffect(() => {
    getAllLawyers()
      .then(res => {
        if (res.data.success) {
          addLawyers(res.data.lawyers)
        }
      })
  }, [])
  return (
    <UserLayout nobg={true}>
      <div style={{marginTop: '-20px', backgroundImage: 'url(/media/bg/bg1.jpg)', backgroundSize: '100% 450px', backgroundRepeat: 'no-repeat'}}>
        <div className="container">
          <div className="row align-items-center" style={{height: 490}}>
            <div className="col-12 col-sm-7 text-center pb-3 pb-sm-0">
              <h2>Get help With All of Your Legal Needs</h2>
              <h6>Suits makes it easy to find a lawyer</h6>
              <Link to='/lawyers/list' className="btn btn-success mt-4">Find Now</Link>
            </div>
            <div className="col-12 col-sm-5"><img src='/media/bg/img1.png' width={400}/></div>
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 30px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Highest Ranked</h4>
            <Link to='/lawyers/list' className='nav-link'>See All</Link>
          </div>
          <div className="row mt-5">
            {
              lawyersList.length === 0 ? <h5 className='text-center w-100 p-5'>No Record Found!</h5>
              : lawyersList.sort((a, b) => getRatings(b.lawyer_details.reviews) - getRatings(a.lawyer_details.reviews))
                .map((lawyer, i) => (
                  i < 6 &&
                  <div className="col-12 col-sm-4" key={lawyer._id}>
                    <LawyerCard lawyer={lawyer} />
                  </div>
                ))
            }
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Categories</h4>
          </div>
          <div className="row mt-3">
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-user-injured'/></div>
              <h5 className='flex-grow-1'>Accident & Injuries</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-gavel'/></div>
              <h5 className='flex-grow-1'>Criminal Law</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-users'/></div>
              <h5 className='flex-grow-1'>Family Law</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-user-tie'/></div>
              <h5 className='flex-grow-1'>Employment Law</h5>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderBottom: '1px solid rgb(220, 220, 220)'}}>
            <h4 className='mb-0'>Here's What Clients say about our lawyers</h4>
          </div>
          <div className="row mt-3 pb-5">
            {
              lawyersList.length === 0 ? <h5 className='text-center w-100 p-5'>Nothing Found!</h5>
                : lawyersList.sort((a, b) => getRatings(b.lawyer_details.reviews) - getRatings(a.lawyer_details.reviews))
                  .map((lawyer, i) => {
                    const review = lawyer.lawyer_details.reviews.sort((a, b) => parseInt(b.rating, 10) - parseInt(a.rating, 10) )[0]
                    if (1<4) {
                      if (review) {
                        return (
                          <div className='p-4 d-flex align-items-start col-12 col-sm-6 '>
                            <img
                              className="kt-img-rounded mr-4"
                              width={95}
                              height={95}
                              src={
                                review?.reviewedBy?.profileImage?.filename
                                  ? `/images/${review?.reviewedBy?.profileImage.filename}`
                                  : "/media/users/100_13.jpg"
                              }
                              alt={review?.reviewedBy?.firstName}
                            />
                            <div className='flex-grow-1 d-flex flex-column'>
                              <p>{review.text}</p>
                              <div className='font-weight-bold mt-2'>{`${review.reviewedBy.firstName} ${review.reviewedBy.lastName}`}</div>
                              <div>{review.reviewedBy.address}</div>
                            </div>
                          </div>
                        )
                      } else {
                        return (<h5 className='text-center w-100 p-5'>Nothing Found!</h5>)
                      }

                    }
                  })
            }

          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default  connect(null, lawyer.actions)(Home);
