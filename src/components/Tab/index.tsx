"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Personnal from "../Personnal";

const TabPage = () => {
  return (
    <div>
      <Tabs>
        <TabList className="bg-gray-300 flex justify-between">
          <Tab
            selectedClassName="bg-gray-200 border-primary"
            className="cursor-pointer font-bold text-xl text-opacity-10 outline-none border-b-4 p-3 w-full text-center "
          >
            Personnal
          </Tab>
          <Tab
            selectedClassName="bg-gray-200 border-primary"
            className="cursor-pointer font-bold text-xl text-opacity-10 outline-none w-full text-center p-3 border-b-4"
          >
            Professional
          </Tab>
        </TabList>

        <TabPanel>
          <Personnal />
        </TabPanel>
        <TabPanel>
          <Personnal />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabPage;
