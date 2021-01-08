import emailjs from "emailjs-com";
import React from 'react';

export default function EmailUs() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_r3p5nsf', 'template_6rikw7u', e.target, 
    'user_XxBT7kIwwSwWNCHpqY7Xm')
        .then((result) => {
            console.log(result.text);
            window.location = "/"
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <div>
            <div className="card p-3 shadow mb-5 bg-white"
      style={{
        width: '35rem',
        paddingTop: '100px',
        marginLeft: '150px',
        marginTop: '100px',
        height: '600px',
        borderRadius: '2.5rem',
      }}>
            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info btn-lg btn-block" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}