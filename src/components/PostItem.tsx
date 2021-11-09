import React, {FC} from "react";
import { IPost } from "../models/IPosts";

interface PostItemProps {
    post: IPost;
    update: (post: IPost) => void;
    remove: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(post);
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt(`Редактирование ${post.title}:`, post.title) || "";
    if (title){
      update({...post, title});
    }
  }

  return (
    <div className="post" onClick={handleUpdate}>
      {post.id}. {post.title}
      <button className="bt-p-10" onClick={handleRemove}>Delete</button>
    </div>
  );
}

export default PostItem;