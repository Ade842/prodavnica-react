import React, {useState} from 'react';

import {storage, db} from "../config/config";


export const AddProducts= ()=>{

    const[imeArtikla, setImeArtikla]=useState('');
    const[cijenaArtikla, setCijenaArtikla]=useState(0);
    const[slikaArtikla, setSlikaArtikla]=useState(null);
    const[error, setError]=useState('');


    const types=['image/png','image/jpeg']

    const artikalSlikaHandler = (e) => {
        let selectedFile=e.target.files[0];
        if(selectedFile && types.includes(selectedFile.type)){
            setSlikaArtikla(selectedFile);
            setError('');
        }
        else{
            setSlikaArtikla(null);
            setError('Odaberite ispravan format slike png ili jpeg');
        }

    }

    const addArtikal = (e) => {
        e.preventDefault();
        console.log(imeArtikla,cijenaArtikla,slikaArtikla);
        const uploadTask=storage.ref(`product-images/${slikaArtikla.name}`).put(slikaArtikla);
        uploadTask.on('state_changed',snapshot=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes*100)
            console.log(progress);
        }, err=>{

            setError(err.message)},
            ()=> {

            storage.ref('product-images').child(slikaArtikla.name).getDownloadURL().then(url => {
                db.collection('artikli').add({
                    ime: imeArtikla,
                    cijena: Number(cijenaArtikla),
                    slika:url
                }).then(()=>{
                    setImeArtikla('');
                    setCijenaArtikla(0);
                    setSlikaArtikla(null);
                    setError('');
                    document.getElementById('file').value='';

                }).catch(err=>setError(err.message));
            })
        })


        }




    return (
        <div className='container'>
            <br/>
            <h2>DODAJ ARTIKAL</h2>
            <hr/>
            <form autoComplete="off" className='form-group' onSubmit={addArtikal}>
                <label htmlFor="product-name">Naziv artikla</label>
                <br/>
                <input type="text" className='form-control' required
                onChange={(e) => setImeArtikla(e.target.value)} value={imeArtikla}/>
                <br/>
                <label htmlFor="product-price">Cijena artikla</label>
                <br/>
                <input type="number" className='form-control' required
                       onChange={(e)=>setCijenaArtikla(e.target.value)} value={cijenaArtikla}/>
                <br/>
                <label htmlFor="product-img">Slika artikla</label>
                <br/>
                <input type="file" className='form-control' onChange={artikalSlikaHandler} id='file'/>
                <br/>
                <button className='btn btn-success btn-md mybtn'>DODAJ</button>
            </form>

            {error && <span>{error}</span>}
        </div>
    )
}