import { FC } from "react";
import { ProductTypes } from "../types";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

export const ProductCart: FC<ProductTypes> = (props: ProductTypes) => {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  const discountedPrice = (props.price - (props.price * props.discountPercentage) / 100).toFixed(2);

  return (
    <div className="col-span-1">
      <div className="relative group bg-neutral-200 rounded-sm overflow-hidden">
        <img
          className="h-[300px] group-hover:scale-110 duration-300 mx-auto"
          src={props.images[0]}
          alt={props.title}
          onError={handleImageError} // Fallback for broken image links
        />
        {props.discountPercentage >= 1 && (
          <p className="absolute top-3 left-3 bg-red-500 text-white font-medium text-sm px-3 py-1 rounded-lg">
            {props.discountPercentage.toFixed()}%
          </p>
        )}
        <div className="absolute top-5 -right-full group-hover:right-5 duration-300">
          <p
            onClick={() => navigate(`/about/${props.id}`)}
            className="p-2 bg-white cursor-pointer rounded-full"
          >
            <MdOutlineRemoveRedEye className="text-black" />
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-lg line-clamp-1 font-bold">{props.title}</h1>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-red-500 font-bold text-md">${discountedPrice}</p>
          <p className="text-neutral-400 line-through font-bold text-md">
            ${props.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Rate value={props.rating} disabled className="!text-[#FFAD33]" />
          <p className="text-neutral-500 mt-1.5 font-semibold">({props.rating})</p>
        </div>
      </div>
    </div>
  );
};