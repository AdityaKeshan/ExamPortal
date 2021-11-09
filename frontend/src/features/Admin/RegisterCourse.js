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
        console.log(result);
    }
    return(
        <div className="flex justify-around blue-component w-3/5 flex-col items-center min-h-200">
            <h4 className="header-4">Register Course</h4>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <div className="space-x-4">
                    <label htmlFor="courseName">Enter Course Name: </label>
                    <input type="text" name="courseName" value={courseName} onChange={onCourseChange}/>
                </div>
                <div className="h-16 flex items-center">
                    <button type="submit" className="btn btn-blue w-32">Submit</button>
                </div>
                
            </form>
        </div>
    )
}

export default RegisterCourse;