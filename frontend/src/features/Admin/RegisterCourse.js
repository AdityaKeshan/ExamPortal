import React,{useState} from "react"
import { useSelector } from "react-redux";
import axios from "axios"
const RegisterCourse = ()=>{
    const [courseName,setCourseName] = useState("");
    const admin = useSelector((store) => store.loginAdmin.admin);

    const onCourseChange = (e)=>{
        const name = e.target.value;
        setCourseName(name);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const result = await axios
        .post("http://localhost:3001/admin/course", {
            courseName:courseName,
            admin:admin.name,
            tokenId:admin.token,
        })
        .catch((err) => console.log(err));
        debugger;
        console.log(result);
    }
    return(
        <div className="w-full flex justify-center">
            <form onSubmit={handleSubmit} >
                <input type="text" name="courseName" value={courseName} onChange={onCourseChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RegisterCourse;