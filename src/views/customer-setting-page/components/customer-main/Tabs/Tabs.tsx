import React, { FC } from "react";
import "./TabsStyle.scss";
import { Menu } from "semantic-ui-react";

type TabsProps = {
  tabs: any[];
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({
  className = "tabs-component",
  tabs = [],
  selectedTab = 0,
  onClick,
  orientation = "horizontal",
}) => {
  const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin"));

  return (
    <div
      className={
        orientation === "vertical" ? className + " vertical" : className
      }
    >
      <div role="tablist" aria-orientation={orientation}>
        {tabs.map((tab) => (
          <button
            className={selectedTab === tab.index ? "active" : ""}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {Panel && <Panel.Component index={selectedTab} role={userLogin.role} />}
      </div>
    </div>
  );
};
export default Tabs;
