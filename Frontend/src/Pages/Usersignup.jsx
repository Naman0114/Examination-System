import React from 'react'

function Usersignup() {
  return (
    <div>
        <div className='formsigin1 mt-5 ' >
                    <br />
                    <br />
                    <div className='formm w-50'>

                    <form className='p-5' autocomplete="off" >
                    <h1 className='h11'>Login</h1>
                        <input
                            type="text"
                            placeholder="First Name"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={FirstName}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={FirstName}
                            required
                        />
                        i
                        <input
                            type="Number"
                            placeholder="Registration NUmber"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className='w-100'
                            // ref={FirstName}
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
                        {/* <button type="submit" className='sigupbtn'>Sign up</button> */}
                        <Button className='w-50'><Link to='/userlogin'><h4>Login</h4></Link></Button>
                        <br />
                        <br />
                        Create a new Account?<Link to='/usersignup'>SignUp</Link>
 
                        

                        
                    </form>
                    </div>

                    
            </div>
    </div>
  )
}

export default Usersignup