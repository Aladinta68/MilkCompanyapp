import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const datacontext = createContext();

const Mycontextprovider = ({ children }) => {

    axios.defaults.withCredentials = true;

    const [UserID, setUserID] = useState([]);
    const [Error, setError] = useState('null');

    const [cowsdata, setcowsdata] = useState([]);
    const [allcowsdata, setallcowsdata] = useState([]);
    const [cowsbirthdata, setcowsbirthdata] = useState([]);
    const [medicalexamdata, setmedicalexamdata] = useState([]);
    const [Milkdata, setMilkdata] = useState([]);
    const [ALLProfiledata, setALLProfiledata] = useState([]);
    const [Profiledata, setProfiledata] = useState([]);
    const [totalPageCows, setTotalPageCows] = useState(0);
    const [totalPageCowsBirth, setTotalPageCowsBirth] = useState(0);
    const [totalPageMedicalExam, setTotalPageMedicalExam] = useState(0);
    const [totalPageMilk, setTotalPageMilk] = useState(0);

    //get cows data with page
    const getcowsdata = async (page) => {
        try {
            const cowsresult = await axios.get(`http://localhost:8001/cow?page=${page}`);
            setcowsdata(cowsresult.data.data);
            setTotalPageCows(cowsresult.data.totalPages)
        }
        catch (err) {
            console.log(err)
            setError(err);
        }

    }
    //get all cows data
    const getallcowsdata = async () => {
        try {
            const allcowsresult = await axios.get(`http://localhost:8001/cow/all`);
            setallcowsdata(allcowsresult.data.data);
        }
        catch (err) {
            console.log(err)
            setError(err);
        }

    }
    //getbirth
    const getcowsbirthdata = async (page) => {
        try {
            const cowsbirthresult = await axios.get(`http://localhost:8001/cow/cowbirth?page=${page}`);
            setcowsbirthdata(cowsbirthresult.data.data);
            setTotalPageCowsBirth(cowsbirthresult.data.totalPages);
        }
        catch (err) {
            setError(err);
            console.log(err)
        }
    }
    // get medical exam
    const getmedicalexamdata = async (page) => {
        try {
            const medicalexaminationresult = await axios.get(`http://localhost:8001/medicalexamination?page=${page}`);
            setmedicalexamdata(medicalexaminationresult.data.data);
            setTotalPageMedicalExam(medicalexaminationresult.data.totalPages);

        }
        catch (err) {
            console.log(err)
            setError(err);
        }
    }
    //get milk
    const getMilkdata = async (page) => {
        try {
            const milkresult = await axios.get(`http://localhost:8001/milk?page=${page}`);
            setMilkdata(milkresult.data.data);
            setTotalPageMilk(milkresult.data.totalPages);
        }
        catch (err) {
            setError(err);
            console.log(err)
        }
    }
    //get  all profiles
    const getallprofile = async () => {
        try {
            const profileresult = await axios.get(`http://localhost:8001/profile`);
            setALLProfiledata(profileresult.data.data);
            setUserID(profileresult.data.currentid.userId);
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };
    //get  one profile by id
    const getprofile = async () => {
        try {
            const profileresult = await axios.get(`http://localhost:8001/profile/${UserID}`);
            setProfiledata(profileresult.data.data);
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };

    useEffect(() => {
        getcowsbirthdata();
        getmedicalexamdata();
        getMilkdata();
        getcowsdata();
        getallcowsdata();
        getallprofile();
    }, []);

    useEffect(() => {
        getprofile();
    }, [UserID]);

    return (
        <datacontext.Provider value={{
            getcowsdata,
            getcowsbirthdata,
            getmedicalexamdata,
            getMilkdata,
            getallcowsdata,
            getprofile,
            allcowsdata,
            cowsdata,
            cowsbirthdata,
            medicalexamdata,
            Milkdata,
            ALLProfiledata,
            Profiledata,
            totalPageCows,
            totalPageCowsBirth,
            totalPageMilk,
            totalPageMedicalExam,
            Error,
            UserID
        }} >
            {children}
        </datacontext.Provider>
    )
}

export { Mycontextprovider, datacontext } 
