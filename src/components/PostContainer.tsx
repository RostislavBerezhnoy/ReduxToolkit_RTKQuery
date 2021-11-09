import React from "react";
import { IPost } from "../models/IPosts";
import { postAPI } from "../services/postServise";
import PostItem from "./PostItem";

const PostContainer = () => {
  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(100);
  const [createPost/* , {error: createError, isLoading: isCreateLoading} */] = postAPI.useCreatePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();


  const handlerCreate = async () => {
    const title = prompt();
    if (title){
      await createPost({ title, body: title } as IPost)
    }
  }

  const handleRemove = (post: IPost) => {
    deletePost(post);
  }

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  }
  
  return (
    <div className="post__list">
      <button className="bt-m-10 bt-p-10" onClick={handlerCreate}>Add new post</button>
      <button className="bt-m-10 bt-p-10" onClick={() => refetch()}>Refetch</button>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка</h1>}
      {posts && posts.map(post => (
        <PostItem 
          key={post.id}
          post={post}
          remove={handleRemove}
          update={handleUpdate}
         />
      ))}
      </div>
  );
}

export default PostContainer;