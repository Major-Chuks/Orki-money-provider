"use client";
import { useRouter } from "next/navigation";
import classes from "./BlogCard.module.css";
import Image from "next/image";
import { Blog } from "../Articles/Articles";

const BlogCard = ({ blogId, data }: { blogId: string; data: Blog }) => {
  const router = useRouter();

  const handleOpenBlog = () => {
    router.push(`/blogs/${blogId}`);
  };

  return (
    <div onClick={handleOpenBlog} className={classes.container}>
      <div className={classes.imageContainer}>
        <Image src={data.backgroundImage} alt="" />
      </div>
      <div className={classes.details}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.description}>{data.description}</div>
        <div className={classes.profile}>
          <div className={classes.avatar}>
            <Image src={data.avatar} alt="" />
          </div>
          <div className={classes.name}>{data.author}</div>
          <div className={classes.dot}></div>
          <div className={classes.date}>{data.publishedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
