{/* <Container className="" >
            <Row className="login-row " >
                
                <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-center">LOGIN</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" className={errors.email && "regi-inp-err"}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: (value) => {
                                        if (!value.includes("@")) { return "must includes in @" } return true
                                    }
                                })}
                                value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.target.value })} />
                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                {...register('password', {
                                    required: "password is required"
                                })}
                                value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })}

                            />
                            {errors.password && <div className="text-danger">{errors.password.message}</div>}
                        </Form.Group>
                    </Col>
                    {errors.root && <div className="text-danger">{errors.root.message}</div>}
                    <Col className="login-btn">
                        <Button variant="success" className="text text-" type="submit" disabled={isSubmitting} >{isSubmitting ? "loading....." : "Login"}</Button>
                    </Col>
                    <Col className="login-f-d">
                        <Link to="/signup">Don't have an Account ?</Link> <Link to='/forgotpassword'>Forgot password?</Link>

                    </Col>
                </Form>
                Login Form End

            </Row>
            
            {loggedIn && (
                <div className="popup-container">
                    <div className="popup">
                        <p>Form submitted successfully!</p>
                        <button onClick={() => setLogin(false)}>Close</button>
                    </div>
                </div>
            )}
           
        </Container> */}