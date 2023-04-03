"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MiddleBannerDetails = ({ middleBannerId }) => {
  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();

  // here we update a middlebanner details
  const updater = (e) => {
    e.preventDefault();
    const formData = {
      id: middleBannerId,
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      link: imageLinkRef.current.value,
      situation: imageSituationRef.current.value,
    };
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/update-middle-banner`,
        formData
      )
      .then((d) => console.log("ok"))
      .catch((err) => console.log("error1"));
  };

  const [imageUrlS, setImageUrlS] = useState("");
  const [imageAltS, setImageAltS] = useState("");
  const [imageLinkS, setImageLinkS] = useState("");
  const [imageSituationS, setImageSituationS] = useState(true);

  // this part used for getting one middlebanner details for using in details component
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-middle-banner/${middleBannerId}`
      )
      .then((d) => {
        setImageUrlS(d.data.image);
        setImageAltS(d.data.imageAlt);
        setImageLinkS(d.data.link);
        setImageSituationS(d.data.situation);
      })
      .catch((err) => console.log("error"));
  }, [middleBannerId]);

  // this part is used to delete a middle banner
  const remover = (e) => {
    const formData = {
      id: middleBannerId,
    };
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/remove-middle-banner`,
        formData
      )
      .then((d) => console.log("removed"))
      .catch((err) => console.log("error1"));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-orange-500 text-lg">جزئیات بنر</h2>
        <button
          onClick={() => remover()}
          className="bg-rose-600 text-white px-3 py-1 rounded-md text-xs"
        >
          حذف بنر
        </button>
      </div>
      <form
        onKeyDown={formKeyNotSuber}
        onSubmit={updater}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div>آدرس جدید عکس</div>
          <input
            defaultValue={imageUrlS}
            type="text"
            ref={imageUrlRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آلت جدید عکس</div>
          <input
            defaultValue={imageAltS}
            type="text"
            ref={imageAltRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>لینک جدید عکس</div>
          <input
            defaultValue={imageLinkS}
            type="text"
            ref={imageLinkRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>روشن یا خاموش</div>
          <select
            ref={imageSituationRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          >
            {imageSituationS == true ? (
              <>
                <option value="true">روشن</option>
                <option value="false">خاموش</option>
              </>
            ) : (
              <>
                <option value="false">خاموش</option>
                <option value="true">روشن</option>
              </>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-400 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
        >
          بروز رسانی
        </button>
      </form>
    </div>
  );
};

export default MiddleBannerDetails;
