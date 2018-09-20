import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            isAgree: false,
            contactType: 'Tel',
            message: '',
            /* Particular field has been touched or not */
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
                message: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    /*Any change to any input value  */
    handleInputChange(event) {
        const target = event.target;
        /* Checkbox or Inputbox */
        const value = event.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            // ES6 computed property names
            [name]: value
        })
    }

    handleSubmit(event) {
        console.log("Current State is: " + JSON.stringify(this.state));
        event.preventDefault();
    }

    // Form Validation
    handleBlur = (field) => (e) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        })
    }

    validate(firstname, lastname, telnum, email, message) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            message: ''
        };
        if (this.state.touched.firstname && firstname.length < 2) {
            errors.firstname = 'First name should be at least 2 characters';
        }
        if (this.state.touched.lastname && lastname.length < 2) {
            errors.lastname = 'Last name should be at least 2 characters';
        }
        // Regular expression for North American numbers
        const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
        if(this.state.touched.telnum && !reg.test(telnum)) {
            errors.telnum = 'This is not a valid North American phone number'
        }
        
        if(this.state.touched.email && !email.includes('@')) {
            errors.email = 'Please enter a valid email address'
        }

        if(this.state.touched.message && message.length < 10 ) {
            errors.message = 'Please be more specifiy'
        }

        return errors;
    }

    render() {
    const errors = this.validate(
                    this.state.firstname, 
                    this.state.lastname, 
                    this.state.telnum, 
                    this.state.email,
                    this.state.message)
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                            {/* value={this.state.firstname} this becoms a controlled form */}
                                <Input type="text" id="firstname" name="firstname" 
                                placeholder="First Name" value={this.state.firstname}
                                valid={errors.firstname === ''}
                                invalid={errors.firstname !== ''}
                                onBlur={this.handleBlur('firstname')} 
                                onChange={this.handleInputChange} />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Input type="text" id="lastname" name="lastname" 
                                placeholder="Last Name" value={this.state.lastname}
                                valid={errors.lastname === ''}
                                invalid={errors.lastname !== ''}
                                onBlur={this.handleBlur('lastname')} 
                                onChange={this.handleInputChange} />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Phone</Label>
                            <Col md={10}>
                                <Input type="tel" id="telnum" name="telnum" 
                                placeholder="Phone" value={this.state.telnum}
                                valid={errors.telnum === ''}
                                invalid={errors.telnum !== ''}
                                onBlur={this.handleBlur('telnum')}  
                                onChange={this.handleInputChange} />
                                <FormFeedback>{errors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email" 
                                placeholder="Email" value={this.state.email}
                                valid={errors.email === ''}
                                invalid={errors.email !== ''}
                                onBlur={this.handleBlur('email')}  
                                onChange={this.handleInputChange} />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:6, offset:2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="agree"
                                        checked={this.state.isAgree} 
                                        onChange={this.handleInputChange} /> {' '}
                                        <strong> May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                               <Input type="select" name="contactType"
                                value={this.state.contactType}
                                onChange={this.handleInputChange} >
                                    <option>Phone</option>
                                    <option>Email</option>
                                </Input> 
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="message" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Input type="textarea" id="message" name="message" rows="8"
                                placeholder="Your message..." value={this.state.message}
                                valid={errors.message === ''}
                                invalid={errors.message !== ''}
                                onBlur={this.handleBlur('message')} 
                                onChange={this.handleInputChange} />
                                <FormFeedback>{errors.message}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}
}

export default Contact