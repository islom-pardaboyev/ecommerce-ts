import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductTypes } from "../types";
import { useAxios } from "../hook/useAxios";
import { Rate } from "antd";
import { FaHandPointLeft } from "react-icons/fa";
import { PagesStructure } from "../enums";
import { loading } from "../routes";

function AboutProducts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleProducts, setSingleProducts] = useState<ProductTypes | null>(
    null
  );
  useEffect(() => {
    const fetchSingleProducts = async () => {
      const response = await useAxios().get(`product/${id}`);
      setSingleProducts(response.data);
    };
    fetchSingleProducts();
  }, [id]);
  console.log(singleProducts);

  if (!singleProducts) {
    return (
      loading
    );
  }
  return (
    <>
      <div
        onClick={() => navigate(PagesStructure.home)}
        className="fixed top-4 cursor-pointer left-4 hover:bg-rose-600 flex items-center gap-2 hover:text-white text-rose-600 duration-300 rounded-md w-fit p-3"
      >
        <FaHandPointLeft />
        <p>Back</p>
      </div>
      <section className="min-h-screen flex items-center justify-center">
        <div className="min-h-[70vh] grid grid-cols-2 w-[60vw] items-center">
          <div className="col-span-1 relative">
            {singleProducts.discountPercentage >= 1 ? (
              <p className="absolute bottom-3 left-3 bg-red-500 text-white font-medium text-sm px-3 py-1 rounded-lg">
                {singleProducts.discountPercentage.toFixed()}%
              </p>
            ) : (
              ""
            )}
            <img
              src={singleProducts?.images[0]}
              className="w-[400px] h-[400px] object-contain"
              alt=""
            />
          </div>
          <div className="col-span-1">
            <h1 className="font-semibold text-3xl">{singleProducts.title}</h1>
            <p className="font-medium mt-2 text-black/50">
              {singleProducts.description}
            </p>
            <p className="font-medium mt-2 text-black/50 text-xl">
              Brand: {singleProducts.brand}
            </p>
            <div className="flex items-center mb-3 gap-3">
              <Rate
                disabled
                value={singleProducts.rating}
                className="text-[#FFAD33] mt-3"
              />
              <p className="font-semibold text-md mt-2.5 text-neutral-500">
                ({singleProducts.discountPercentage.toFixed()})
              </p>
            </div>
            <a href="#reviews" className="font-medium text-md underline">
              Reviews: {singleProducts.reviews.length}
            </a>
          </div>
        </div>
      </section>
      <section
        id="reviews"
        className="min-h-screen scroll-mt-16 container mx-auto"
      >
        <h1 className="text-3xl font-bold text-center underline decoration-wavy decoration-4 underline-offset-8 decoration-violet-600">
          Reviews
        </h1>
        <div className="grid grid-cols-3 mt-10 gap-6">
          {singleProducts.reviews.map((review, inx: number) => (
            <div key={inx} className="p-2 border-2 border-gray-300 rounded-md">
              <header className="flex items-center gap-2">
                <img
                  src={`https://placehold.jp/20/c7c7cc/000000/30x30.png?text=${review.reviewerName.substring(
                    0,
                    1
                  )}`}
                  className="rounded-full"
                  alt=""
                />
                <div className="">
                  <h1 className="text-md font-medium">{review.reviewerName}</h1>
                  <p className="text-xs text-neutral-500 font-medium">
                    {new Date(review.date)
                      .toLocaleDateString()
                      .split("/")
                      .reverse()
                      .join("/")}
                  </p>
                </div>
              </header>
              <div className="mt-2 px-3">
                <p className="text-md font-medium float-end">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutProducts;
