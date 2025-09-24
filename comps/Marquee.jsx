import { memo, useRef, useEffect } from "react";
import Products from "../app/Products";

const Marquee = ({ products }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let offset = 0;
    const speed = 0.5;
    const animate = () => {
      if (track) {
        offset -= speed;
        if (Math.abs(offset) >= track.scrollWidth / 2) {
          offset = 0;
        }
        track.style.transform = `translateX(${offset}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className=" mt-20">
      <h1 className=" text-center text-secondary text-xl font-extrabold">
        You may also like
      </h1>

      <section className=" mt-10 relative h-52 sm:h-96  w-full  overflow-hidden">
        <div className="flex w-max" ref={trackRef}>
          {products.map((product) => (
            <Products gap="mr-5" key={product._id} products={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default memo(Marquee);
