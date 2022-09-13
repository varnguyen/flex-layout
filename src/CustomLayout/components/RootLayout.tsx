import React, { memo, useEffect, useState } from "react";
import { Layout, Model, TabNode } from "flexlayout-react";
import { DEFAULT_JSON_MODEL } from "./constants";

import "../assets/styles.css";

function RootLayout() {
  const [rawModel, setRawModel] = useState<Model>();

  useEffect(() => {
    console.log(
      "Model.fromJson(DEFAULT_JSON_MODEL)",
      Model.fromJson(DEFAULT_JSON_MODEL)
    );

    setRawModel(Model.fromJson(DEFAULT_JSON_MODEL));
  }, []);

  const factory = (node: TabNode) => {
    var component = node.getComponent();
    if (component === "text") {
      return <div className="panel">Panel {node.getName()}</div>;
    }
  };

  const onModelChange = (model: Model) => {
    setRawModel(model);
  };

  return (
    <div className="custom-layout">
      <div className="header">
        <span>Flex Layout Example</span>
        <div className="widgets">widgets</div>
      </div>
      {!!rawModel && (
        <div className="layout-container">
          <Layout
            model={rawModel}
            factory={factory}
            onModelChange={onModelChange}
          />
        </div>
      )}
    </div>
  );
}

export default memo(RootLayout);
