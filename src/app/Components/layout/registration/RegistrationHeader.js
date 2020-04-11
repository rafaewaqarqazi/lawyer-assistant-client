import React from 'react';

const RegistrationHeader = () => {
  return (
    <div className="kt-container d-flex flex-column flex-sm-row justify-content-start justify-content-sm-between pb-4">
      <h4 className="text-white">Registration</h4>
      <div className="kt-subheader__toolbar">
        <div className="kt-subheader__wrapper">
          <div className='d-flex align-items-center' style={{position: 'relative'}}>
            <input type="text" className='form-control' style={{height: 'calc(1.5em + 1.8rem + 2px)', width: '300px'}} placeholder="Search here"/>
            <button className='btn btn-primary m-0' style={{position: 'absolute', right: '5px'}}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;