import React, { useState } from 'react'

const AddMed = () => {
    const [medDet, setMedDet] = useState({ medname: "", medmrp: "", medexpdate: "" })
    const fun = (e) => {
        e.PreventDefault();
        console.log(medDet.medname);
    }


    const handleChange = (event) => {
        setMedDet({ ...medDet, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(window.puremeds)
        console.log(medDet)
        if(window.puremeds && window.acc)
        {
            const puremeds = window.puremeds
            const addmed = await puremeds.methods.addMedicine(medDet.medname, medDet.medmrp, medDet.medexpdate).send({from:window.acc})
            console.log(addmed)
        }
        
    }
    return (
        <>
            <div className='container mb-3' style={{"width": "50%", "marginTop": "5rem", "border": "2px solid green", "padding": "1rem", "borderRadius":"15px"}}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Medicine Name</label>
                        <input type="text" className="form-control" id="medname" aria-describedby="emailHelp" name="medname" value={medDet.medname} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">MRP</label>
                        <input type="text" className="form-control" id="medmrp" value={medDet.medmrp} name="medmrp" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Expiry Date</label>
                        <input type="text" className="form-control" id="medexpdate" value={medDet.medexpdate} name="medexpdate" onChange={handleChange} required/>
                    </div>
                    <div className='justify-content-center d-flex'>
                    <button type="submit" className="btn btn-primary item-center">Add Medicine</button>
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default AddMed
