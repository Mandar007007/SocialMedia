import { useRef, useState } from "react";

function MyFeed() {
    const postsRef = useRef(null);
    const repliesRef = useRef(null);
    const likedRef = useRef(null);

    const [isPostsOpen, setPostsOpen] = useState(true);
    const [isRepliesOpen, setRepliesOpen] = useState(false);
    const [isLikedOpen, setLikedOpen] = useState(false);

    const showPosts = () => {
        setPostsOpen(true);
        setLikedOpen(false);
        setRepliesOpen(false);
    }
    const showReplies = () => {
        setPostsOpen(false);
        setLikedOpen(false);
        setRepliesOpen(true);
    }
    const showLiked = () => {
        setPostsOpen(false);
        setLikedOpen(true);
        setRepliesOpen(false);
    }
    return (
        <div className="w-screen text-white">
            <div className="flex flex-row w-full py-3 relative">
                <button
                    className="basis-1/3 flex justify-center items-center"
                    onClick={showPosts}
                >
                    <p className={`py-2 ${isPostsOpen ? "border-b-4 border-orange-400": "opacity-50"}`}
                    >
                        Posts
                    </p>
                </button>
                <button
                    className="basis-1/3 flex justify-center items-center"
                    onClick={showReplies}
                >
                    <p className={`py-2 ${isRepliesOpen ? "border-b-4 border-orange-400": "opacity-50"}`}
                    >
                        Replies
                    </p>
                </button>
                <button
                    className="basis-1/3 flex justify-center items-center"
                    onClick={showLiked}
                >
                    <p className={`py-2 ${isLikedOpen ? "border-b-4 border-orange-400": "opacity-50"}`}
                    >
                        Liked
                    </p>
                </button>
            </div>
            <hr className="border-t-2 border-slate-500" />
        </div>
    );
}

export default MyFeed;