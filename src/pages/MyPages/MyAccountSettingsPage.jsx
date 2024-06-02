//import React, { useState, useEffect } from "react";
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import MyAccountSetting from "../../components/MyPageConponents/MyAccountSetting";
import '../../styles/PageStyle/MyPageStyle/MyAccountSettingsPage.css'; 

export default function MyAccountSettingsPage() {
    return (
        <div className="account-settings">
            <MyPageNav />
            <MyAccountSetting />
        </div>
    );
    
}
