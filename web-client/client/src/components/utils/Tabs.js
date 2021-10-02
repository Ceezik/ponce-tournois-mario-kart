import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { createContext } from '../../utils/createContext';

const [TabsProvider, useTabsContext] = createContext();

const useTabs = ({ defaultTab, onTabChange, align }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);

    const handleTabChange = (tab) => {
        if (onTabChange) onTabChange(tab);
        setSelectedTab(tab);
    };

    return {
        align,
        selectedTab,
        setSelectedTab: handleTabChange,
    };
};

function Tabs({ defaultTab, align, onTabChange, children }) {
    const ctx = useTabs({ defaultTab, align, onTabChange });
    const context = useMemo(() => ctx, [ctx]);

    return <TabsProvider value={context}>{children}</TabsProvider>;
}

function TabsList({ tabs }) {
    const { align, selectedTab, setSelectedTab } = useTabsContext();

    const handleTabChange = (tab) => {
        if (tab.value !== selectedTab) setSelectedTab(tab.value);
    };

    return (
        <Row align="center" justify={align}>
            {tabs.map((tab) => (
                <Col xs="content" key={tab.value}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleTabChange(tab);
                        }}
                        className={
                            selectedTab === tab.value
                                ? 'btnPrimary'
                                : 'btnSecondary'
                        }
                    >
                        {tab.label}
                    </button>
                </Col>
            ))}
        </Row>
    );
}

function Tab({ value, children = null }) {
    const { selectedTab } = useTabsContext();

    return selectedTab === value ? children : null;
}

Tabs.Tab = Tab;
Tabs.TabsList = TabsList;

export default Tabs;
