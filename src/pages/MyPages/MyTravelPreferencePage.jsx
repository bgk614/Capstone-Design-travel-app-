import React from "react";
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import MyTravelPreference from "../../components/MyPageConponents/MyTravelPreference";
import '../../styles/PageStyle/MyPageStyle/MyTravelPreferencePage.css';

export default function MyTravelPreferencePage() {
    return (
        <div>
            <div className="my-travel-pre">
                <MyPageNav />
                <MyTravelPreference />
            </div>
        </div>
    )
}