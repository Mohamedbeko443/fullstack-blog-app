import "./profile.css"
import { Camera  , User  } from 'lucide-react';
import PostList from './../../components/posts/PostList';
import { posts } from "../../dummyData"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfileModal from './UpdateProfileModal';



export default function Profile() {


    const [file , setFile] = useState(null);
    const [open , setOpen] = useState(false);


    function handleSubmit(e)
    {
        e.preventDefault();
        if(!file) return toast.warning("Please provide a photo.");


        console.log("image has been uploaded successfully")
    }


    useEffect(() => {
        window.scrollTo(0,0);
    }, [])


    function handleDeleteAccount()
        {
            Swal.fire({
                title: "Are you sure",
                text: "once deleted, you will not be able to recover this account",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Post has been deleted.',
                        'success'
                    );
                }
            })
        }

    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"} alt="" className="profile-image" />

                    <form onSubmit={handleSubmit} >
                        <abbr title="choose profile photo">
                            <label className="upload-profile-photo-icon" htmlFor="file" > <Camera  />  </label>
                        </abbr>
                        <input onChange={(e) => setFile(e.target.files[0]) } hidden type="file" name="file" id="file"  />
                        <button type="submit"  className="upload-profile-photo-btn" > Upload </button>
                    </form>
                </div>
                <h1 className="profile-username">Mo Medhat</h1>
                <p className="profile-bio">Hello my name is mohamed medhat aka lio</p>

                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>Fri Nov 04 2022</span>
                </div>

                <button onClick={() => setOpen(true)} className="profile-update-btn" > <User /> update profile </button>
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">Mohamed's posts</h2>
                <PostList  posts={posts} />
            </div>
            <button onClick={handleDeleteAccount} className="delete-account-btn" > Delete Account </button>

            {open && <UpdateProfileModal setOpen={setOpen} />}
        </section>
    )
}
