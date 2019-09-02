import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

import CategoryBtn from "./categoryBtn";
import classnames from "classnames";

const RenderCategoryTabs = ({
  filters,
  onCategoryBtnClick,
  activeTab,
  toggleTab
}) => {
  const renderAreas = () => {
    return filters.area.map((area, index) => (
      <Col key={index} sm="3">
        <CategoryBtn
          key={index}
          onClick={() => onCategoryBtnClick("area", index)}
          name={area.name}
          isActive={area.isActive}
          count={area.count}
        />
      </Col>
    ));
  };

  const renderCategories = () => {
    return filters.category.map((area, index) => (
      <Col key={index} sm="3">
        <CategoryBtn
          key={index}
          onClick={() => onCategoryBtnClick("category", index)}
          name={area.name}
          isActive={area.isActive}
          count={area.count}
        />
      </Col>
    ));
  };

  const renderStyles = () => {
    return filters.style.map((area, index) => (
      <Col key={index} sm="3">
        <CategoryBtn
          key={index}
          onClick={() => onCategoryBtnClick("style", index)}
          name={area.name}
          isActive={area.isActive}
          count={area.count}
        />
      </Col>
    ));
  };

  const renderFeatures = () => {
    return filters.feature.map((area, index) => (
      <Col key={index} sm="3">
        <CategoryBtn
          key={index}
          onClick={() => onCategoryBtnClick("feature", index)}
          name={area.name}
          isActive={area.isActive}
          count={area.count}
        />
      </Col>
    ));
  };

  const renderPermits = () => {
    return filters.permit.map((permit, index) => (
      <Col key={index} sm="3">
        <CategoryBtn
          key={index}
          onClick={() => onCategoryBtnClick("permit", index)}
          name={permit.name}
          isActive={permit.isActive}
          count={permit.count}
        />
      </Col>
    ));
  };

  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem className="ms-cursor">
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Area
          </NavLink>
        </NavItem>
        <NavItem className="ms-cursor">
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Category
          </NavLink>
        </NavItem>
        <NavItem className="ms-cursor">
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggleTab("3");
            }}
          >
            Style
          </NavLink>
        </NavItem>
        <NavItem className="ms-cursor">
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggleTab("4");
            }}
          >
            Features
          </NavLink>
        </NavItem>
        <NavItem className="ms-cursor">
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggleTab("5");
            }}
          >
            Permits
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="pt-2">{renderAreas()}</Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="pt-2">{renderCategories()}</Row>
        </TabPane>
        <TabPane tabId="3">
          <Row className="pt-2">{renderStyles()}</Row>
        </TabPane>
        <TabPane tabId="4">
          <Row className="pt-2">{renderFeatures()}</Row>
        </TabPane>
        <TabPane tabId="5">
          <Row className="pt-2">{renderPermits()}</Row>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

const Filters = ({
  filters,
  onCategoryBtnClick,
  toggleTab,
  activeTab,
  showAllLocs
}) => {
  return (
    <section className="categories">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <RenderCategoryTabs
              filters={filters}
              onCategoryBtnClick={onCategoryBtnClick}
              toggleTab={toggleTab}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
