import React from 'react'

export default function QRModal() {
    return (


        <div>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='card-title'>QR Code Modal</h3>
                </div>

                <div className='card-body'>
                    <div className='d-md-flex mb-3 justify-content-between align-items-center'>
                        <div className='col-md-6'>
                            <div className='card bg-light'>
                                <div className='card-body'>

                                    <input className="form-control mb-3" type="text" placeholder="Disabled input" aria-label="Disabled input example" disabled />
                                    <input className="form-control mb-3" type="text" value="Disabled readonly input" aria-label="Disabled input example" disabled readOnly />
                                </div>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <img src="/QR_Code_Example.svg.png" alt="" />
                        </div>



                    </div>
                </div>
            </div>
        </div>

    )
}
