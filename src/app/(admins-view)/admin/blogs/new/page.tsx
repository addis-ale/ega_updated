import { CreateNewBlogView } from "@/app/modules/admin/blogs/ui/views/create-new-blog-post-view";
import { BackLink } from "@/components/back-link";

const NewPost = () => {
  return (
    <div>
      <BackLink href="/admin/blogs" label="Back to blogs" />
      <CreateNewBlogView />
    </div>
  );
};

export default NewPost;
