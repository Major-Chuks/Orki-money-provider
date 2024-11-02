"use client";

import BlogCard from "../BlogCard/BlogCard";
import classes from "./Articles.module.css";
import { useState } from "react";
import blogImg1 from "@/assets/blog/blog-img1.png";
import blogImg2 from "@/assets/blog/blog-img2.png";
import blogImg3 from "@/assets/blog/blog-img3.png";
import blogImg4 from "@/assets/blog/blog-img4.png";
import blogImg5 from "@/assets/blog/blog-img5.png";
import blogImg6 from "@/assets/blog/blog-img6.png";
import blogImg7 from "@/assets/blog/blog-img7.png";
import blogImg8 from "@/assets/blog/blog-img8.png";
import blogImg9 from "@/assets/blog/blog-img9.png";
import blogImg10 from "@/assets/blog/blog-img10.png";
import blogImg11 from "@/assets/blog/blog-img11.png";
import blogImg12 from "@/assets/blog/blog-img12.png";
import avatar from "@/assets/blog/avatar.png";
import Responsive from "@/components/Responsive/Responsive";
import Paginate from "@/components/Pagination/Paginate";
import Control from "@/components/Pagination/Control";

const filterby = ["All", "Customer Stories", "News", , "Product Updates"];

export type Blog = {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  backgroundImage: any;
  avatar: any;
};

export const sample_data: Blog = {
  title: "The Role of API Integration in Modern Onramp Solutions",
  description:
    "Dive into the technical side of onramps. Explore the significance of API integration and how it shapes the user experience, providing a seamless bridge between traditional and digital finance",
  author: "Darshan T",
  publishedAt: "20 Nov 2023",
  backgroundImage: "",
  avatar: avatar,
};

export const sample_images = [
  blogImg1,
  blogImg2,
  blogImg3,
  blogImg4,
  blogImg5,
  blogImg6,
  blogImg7,
  blogImg8,
  blogImg9,
  blogImg10,
  blogImg11,
  blogImg12,
];

const mock_data = [...Array(12)].map((_, index) => ({
  ...sample_data,
  backgroundImage: sample_images[index],
}));
const pageCount = 12;

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState(filterby[0]);

  const scrollToTop = () => {
    const container = document.getElementById("main-app-container");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = (): void => {
    if (currentPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
    scrollToTop();
  };

  const handleNext = (): void => {
    if (currentPage >= pageCount + 3) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
    scrollToTop();
  };

  const handleGoto = (currentPage: number): void => {
    setCurrentPage(currentPage);
    scrollToTop();
  };

  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          {/* <div className={classes.title}>Recent Articles</div> */}
          <div className={classes.filterContainer}>
            {filterby.map((filter, idx) => (
              <div
                key={idx}
                className={`${classes.filterWrapper} ${
                  activeFilter === filter && classes.active
                }`}
              >
                <div
                  onClick={() => setActiveFilter(filter)}
                  className={classes.filter}
                >
                  {filter}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.blogContainer}>
          <Paginate
            scrollId=""
            items={mock_data}
            pageCount={pageCount}
            renderItem={(blogs) =>
              blogs.map((blog, idx: number) => (
                <BlogCard key={idx} data={blog} blogId={`${idx + 1}`} />
              ))
            }
          />
        </div>
        <Control
          controlProps={{
            _static: true,
            handleGoto,
            handleNext,
            handlePrev,
            currentPage,
            paginate: mock_data
              .map((_, idx) => idx + 1)
              .reduce((acc: any, num) => {
                acc[num] = num;
                return acc;
              }, {}),
          }}
        />
      </div>
    </Responsive>
  );
};

export default Articles;
