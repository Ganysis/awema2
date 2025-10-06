import { markdownify, plainify } from "@/lib/utils/textConverter";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const PricingCard = (props: any) => {
  const {
    button_label,
    button_link,
    content,
    currency,
    monthly_price,
    name,
    services,
    yearly_price,
    type,
  } = props || {};

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="rounded shadow">
      <div className="p-12">
        <span className="h2 font-semibold inline-flex">
          {inView && (
            <CountUp
              duration={1}
              className="data-count"
              end={type === "monthly" ? +monthly_price : +yearly_price}
              prefix={currency}
            />
          )}
        </span>
        <span
          className="ml-1 inline-block capitalize font-medium"
          dangerouslySetInnerHTML={{ __html: markdownify("\\" + type) }}
        />
        <h3
          className="font-semibold my-2.5"
          dangerouslySetInnerHTML={{ __html: markdownify(name) }}
        />
        <p
          className="border-b border-border/80 pb-5"
          dangerouslySetInnerHTML={{ __html: markdownify(content!) }}
        />

        <ul className="my-5 space-y-5">
          {(services as string[])?.map((service, i) => (
            <li
              key={i}
              className="flex items-center font-semibold text-text-light"
            >
              <span className="mr-2.5 bg-[#E1F4EC] w-7 h-7 flex items-center justify-center text-[#33B27C] rounded-full">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6.125L6.91892 11L16 2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {plainify(service)}
            </li>
          ))}
        </ul>

        <a
          href={button_link}
          className="btn btn-outline-primary w-full text-center transition ease-linear duration-300 mt-3"
          dangerouslySetInnerHTML={{ __html: button_label }}
        />
      </div>
    </div>
  );
};

export default PricingCard;
