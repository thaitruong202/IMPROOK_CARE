import { useEffect, useState } from "react";
import "../styles/ProfileDoctorDetail.css"
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import verified from "../assests/images/verified.svg"
import MySpinner from "../layout/MySpinner";
import googleplay from "../assests/images/googleplay.svg"
import appstore from "../assests/images/appstore.svg"

const ProfileDoctorDetail = () => {
    const { profileDoctorId } = useParams();
    const [doctorDetail, setDoctorDetail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProfileDoctorById = async () => {
            try {
                setLoading(true);
                let res = await Apis.get(endpoints['load-profile-doctor-by-Id'](profileDoctorId));
                setDoctorDetail(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadProfileDoctorById();
    }, [profileDoctorId])

    let url = `/booking/doctor/${doctorDetail.profileDoctorId}`

    return <>
        <div class="Profile_Doctor_Detail_Wrapper">
            <div class="Profile_Doctor_Detail_Content">
                <div class="Profile_Doctor_Detail_Header">
                    {loading === true ? <MySpinner /> :
                        <>
                            {doctorDetail?.userId?.avatar && (
                                <div className="Profile_Doctor_Avatar">
                                    <img src={doctorDetail.userId.avatar} width={"50%"} alt="Doctor Avatar" />
                                </div>
                            )}
                            {doctorDetail?.specialtyId?.specialtyName &&
                                (<div class="Profile_Doctor_Info">
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ {doctorDetail.name}</h3>
                                    <span className="mb-4"><img src={verified} alt="verified" /> Bác sĩ | 10 năm kinh nghiệm</span>
                                    <span>Chuyên khoa {doctorDetail.specialtyId.specialtyName}</span>
                                    <span>Chức vụ {doctorDetail.position}</span>
                                    <span>Nơi công tác {doctorDetail.workAddress}</span>
                                </div>)
                            }
                        </>}
                </div>
                <div class="Profile_Doctor_Detail_Body">
                    <div class="Phonenumber">
                        <div>
                            <span>Hỗ trợ đặt khám</span>
                            <span>2051052125</span>
                        </div>
                        <button><a href={url}>ĐẶT KHÁM NGAY</a></button>
                    </div>
                </div>
                <div class="Profile_Doctor_Detail_Footer">
                    <div>
                        <span>Đặt lịch khám Bác sĩ dễ dàng</span>
                        <h3>Tải ngay IMPROOKCARE</h3>
                        <div>
                            <a href="/" style={{ marginRight: '1rem' }}><img src={googleplay} alt="GooglePlay" /></a>
                            <a href="/"><img src={appstore} alt="AppStore" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProfileDoctorDetail;