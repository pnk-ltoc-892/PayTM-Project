import { useEffect, useState } from "react"
import Button  from "./Button"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


// Remove youself from the sendMOney list

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");


    // Use Debouncing
    useEffect( () => {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then( (response) => setUsers(response.data.user) )
    }, [filter] )

    
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {setFilter(e.target.value)}}
                type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user, index) => <User key={index} user={user} />)}
        </div>
    </>
}


function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.fullname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.fullname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button OnClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.fullname)
            }} label={"Send Money"} />
        </div>
    </div>
}