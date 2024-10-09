import React, { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showPassword, setshowpassword] = useState(false)
    const [passwordArray, setpasswordArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)



    }

    useEffect(() => {
        getPasswords()

    }, [])

    const togglepasword = () => {
        setshowpassword(!showPassword);
    }
    const copyText = (text) => {
        toast('🦄 copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text);
    }
    const savePassword =async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{'Content-Type':'application/json' },body:JSON.stringify({id: form.id})})


            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            let res= await fetch("http://localhost:3000",{method:"POST",headers:{'Content-Type':'application/json' },body:JSON.stringify({...form,id:uuidv4()})})
            //localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            toast('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else {
            toast('Password Not Saved');

        }


    }
    const deletePassword = async (id) => {
        console.log("deleting with password with id..", id)
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{'Content-Type':'application/json' },body:JSON.stringify({id})})
        //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });



        //setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
        //console.log([...passwordArray, form])


    }
    const editPassword = (id) => {
        console.log("editing with password with id..", id)
        setform({...passwordArray.filter(item => item.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))


        /* setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
         localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
         console.log([...passwordArray, form])*/


    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })


    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-3 md:p-0 md:mycontainer min-h-[88.1vh]">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700 '>&lt;</span>
                    <span>Password</span>
                    <span className='text-green-700 '>BANK/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>your own password manager</p>
                <div className='flex  flex-col p-4 text-black gap-8 items-center' >
                    <input value={form.site} placeholder='website name' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name="site" id="site" onChange={handlechange} />
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input value={form.username} placeholder='Username' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name="username" id="username" onChange={handlechange} />
                        <div className='relative'>
                            <input value={form.password} placeholder="Password" className='rounded-full border border-green-500 w-full px-4 py-1 text-black' autoComplete='off' type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={handlechange} />
                            <span className='absolute right-[7px] top-[4px] text-black cursor-pointer' onClick={togglepasword} ><i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i></span>
                        </div>
                    </div>
                    <button className='flex justify-center text-white gap-2 px-8  py-2 items-center bg-green-700 rounded-full hover:bg-green-500 w-fit
                    hover:border-2 border-green-900' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-3xl py-4'>
                        your passwords
                    </h2>
                    {passwordArray.length === 0 && <div> No Passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Website Name</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border-white text-center w-32 '><div className='flex justify-center items-center gap-1'><a href={item.site} target='_blank'>{item.site}</a> <img className='w-4 cursor-pointer' src='icons/copy.png' onClick={() => copyText(item.site)} /> </div></td>
                                        <td className='py-2 border-white text-center w-32'><div className='flex justify-center items-center gap-1'> {item.username} <img className='w-4 cursor-pointer' src='icons/copy.png' onClick={() => copyText(item.username)} /></div></td>

                                        <td className='py-2 border-white text-center w-32'><div className='flex justify-center items-center gap-1'>{"*".repeat(item.password.length)} <img className='w-4 cursor-pointer' src='icons/copy.png' onClick={() => copyText(item.password)} /></div></td>
                                        <td className='py-2 border-white text-center w-32'><div className='flex justify-center items-center gap-2'><span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} ><img src='icons/editing.png' alt='edit' className='w-5' /></span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }} ><img src='icons/bin.png' alt='edit' className='w-5' /></span>  </div></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>

    )
}

export default Manager