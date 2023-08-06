import React, { useEffect, useState } from 'react';
import { View, SelectBox, TextInput, Button, TextArea } from '@components';
import { HiOutlinePencil } from 'react-icons/hi';
import { usePlug } from '@hooks';
import API from "@api";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import "./styles.scss";

export const SettingsScreen = () => {
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [liveIn, setLiveIn] = useState("");
    const [sex, setSex] = useState("0");

    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    const [backgroundPreview, setBackgroundPreview] = useState("");
    const [backgroundUrl, setBackgroundUrl] = useState("");

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      let userData = await API.User.get(principal);
      userData = userData[0];
      
      setFirstName(userData?.firstName);
      setLastName(userData?.lastName);
      setPhone(userData?.phone);
      setDate(userData?.dateOfBirth);
      setLiveIn(userData?.liveIn);
      setSex(userData?.sex);

      setAvatarPreview(userData?.avatar);
      setAvatarUrl(userData?.avatar);

      setBackgroundPreview(userData?.background);
      setBackgroundUrl(userData?.background);
    }

    const handleSubmit = async () => {
      // const { principal } = usePlug();

      // const user = {
      //   firstName,
      //   lastName,
      //   dateOfBirth: date,
      //   liveIn,
      //   sex,
      //   phone,
      //   avatar: avatarUrl,
      //   background: backgroundUrl,
      //   id: Principal.fromText(principal)
      // };

      // try {
      //   await API.User.createUser(user);

      //   Swal.fire(
      //       'Cập nhật thành công!',
      //       'Thông tin của bạn đã được cập nhật',
      //       'success'
      //   );
      // }catch(e) {
      //   console.log(e);
      // };
    }

    const handleUploadAvatar = async (e) => {
      //*Image Upload
      let file = e.target.files[0];
      let fileBlob = URL.createObjectURL(file);

      setAvatarPreview(fileBlob);

      let uploadRes = await API.IPFS.uploadImage(file);

      setAvatarUrl(uploadRes);
    }

    const handleUploadBackground = async (e) => {
      //*Image Upload
      let file = e.target.files[0];
      let fileBlob = URL.createObjectURL(file);

      setBackgroundPreview(fileBlob);

      let uploadRes = await API.IPFS.uploadImage(file);

      setBackgroundUrl(uploadRes);
    }

    return(
        <View className="setting-view">
          <div className="setting-view__user-info-container">
              <label className="setting-view__user-info-container__background" htmlFor="background-input" style={{backgroundImage: `url(${backgroundPreview})`}}>
                <HiOutlinePencil className="setting-view__user-info-container__background__icon"/>
                <input type="file" onChange={handleUploadBackground} id="background-input" className="setting-view__user-info-container__background__input"/>
              </label>
              <div className="setting-view__user-info-container__user-info" htmlFor="avatar-input">
                  <label className="setting-view__user-info-container__user-info__avatar"  style={{backgroundImage: `url(${avatarPreview})`}}>
                    <HiOutlinePencil className="setting-view__user-info-container__user-info__avatar__icon"/>
                    <input onChange={handleUploadAvatar} id="avatar-input" type="file" className="setting-view__user-info-container__user-info__avatar__input"/>
                  </label>
              </div>
          </div>

          <TextInput defaultValue={ firstName } onChange={(e) => setFirstName(e.target.value)} placeholder="Họ"/>
          <TextInput defaultValue={ lastName } onChange={(e) => setLastName(e.target.value)} placeholder="Tên"/>
          <TextInput defaultValue={ phone } onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" type="number"/>

          <SelectBox defaultValue={ sex?.toString() } onChange={e => setSex(Number(e.target.value))} options={[ { value: "1", label: "Nam" }, { value: "0", label: "Nữ"} ]}/>

          <TextInput defaultValue={ date } onChange={e => setDate(e.target.value)} placeholder="Date" type="date"/>


          <TextArea defaultValue={ liveIn } onChange={(e) => setLiveIn(e.target.value)}  placeholder="Nơi sống"/>
          <Button onClick={handleSubmit} style={{ marginTop: 32 }}>Lưu</Button>
        </View>
    )
}