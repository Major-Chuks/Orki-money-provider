import { sample_images, sample_data } from "../Articles/Articles";
import BlogCard from "../BlogCard/BlogCard";
import classes from "./RelatedArticle.module.css";

const mock_data = [...Array(3)].map((_, index) => ({
  ...sample_data,
  backgroundImage: sample_images[index],
}));

const RelatedArticle = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Related Articles</div>

      <div className={classes.blogContainer}>
        {mock_data.map((blog, idx) => (
          <BlogCard data={blog} key={idx} blogId={`${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticle;
