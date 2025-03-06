import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function UserLogin() {
  return (
    <div>
        <div className='formsigin1 mt-5' >
                    <br />
                    <br />
                    <h1 className='h11'>Register User</h1>
                    <div className='w-50 formm'>

                    <form className='p-5 ' autocomplete="off" >
                        <input
                            type="text"
                            placeholder="First Name"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={FirstName}
                            required
                        />
                        <br />
                        <br />
                        <input
                            type="text"
                            placeholder="Last Name"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={LastName}
                            
                            required
                        />
                        <br />
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={Emailid}

                            required
                        />
                        <br />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)
                            required
                            className='w-100'
                            // ref={PassWord}
                        />
                        <br />
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)
                            required
                            className='w-100'
                            // ref={PassWord}
                        />
                        <br />
                        <br />
                        <Button className='w-50'><Link to='/userloginsucc'><h4>Signup</h4></Link></Button>
                        

                        
                    </form>
                    </div>

                    
            </div>
    </div>
  )
}

export default UserLogin