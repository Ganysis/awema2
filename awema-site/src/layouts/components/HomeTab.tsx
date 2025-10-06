import DynamicIcon from "@/helpers/DynamicIcon";
import { useTabs } from "@/hooks/useTabs";
import { humanize, markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React from "react";

type TabItem = CollectionEntry<"homepage">["data"]["homepage_tab"];

export default function TabList({ tablist }: TabItem) {
  const { selectedTab, onChange, selectedTabIndex, setSelectedTab } = useTabs({
    tabs: tablist,
    initialTabId: 0,
    onChange: (index: number) => setSelectedTab(index),
  });

  const { button, content, image, title } = selectedTab;

  return (
    <div className="text-center mt-3">
      <ul className="inline-flex flex-wrap justify-center items-center overflow-hidden tab-lists">
        {tablist.map((tab, index) => {
          return (
            <li key={index} className="tab-item col-6 sm:col-4 md:col-3">
              <a
                onClick={() => onChange(index)}
                className={`px-14 cursor-pointer ${
                  selectedTabIndex === index
                    ? "text-primary"
                    : "text-text-light"
                }`}
              >
                <DynamicIcon
                  className={`mx-auto mb-3 w-8 h-8 bg-white transition duration-300 `}
                  icon="FaCircleDot"
                />
                <span
                  className="font-medium inline-block w-full text-center"
                  dangerouslySetInnerHTML={{ __html: markdownify(tab.name) }}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div key={selectedTabIndex} className="mt-6 lg:mt-12" data-aos="fade-in">
        <div className="row items-center justify-center gy-4 lg:gy-0">
          <div className="lg:col-6">
            <img
              width={670}
              height={443}
              className="mx-auto rounded p-2 bg-white shadow"
              src={image}
              alt={"tab-image"}
            />
          </div>
          <div className="lg:col-6 md:col-10 text-left">
            <h2
              dangerouslySetInnerHTML={{
                __html: markdownify(title),
              }}
            />
            <p
              className="mt-5 mb-7"
              dangerouslySetInnerHTML={{
                __html: markdownify(content),
              }}
            />
            {button?.enable && (
              <a
                href={selectedTab.button?.link}
                className="btn btn-primary has-icon"
              >
                {humanize(button.label)}
                <span className="icon">
                  <DynamicIcon width={26} height={26} icon="FaAngleRight" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
