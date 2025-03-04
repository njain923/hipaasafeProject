import React, { useEffect, useState, useContext } from "react";
import undrawPostingPhoto from "../../assets/img/undraw_posting_photo.svg";
import CardIcon1 from "../../assets/img/cardIcon1.svg";
import CardIcon2 from "../../assets/img/cardIcon2.svg";
import CardIcon3 from "../../assets/img/cardIcon3.svg";
import PatientsList from "./patientsList/PatientsList";
import moment from "moment";
import { KPIDoctorDashboard ,getDoctors,GetPatients} from '../../services/apiservices'
import appContext from "../../context/appcontext/AppContext";
import { Form,InputGroup,} from "react-bootstrap";


const Dashboard = () => {
  const AppContext = useContext(appContext);
  const [kpi, setKpi] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patients, setPatients] = useState(null);
  
  useEffect(() => {

    if(AppContext?.user?.role_id===4){
      getDoctorsAPI();
    }else{
      getKPIAPI(AppContext?.user?.uid);
      GetPatientAPI(AppContext?.user?.uid);
    }
  }, [])

  const getDoctorsAPI = async () => {
    let res = await getDoctors();
    if (res?.success) {
      setDoctors(res?.data?.rows);
      getKPIAPI(res?.data?.rows[0].uid)
      GetPatientAPI(res?.data?.rows[0].uid);
      setSelectedDoctor({name: res?.data?.rows[0].name, value:res?.data?.rows[0].uid});
    }
  }


  const getKPIAPI = async (uid) => {
    let res = await KPIDoctorDashboard(uid);
    if (res?.success) {
      setKpi(res?.data);
    }
  }

  const GetPatientAPI = async (uid) => {
    let res1 = await GetPatients(uid);
    if (res1?.success) {
      setPatients(res1?.data?.rows);
    }
  }

  const handleDoctorChanges = (e) => {
    e = JSON.parse(e.target.value)
    setSelectedDoctor({name: e.name, value:e.uid});
    getKPIAPI(e.uid);
    GetPatientAPI(e.uid)
  };


  return (
    <>
      {/* <!-- Begin Page Content --> */}
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <span className="page-title">Dashboard <span className="dash-date">Today, {moment().format('DD MMM YYYY')}</span>
          </span>
        </div>
        {AppContext?.user?.role_id===4 
        ?<div className="row dashboard-counter-cards">
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="d-flex align-items-center col mr-2">
                  <img src={CardIcon1} alt="card-icon-1"></img>
                  <div className="card-title">
                    <div className="total-numbers">
                      {doctors?.length}
                    </div>
                    <div className="total-label">
                      Total Doctors
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="d-flex align-items-center col mr-2">
                  <img src={CardIcon2} alt="card-icon-2"></img>
                  <div className="card-title">
                    <div className="total-numbers">
                      {patients?.length}
                    </div>
                    <div className="total-label">
                      Total Patients
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="d-flex align-items-center col mr-2">
                  <img src={CardIcon3} alt="card-icon-3"></img>
                  <div className="card-title">
                    <div className="total-numbers">
                      {kpi?.pending_patients}
                    </div>
                    <div className="total-label">
                      Completed Patients
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        :<div className="row dashboard-counter-cards">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="d-flex align-items-center col mr-2">
                    <img src={CardIcon1} alt="card-icon-1"></img>
                    <div className="card-title">
                      <div className="total-numbers">
                        {kpi?.total_patients}
                      </div>
                      <div className="total-label">
                        Total Patients
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="d-flex align-items-center col mr-2">
                    <img src={CardIcon2} alt="card-icon-2"></img>
                    <div className="card-title">
                      <div className="total-numbers">
                        {kpi?.completed_patients}
                      </div>
                      <div className="total-label">
                        Completed Patients
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="d-flex align-items-center col mr-2">
                    <img src={CardIcon3} alt="card-icon-3"></img>
                    <div className="card-title">
                      <div className="total-numbers">
                        {kpi?.pending_patients}
                      </div>
                      <div className="total-label">
                        Waiting Patient
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {doctors&&
         <>
         {selectedDoctor?.name}
                    <div style={{width:300}}>
                    <InputGroup className="input-group-floting">
                      <InputGroup.Text>
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                      </InputGroup.Text>
                      <Form.Select
                        className="custom-selectbox"
                        aria-label="Select Speciality"
                        onChange={handleDoctorChanges}
                        name="speciality"
                        value={selectedDoctor?.uid}
                      >
                        { doctors?.map((dt, ind) => (
                            <>
                              <option value={JSON.stringify(dt)}>
                                {dt.name}
                              </option>
                            </>
                          ))
                          }
                      </Form.Select>
                    </InputGroup>
                    </div>
         </> 
      }

        <div className="row">
          <PatientsList patients={patients} />
        </div>

        {/* <!-- Content Row --> */}
      </div>
      {/* <!-- /.container-fluid --> */}
    </>
  );
};

export default Dashboard;
