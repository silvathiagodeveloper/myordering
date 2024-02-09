'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";

export default function EditUserPage(){
    const {loading:profileLoading, data:profileData} = useProfile();
    if(profileLoading){
        return 'Loading user info...';
      }
    
      if(!profileData.admin){
        return 'Not admin!';
      }
    return (
        <section className="max-w-2xl mx-auto mt-8">
        <UserTabs admin={profileData.admin} />
        <div className="mt-8">
            User info form
        </div>
      </section>
    );
}