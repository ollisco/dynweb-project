
import React from 'react'
import ProfilePageView from './profile-page-view'
import { UserCredential } from 'firebase/auth'

interface ProfilePagePresenterProps {
    user: UserCredential | null
    homeAddress: string
}

const ProfilePagePresenter = ({ user, homeAddress }: ProfilePagePresenterProps) => {
    return (
        <ProfilePageView user={user} homeAddress={''} />
    )
}

export default ProfilePagePresenter 